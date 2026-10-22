"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitMembership } from "@/lib/forms/actions";
import { initialFormState } from "@/lib/forms/state";
import { buttonClasses } from "../ui";
import { FormMessage, Honeypot, TextArea, TextField, Turnstile } from "./fields";

export function MembershipForm() {
  const [state, action, pending] = useActionState(submitMembership, initialFormState);
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 sm:p-10">
        <h3 className="text-2xl font-semibold tracking-[-0.02em]">Check je inbox</h3>
        <FormMessage state={state} />
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative flex flex-col gap-5 rounded-3xl bg-white p-6 sm:p-10">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
        <TextField label="Voornaam" name="firstName" autoComplete="given-name" required defaultValue={v.firstName} error={e.firstName} />
        <TextField label="Achternaam" name="lastName" autoComplete="family-name" required defaultValue={v.lastName} error={e.lastName} />
      </div>
      <TextField label="E-mailadres" name="email" type="email" autoComplete="email" required defaultValue={v.email} error={e.email} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
        <TextField label="Telefoonnummer" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} error={e.phone} />
        <TextField label="Geboortedatum" name="birthDate" type="date" autoComplete="bday" required defaultValue={v.birthDate} error={e.birthDate} />
      </div>
      <TextArea label="Wil je ons nog iets vertellen? (optioneel)" name="message" rows={3} defaultValue={v.message} error={e.message} />
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5 text-sm leading-normal text-muted">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={v.consent === "on"}
            aria-invalid={e.consent ? true : undefined}
            className="mt-0.5 size-[18px] shrink-0 accent-brand"
          />
          <span>
            Ik ga akkoord met de <Link href="/over-ons#documenten">statuten</Link> en de <Link href="/privacy">privacyverklaring</Link> van
            de vereniging.
          </span>
        </label>
        {e.consent && <span className="text-[13px] text-[#B42318]">{e.consent}</span>}
      </div>
      <Honeypot />
      <Turnstile state={state} />
      <FormMessage state={state} />
      <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full cursor-pointer border-0 disabled:opacity-60")}>
        {pending ? "Versturen…" : "Gratis aanmelden"}
      </button>
    </form>
  );
}
