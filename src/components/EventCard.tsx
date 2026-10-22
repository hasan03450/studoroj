import Link from "next/link";
import type { EventItem } from "@/lib/content";
import { EVENT_CATEGORY_LABEL, eventDateParts } from "@/lib/format";

export function DateTile({ event, size = "sm", highlight = false }: { event: EventItem; size?: "sm" | "lg"; highlight?: boolean }) {
  const { day, month, iso } = eventDateParts(event);
  const box = size === "lg" ? "size-[76px] rounded-[18px]" : "size-14 rounded-[14px]";
  const colors = highlight ? "bg-brand text-white" : "bg-mint text-brand";
  const Tag = iso ? "time" : "div";
  return (
    <Tag {...(iso ? { dateTime: iso } : {})} className={`flex shrink-0 flex-col items-center justify-center leading-none ${box} ${colors}`}>
      <span className={`font-semibold ${size === "lg" ? "text-[26px]" : "text-xl"}`}>{day}</span>
      <span className={`tracking-[0.06em] ${size === "lg" ? "mt-1 text-xs" : "mt-[3px] text-[11px]"}`}>{month}</span>
    </Tag>
  );
}

/** Compact card used on the home page. */
export function EventCard({ event, highlight }: { event: EventItem; highlight?: boolean }) {
  const { time } = eventDateParts(event);
  return (
    <Link
      href="/activiteiten"
      className="flex flex-col gap-5 rounded-[20px] border border-line p-7 text-ink no-underline transition-colors hover:border-line-strong hover:text-ink"
    >
      <div className="flex items-center gap-3.5">
        <DateTile event={event} highlight={highlight} />
        <span className="text-[13px] text-muted">
          {EVENT_CATEGORY_LABEL[event.category]} · {time}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold tracking-[-0.01em]">{event.title}</h3>
        <p className="text-[15px] leading-[1.55] text-muted">
          {event.location ?? "[Locatie]"} · {event.description}
        </p>
      </div>
    </Link>
  );
}
