import "server-only";
import { Resend } from "resend";

type Mail = { to: string; subject: string; text: string; replyTo?: string };

const isProd = process.env.NODE_ENV === "production";

/** Sends an email through Resend. Without an API key it logs the email in development and fails in production. */
export async function sendMail(mail: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    if (!isProd) {
      console.info(`[email – not sent, RESEND_API_KEY not set]\nTo: ${mail.to}\nSubject: ${mail.subject}\n\n${mail.text}`);
      return true;
    }
    console.error("Email not sent: RESEND_API_KEY or EMAIL_FROM is missing.");
    return false;
  }
  const { error } = await new Resend(key).emails.send({ from, to: mail.to, subject: mail.subject, text: mail.text, replyTo: mail.replyTo });
  if (error) {
    console.error("Resend error:", error);
    return false;
  }
  return true;
}

export function boardAddress(): string | null {
  return process.env.EMAIL_TO_BOARD || (isProd ? null : "bestuur@example.test");
}
