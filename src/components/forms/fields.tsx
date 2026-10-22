"use client";

import Script from "next/script";
import { useEffect, useId } from "react";
import type { FormState } from "@/lib/forms/state";

export const inputClass =
  "min-h-12 w-full rounded-xl border border-line-strong bg-white px-3.5 text-[15px] font-normal text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 aria-[invalid=true]:border-[#B42318]";

type BaseProps = { label: string; name: string; error?: string; className?: string };

function FieldShell({ label, error, errorId, className = "", children }: { label: string; error?: string; errorId: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-2 text-sm font-medium ${className}`}>
      {label}
      {children}
      {error && (
        <span id={errorId} className="text-[13px] font-normal text-[#B42318]">
          {error}
        </span>
      )}
    </label>
  );
}

export function TextField({ label, name, error, className, ...rest }: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <FieldShell label={label} error={error} errorId={id} className={className}>
      <input name={name} aria-invalid={error ? true : undefined} aria-describedby={error ? id : undefined} className={inputClass} {...rest} />
    </FieldShell>
  );
}

export function TextArea({ label, name, error, className, ...rest }: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <FieldShell label={label} error={error} errorId={id} className={className}>
      <textarea
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? id : undefined}
        className={`${inputClass} resize-y py-3`}
        {...rest}
      />
    </FieldShell>
  );
}

export function Select({ label, name, error, options, className, ...rest }: BaseProps & { options: readonly string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <FieldShell label={label} error={error} errorId={id} className={className}>
      <select name={name} aria-invalid={error ? true : undefined} aria-describedby={error ? id : undefined} className={`${inputClass} px-3`} {...rest}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </FieldShell>
  );
}

/** Hidden field that only bots fill in. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Laat dit veld leeg
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Cloudflare Turnstile spam check; renders nothing until a site key is configured. */
export function Turnstile({ state }: { state: FormState }) {
  useEffect(() => {
    if (state.status === "error") window.turnstile?.reset();
  }, [state]);
  if (!TURNSTILE_SITE_KEY) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-language="nl" />
    </>
  );
}

/** Success or error message, announced to screen readers. */
export function FormMessage({ state, tone = "light" }: { state: FormState; tone?: "light" | "dark" }) {
  if (state.status === "idle" || !state.message) return <div role="status" aria-live="polite" />;
  const color =
    state.status === "success"
      ? tone === "dark"
        ? "bg-brand-dark text-white"
        : "bg-mint text-brand"
      : tone === "dark"
        ? "bg-white text-[#B42318]"
        : "bg-[#FEF3F2] text-[#B42318]";
  return (
    <div role={state.status === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-xl px-4 py-3 text-[15px] ${color}`}>
      {state.message}
    </div>
  );
}
