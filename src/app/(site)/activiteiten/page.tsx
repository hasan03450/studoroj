import type { Metadata } from "next";
import { EventList } from "@/components/EventList";
import { CalendarIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, PageIntro, buttonClasses } from "@/components/ui";
import { getSettings, getUpcomingEvents } from "@/lib/content";
import { siteUrl } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const INTRO =
  "Vergaderingen, workshops en gezellige bijeenkomsten. Alle activiteiten zijn gratis voor leden; gasten zijn welkom, tenzij anders vermeld.";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: "Activiteiten", description: INTRO, path: "/activiteiten" });
}

export default async function EventsPage() {
  const [events, settings] = await Promise.all([getUpcomingEvents(), getSettings()]);

  // Structured data so search engines can show the events (only real, dated ones).
  const eventsJsonLd = events
    .filter((e) => e.start)
    .map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: e.title,
      description: e.description ?? undefined,
      startDate: e.start,
      endDate: e.end ?? undefined,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: e.location ?? settings.name, address: e.location ?? settings.city },
      organizer: { "@type": "Organization", name: settings.name, url: siteUrl() },
      isAccessibleForFree: true,
    }));

  return (
    <>
      {eventsJsonLd.length > 0 && <JsonLd data={eventsJsonLd} />}
      <section className="container-site flex flex-wrap items-end justify-between gap-8 pt-12 pb-10 sm:pt-[88px] sm:pb-12">
        <div className="max-w-[680px]">
          <PageIntro eyebrow="Agenda" title="Activiteiten & bijeenkomsten" text={INTRO} />
        </div>
        <a href="/agenda.ics" className={buttonClasses("outline", "md")} download="studuroj-agenda.ics">
          <CalendarIcon />
          Zet in je agenda
        </a>
      </section>

      <EventList events={events} />

      <section className="container-site pb-12 sm:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] bg-surface p-7 sm:rounded-[28px] sm:p-12">
          <div className="flex max-w-[600px] flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">Zelf een activiteit organiseren?</h2>
            <p className="text-base leading-relaxed text-muted">
              Leden kunnen activiteiten voorstellen. Stuur ons je idee en de activiteitencommissie neemt contact met je op.
            </p>
          </div>
          <ButtonLink href="/contact" size="md" className="px-6">
            Activiteit voorstellen
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
