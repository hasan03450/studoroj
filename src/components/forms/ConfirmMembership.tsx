"use client";

import { useActionState } from "react";
import { confirmMembership } from "@/lib/forms/actions";
import { initialFormState } from "@/lib/forms/state";
import { ButtonLink, buttonClasses } from "../ui";
import { FormMessage } from "./fields";

/** A button rather than an automatic confirm, so email link scanners can't confirm on someone's behalf. */
export function ConfirmMembership({ token }: { token: string }) {
  const [state, action, pending] = useActionState(confirmMembership, initialFormState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-6">
        <FormMessage state={state} />
        <ButtonLink href="/activiteiten">Bekijk de activiteiten</ButtonLink>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col items-center gap-5">
      <input type="hidden" name="token" value={token} />
      <FormMessage state={state} />
      <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "cursor-pointer border-0 px-7 disabled:opacity-60")}>
        {pending ? "Bevestigen…" : "Bevestig mijn aanmelding"}
      </button>
    </form>
  );
}
