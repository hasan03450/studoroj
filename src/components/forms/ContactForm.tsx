"use client";

import { useActionState } from "react";
import { submitContact } from "@/lib/forms/actions";
import { CONTACT_SUBJECTS, initialFormState } from "@/lib/forms/state";
import { buttonClasses } from "../ui";
import { FormMessage, Honeypot, Select, TextArea, TextField, Turnstile } from "./fields";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-5 rounded-3xl bg-surface p-6 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Bericht verstuurd</h2>
        <FormMessage state={state} />
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative flex flex-col gap-5 rounded-3xl bg-surface p-6 sm:p-10">
      <h2 className="text-2xl font-semibold tracking-[-0.02em]">Stuur een bericht</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
        <TextField label="Naam" name="name" autoComplete="name" required defaultValue={v.name} error={e.name} />
        <TextField label="E-mailadres" name="email" type="email" autoComplete="email" required defaultValue={v.email} error={e.email} />
      </div>
      <Select label="Onderwerp" name="subject" options={CONTACT_SUBJECTS} defaultValue={v.subject} error={e.subject} />
      <TextArea label="Bericht" name="message" rows={6} required defaultValue={v.message} error={e.message} />
      <Honeypot />
      <Turnstile state={state} />
      <FormMessage state={state} />
      <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "cursor-pointer self-start border-0 px-7 disabled:opacity-60")}>
        {pending ? "Versturen…" : "Verstuur bericht"}
      </button>
    </form>
  );
}
