"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/forms/actions";
import { initialFormState } from "@/lib/forms/state";
import { FormMessage, Honeypot } from "./fields";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initialFormState);

  if (state.status === "success") {
    return (
      <div className="max-w-[480px] flex-[1_1_380px]">
        <FormMessage state={state} tone="dark" />
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative flex max-w-[480px] flex-[1_1_380px] flex-col gap-2.5">
      <div className="flex flex-wrap gap-2.5">
        <label className="flex flex-[1_1_220px]">
          <span className="sr-only">E-mailadres</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Je e-mailadres"
            className="min-h-[52px] flex-1 rounded-full border border-input-dark bg-brand-dark px-5 text-[15px] text-white outline-none placeholder:text-mist/80 focus:border-white"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="min-h-[52px] cursor-pointer rounded-full border-0 bg-white px-[26px] text-[15px] font-semibold text-brand hover:bg-mint disabled:opacity-60"
        >
          {pending ? "Bezig…" : "Inschrijven"}
        </button>
      </div>
      <Honeypot />
      <FormMessage state={state} tone="dark" />
    </form>
  );
}
