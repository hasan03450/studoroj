import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/**
 * Membership confirmation links carry the sign-up details, encrypted (AES-256-GCM),
 * so no database is needed and no personal data is readable in the URL.
 */

const VALID_FOR_MS = 7 * 24 * 60 * 60 * 1000;

function key(): Buffer {
  const secret = process.env.MEMBERSHIP_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") throw new Error("MEMBERSHIP_TOKEN_SECRET must be set (32+ characters).");
    return createHash("sha256").update("development-only-secret").digest();
  }
  return createHash("sha256").update(secret).digest();
}

export function sealToken(payload: object): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify({ ...payload, exp: Date.now() + VALID_FOR_MS }), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url");
}

export function openToken<T>(token: string): T | null {
  try {
    const raw = Buffer.from(token, "base64url");
    const decipher = createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const json = Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8");
    const data = JSON.parse(json) as T & { exp: number };
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}
