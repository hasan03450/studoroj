"use client";

import Link from "next/link";
import { useState } from "react";
import type { EventCategory, EventItem } from "@/lib/content";
import { EVENT_CATEGORY_LABEL, eventDateParts } from "@/lib/format";
import { DateTile } from "./EventCard";
import { buttonClasses } from "./ui";

type Filter = "alle" | EventCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "alle", label: "Alle" },
  { value: "vergadering", label: "Vergadering" },
  { value: "workshop", label: "Workshop" },
  { value: "sociaal", label: "Sociaal" },
];

export function EventList({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState<Filter>("alle");
  const shown = filter === "alle" ? events : events.filter((e) => e.category === filter);

  return (
    <>
      <div className="container-site">
        <div role="group" aria-label="Filter activiteiten" className="flex flex-wrap gap-2 border-b border-line pb-7">
          {FILTERS.map((f) => {
            const selected = f.value === filter;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f.value)}
                className={`min-h-11 cursor-pointer rounded-full border px-5 text-sm font-medium transition-colors ${
                  selected ? "border-brand bg-brand text-white" : "border-line-strong bg-white text-ink hover:bg-mint"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-site pt-2 pb-24" aria-live="polite">
        {shown.map((event) => {
          const { time } = eventDateParts(event);
          const external = Boolean(event.registrationUrl);
          return (
            <article key={event._id} className="flex flex-wrap items-center gap-x-10 gap-y-6 border-b border-line py-8">
              <DateTile event={event} size="lg" />
              <div className="flex min-w-0 flex-[999_1_380px] flex-col gap-2">
                <p className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-muted">
                  <span className="font-medium text-brand">{EVENT_CATEGORY_LABEL[event.category]}</span>
                  <span>{time}</span>
                  <span>{event.location ?? "[Locatie]"}</span>
                </p>
                <h2 className="text-[22px] font-semibold tracking-[-0.015em]">{event.title}</h2>
                {event.description && <p className="text-[15px] leading-[1.55] text-muted">{event.description}</p>}
              </div>
              {external ? (
                <a
                  href={event.registrationUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("outline", "md", "min-h-11 shrink-0 px-5 text-sm")}
                >
                  Aanmelden<span className="sr-only"> voor {event.title} (opent in nieuw venster)</span>
                </a>
              ) : (
                <Link href="/contact" className={buttonClasses("outline", "md", "min-h-11 shrink-0 px-5 text-sm")}>
                  Aanmelden<span className="sr-only"> voor {event.title}</span>
                </Link>
              )}
            </article>
          );
        })}
        {shown.length === 0 && (
          <p className="py-12 text-base text-muted">
            {events.length === 0
              ? "Er staan op dit moment geen activiteiten gepland. Kijk binnenkort nog eens!"
              : "Er zijn op dit moment geen activiteiten in deze categorie."}
          </p>
        )}
      </div>
    </>
  );
}
