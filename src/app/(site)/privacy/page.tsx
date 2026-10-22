import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { PageIntro } from "@/components/ui";
import { getPrivacyPage, getSettings } from "@/lib/content";
import { EMAIL_PLACEHOLDER, formatLongDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: "Privacyverklaring", description: "Hoe StuduRoj omgaat met je persoonsgegevens.", path: "/privacy" });
}

const prose =
  "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mb-4 [&_p]:text-[17px] [&_p]:leading-[1.7] [&_p]:text-ink-soft [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1 [&_li]:text-[17px] [&_li]:text-ink-soft";

export default async function PrivacyPage() {
  const [page, s] = await Promise.all([getPrivacyPage(), getSettings()]);
  const email = s.email ?? EMAIL_PLACEHOLDER;

  return (
    <section className="container-site max-w-[816px]! py-12 sm:py-[88px]">
      <PageIntro
        eyebrow="Privacy"
        title="Privacyverklaring"
        text={page?.updatedAt ? `Laatst bijgewerkt op ${formatLongDate(page.updatedAt)}.` : undefined}
      />
      <div className={`mt-10 ${prose}`}>
        {page?.body?.length ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <PortableText value={page.body as any} />
        ) : (
          <>
            <p>
              [Concept – laat deze tekst controleren door het bestuur.] {s.name} gaat zorgvuldig om met je persoonsgegevens en houdt
              zich aan de Algemene Verordening Gegevensbescherming (AVG).
            </p>
            <h2>Welke gegevens we verwerken</h2>
            <ul>
              <li>Bij aanmelding als lid: naam, e-mailadres, telefoonnummer (optioneel) en geboortedatum.</li>
              <li>Via het contactformulier: naam, e-mailadres en je bericht.</li>
              <li>Voor de nieuwsbrief: alleen je e-mailadres.</li>
            </ul>
            <h2>Waarvoor we ze gebruiken</h2>
            <p>
              Om je ledenadministratie bij te houden, je uit te nodigen voor activiteiten en de algemene ledenvergadering, en om je vragen
              te beantwoorden. We verkopen of delen je gegevens nooit met derden voor commerciële doeleinden.
            </p>
            <h2>Hoe lang we ze bewaren</h2>
            <p>[Bewaartermijn, bijvoorbeeld: tot twee jaar na het einde van je lidmaatschap.]</p>
            <h2>Cookies</h2>
            <p>Deze website gebruikt geen tracking- of advertentiecookies.</p>
            <h2>Je rechten</h2>
            <p>
              Je kunt je gegevens altijd inzien, laten aanpassen of laten verwijderen. Stuur daarvoor een e-mail naar {email}. Ben je het
              niet eens met hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
