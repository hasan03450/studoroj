import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { PageIntro } from "@/components/ui";
import { getSettings } from "@/lib/content";
import { EMAIL_PLACEHOLDER } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Contact",
    description: "Vragen over het lidmaatschap, activiteiten of iets anders? Neem contact op met StuduRoj.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const s = await getSettings();
  const address = `${s.street}, ${s.postcode} ${s.city}`;
  const hasAddress = !s.street.startsWith("[");
  const mapsUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`;

  return (
    <>
      <section className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-10 pt-12 pb-12 sm:gap-16 sm:pt-[88px] sm:pb-24">
        <div className="flex flex-col gap-[22px]">
          <PageIntro
            eyebrow="Contact"
            title="Neem contact op."
            text={`Vragen over het lidmaatschap, activiteiten of iets anders? Stuur ons een bericht, dan reageren we binnen ${s.responseDays} werkdagen.`}
          />
          <ul className="mt-4 flex flex-col border-t border-line">
            <li className="flex items-center gap-4 border-b border-line py-5">
              <MailIcon />
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-muted">E-mail</span>
                {s.email ? (
                  <a href={`mailto:${s.email}`} className="text-[17px] font-medium no-underline">
                    {s.email}
                  </a>
                ) : (
                  <span className="text-[17px] font-medium text-brand">{EMAIL_PLACEHOLDER}</span>
                )}
              </div>
            </li>
            <li className="flex items-center gap-4 border-b border-line py-5">
              <PhoneIcon />
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-muted">Telefoon</span>
                {s.phone.startsWith("[") ? (
                  <span className="text-[17px] font-medium">{s.phone}</span>
                ) : (
                  <a href={`tel:${s.phone.replace(/[^+0-9]/g, "")}`} className="text-[17px] font-medium text-ink no-underline">
                    {s.phone}
                  </a>
                )}
              </div>
            </li>
            <li className="flex items-center gap-4 border-b border-line py-5">
              <PinIcon />
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-muted">Bezoekadres</span>
                <span className="text-[17px] font-medium">{address}</span>
              </div>
            </li>
          </ul>
          <p className="text-sm text-muted">KvK {s.kvk}</p>
        </div>
        <ContactForm />
      </section>

      <section className="container-site pb-12 sm:pb-24">
        {hasAddress ? (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group relative block no-underline">
            <Photo
              image={s.mapImage}
              placeholder={`Kaart: ${address}`}
              sizes="(min-width: 1248px) 1152px, 100vw"
              className="aspect-[4/3] rounded-[22px] sm:aspect-[21/7] sm:rounded-[28px]"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand shadow-sm group-hover:bg-mint">
              Bekijk op de kaart <span className="sr-only">(opent in nieuw venster)</span>
            </span>
          </a>
        ) : (
          <Photo
            image={s.mapImage}
            placeholder="Kaart: locatie van de vereniging"
            sizes="(min-width: 1248px) 1152px, 100vw"
            className="aspect-[4/3] rounded-[22px] sm:aspect-[21/7] sm:rounded-[28px]"
          />
        )}
      </section>
    </>
  );
}
