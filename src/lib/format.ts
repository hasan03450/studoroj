import type { EventCategory, EventItem, PostCategory } from "./content";

const TZ = "Europe/Amsterdam";

export const EVENT_CATEGORY_LABEL: Record<EventCategory, string> = {
  vergadering: "Vergadering",
  workshop: "Workshop",
  sociaal: "Sociaal",
};

export const POST_CATEGORY_LABEL: Record<PostCategory, string> = {
  vereniging: "Vereniging",
  activiteiten: "Activiteiten",
  leden: "Leden",
};

/** Date tile + time label for an event; falls back to placeholders for example content. */
export function eventDateParts(event: EventItem) {
  if (!event.start) {
    return { day: "[DD]", month: "[MND]", time: event.timePlaceholder ?? "[TIJD]", iso: undefined };
  }
  const date = new Date(event.start);
  const day = new Intl.DateTimeFormat("nl-NL", { day: "numeric", timeZone: TZ }).format(date);
  const month = new Intl.DateTimeFormat("nl-NL", { month: "short", timeZone: TZ }).format(date).replace(".", "").toUpperCase();
  const time = new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit", timeZone: TZ }).format(date);
  return { day, month, time, iso: event.start };
}

export function formatLongDate(iso: string | null) {
  if (!iso) return "[DD maand JJJJ]";
  return new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: TZ }).format(new Date(iso));
}

export function siteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  return (fromEnv || "http://localhost:3000").replace(/\/$/, "");
}

/** Placeholder email shown until the board fills one in. */
export const EMAIL_PLACEHOLDER = "[info@domein.nl]";
