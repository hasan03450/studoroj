"use server";

import { z } from "zod";
import { siteUrl } from "../format";
import { boardAddress, sendMail } from "./email";
import { CONTACT_SUBJECTS, type FormState } from "./state";
import { openToken, sealToken } from "./token";
import { verifyTurnstile } from "./turnstile";

const GENERIC_ERROR = "Er ging iets mis bij het versturen. Probeer het later opnieuw of mail ons direct.";
const SPAM_ERROR = "We konden niet controleren dat je geen robot bent. Probeer het opnieuw.";

function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    out[key] ??= issue.message;
  }
  return out;
}

function valuesOf(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData) {
    if (typeof value === "string" && !key.startsWith("$") && key !== "website" && key !== "cf-turnstile-response") out[key] = value;
  }
  return out;
}

/** Bots fill in the hidden "website" field; real visitors never see it. */
function isBot(formData: FormData) {
  return Boolean(formData.get("website"));
}

const email = z.email("Vul een geldig e-mailadres in.").max(200);

/* ---------- Contact ---------- */

const contactSchema = z.object({
  name: z.string().trim().min(1, "Vul je naam in.").max(120),
  email,
  subject: z.enum(CONTACT_SUBJECTS, "Kies een onderwerp."),
  message: z.string().trim().min(10, "Je bericht is te kort (minimaal 10 tekens).").max(5000),
});

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success", message: "Bedankt! We hebben je bericht ontvangen." };
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: "Controleer de gemarkeerde velden.", fieldErrors: fieldErrors(parsed.error), values: valuesOf(formData) };
  if (!(await verifyTurnstile(formData.get("cf-turnstile-response")))) return { status: "error", message: SPAM_ERROR, values: valuesOf(formData) };

  const to = boardAddress();
  const d = parsed.data;
  const ok =
    to !== null &&
    (await sendMail({
      to,
      replyTo: d.email,
      subject: `[Website] ${d.subject} – ${d.name}`,
      text: `Nieuw bericht via het contactformulier\n\nNaam: ${d.name}\nE-mail: ${d.email}\nOnderwerp: ${d.subject}\n\n${d.message}`,
    }));
  return ok
    ? { status: "success", message: "Bedankt! We hebben je bericht ontvangen en reageren zo snel mogelijk." }
    : { status: "error", message: GENERIC_ERROR, values: valuesOf(formData) };
}

/* ---------- Membership ---------- */

const membershipSchema = z.object({
  firstName: z.string().trim().min(1, "Vul je voornaam in.").max(80),
  lastName: z.string().trim().min(1, "Vul je achternaam in.").max(120),
  email,
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+0-9 ()-]*$/, "Vul een geldig telefoonnummer in.")
    .optional()
    .or(z.literal("")),
  birthDate: z.iso.date("Vul je geboortedatum in."),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal("on", "Je moet akkoord gaan om lid te worden."),
});

type Membership = z.infer<typeof membershipSchema>;

export async function submitMembership(_prev: FormState, formData: FormData): Promise<FormState> {
  const success: FormState = {
    status: "success",
    message: "Bijna klaar! We hebben je een e-mail gestuurd. Klik op de link in die e-mail om je aanmelding te bevestigen.",
  };
  if (isBot(formData)) return success;
  const parsed = membershipSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: "Controleer de gemarkeerde velden.", fieldErrors: fieldErrors(parsed.error), values: valuesOf(formData) };
  if (!(await verifyTurnstile(formData.get("cf-turnstile-response")))) return { status: "error", message: SPAM_ERROR, values: valuesOf(formData) };

  const d = parsed.data;
  const link = `${siteUrl()}/lid-worden/bevestigen?token=${sealToken(d)}`;
  const ok = await sendMail({
    to: d.email,
    subject: "Bevestig je aanmelding bij StuduRoj",
    text: `Hoi ${d.firstName},\n\nBedankt voor je aanmelding bij StuduRoj! Bevestig je e-mailadres via deze link (7 dagen geldig):\n\n${link}\n\nHeb je je niet aangemeld? Dan kun je deze e-mail negeren.\n\nGroet,\nHet bestuur van StuduRoj`,
  });
  return ok ? success : { status: "error", message: GENERIC_ERROR, values: valuesOf(formData) };
}

export async function confirmMembership(_prev: FormState, formData: FormData): Promise<FormState> {
  const token = formData.get("token");
  const d = typeof token === "string" ? openToken<Membership>(token) : null;
  if (!d) return { status: "error", message: "Deze bevestigingslink is ongeldig of verlopen. Meld je opnieuw aan." };

  const to = boardAddress();
  const ok =
    to !== null &&
    (await sendMail({
      to,
      replyTo: d.email,
      subject: `[Website] Nieuw lid: ${d.firstName} ${d.lastName}`,
      text: `Een nieuw lid heeft de aanmelding bevestigd.\n\nNaam: ${d.firstName} ${d.lastName}\nE-mail: ${d.email}\nTelefoon: ${d.phone || "-"}\nGeboortedatum: ${d.birthDate}\nAkkoord met statuten en privacyverklaring: ja\n\nBericht:\n${d.message || "-"}`,
    }));
  if (!ok) return { status: "error", message: GENERIC_ERROR };

  await sendMail({
    to: d.email,
    subject: "Welkom bij StuduRoj!",
    text: `Hoi ${d.firstName},\n\nJe lidmaatschap is bevestigd. Welkom bij StuduRoj!\n\nBekijk de komende activiteiten op ${siteUrl()}/activiteiten.\n\nGroet,\nHet bestuur van StuduRoj`,
  });
  return { status: "success", message: `Welkom bij StuduRoj, ${d.firstName}! Je lidmaatschap is bevestigd.` };
}

/* ---------- Newsletter ---------- */

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const done: FormState = { status: "success", message: "Bedankt! Check je inbox om je inschrijving te bevestigen." };
  if (isBot(formData)) return done;
  const parsed = email.safeParse(formData.get("email"));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !listId) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[newsletter – not sent, BREVO_API_KEY not set] ${parsed.data}`);
      return done;
    }
    return { status: "error", message: GENERIC_ERROR };
  }

  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const doubleOptIn = Boolean(templateId);
  const res = await fetch(doubleOptIn ? "https://api.brevo.com/v3/contacts/doubleOptinConfirmation" : "https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(
      doubleOptIn
        ? { email: parsed.data, includeListIds: [listId], templateId, redirectionUrl: `${siteUrl()}/nieuws` }
        : { email: parsed.data, listIds: [listId], updateEnabled: true },
    ),
  });
  if (!res.ok && res.status !== 204) {
    console.error("Brevo error:", res.status, await res.text());
    return { status: "error", message: GENERIC_ERROR };
  }
  return doubleOptIn ? done : { status: "success", message: "Bedankt! Je bent ingeschreven voor de nieuwsbrief." };
}
