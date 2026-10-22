import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { ActivitiesIcon, CommunityIcon, RingsArt, SupportIcon } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { PostCard } from "@/components/PostCard";
import { ButtonLink, SectionHeader } from "@/components/ui";
import { getHomePage, getPosts, getSettings, getUpcomingEvents } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/image";
import { SanityImage } from "@/components/SanityImage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: "/" });
}

const FEATURE_ICONS = [CommunityIcon, ActivitiesIcon, SupportIcon];

export default async function HomePage() {
  const [home, settings, events, posts] = await Promise.all([getHomePage(), getSettings(), getUpcomingEvents(3), getPosts(3)]);

  return (
    <>
      {/* Hero */}
      <section className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-10 pt-10 pb-12 sm:gap-16 sm:pt-24 sm:pb-[88px]">
        <div className="flex flex-col gap-5 sm:gap-7">
          <p className="self-start rounded-full bg-mint px-3 py-1.5 text-xs font-medium text-brand sm:px-3.5 sm:text-[13px]">
            Vereniging sinds {settings.foundedYear} · {settings.city}
          </p>
          <h1 className="text-[42px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-[clamp(2.75rem,5vw,4.5rem)]">{home.heroTitle}</h1>
          <p className="max-w-[520px] text-[17px] leading-relaxed text-muted sm:text-[19px]">{home.heroText}</p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <ButtonLink href="/lid-worden">Word lid</ButtonLink>
            <ButtonLink href="/activiteiten" variant="outline">
              Bekijk activiteiten
            </ButtonLink>
          </div>
        </div>
        <div className="relative flex aspect-[4/3.4] items-end overflow-hidden rounded-[22px] bg-brand p-5 sm:rounded-[28px] sm:p-7">
          {home.heroImage?.asset ? (
            <SanityImage
              src={urlFor(home.heroImage).url()}
              alt={home.heroImage.alt ?? ""}
              sizes="(min-width: 1024px) 570px, 100vw"
              priority
            />
          ) : (
            <>
              <RingsArt />
              <span className="relative text-[13px] text-mist sm:text-sm">[Foto: leden tijdens een activiteit]</span>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-7 py-10 sm:gap-12 sm:py-[72px]">
          {home.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? CommunityIcon;
            return (
              <div key={i} className="flex gap-4 sm:flex-col sm:gap-3.5">
                <Icon />
                <div className="flex flex-col gap-1.5 sm:gap-3.5">
                  <h2 className="text-lg font-semibold tracking-[-0.01em] sm:text-xl">{f.title}</h2>
                  <p className="text-[15px] leading-relaxed text-muted sm:text-base">{f.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="container-site py-12 sm:py-24">
        <SectionHeader eyebrow="Agenda" title="Komende activiteiten" link={{ href: "/activiteiten", label: "Alle activiteiten" }} />
        {events.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {events.map((event, i) => (
              <EventCard key={event._id} event={event} highlight={i === 0} />
            ))}
          </div>
        ) : (
          <p className="text-muted">Er staan op dit moment geen activiteiten gepland. Kijk binnenkort nog eens!</p>
        )}
      </section>

      {/* About teaser */}
      <section className="bg-surface">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-8 py-12 sm:gap-16 sm:py-24">
          <Photo
            image={home.aboutImage}
            placeholder="Foto: het bestuur of clubhuis van de vereniging"
            sizes="(min-width: 1024px) 570px, 100vw"
            className="aspect-[5/4] rounded-[22px] sm:rounded-[28px]"
          />
          <div className="flex flex-col gap-5 sm:gap-[22px]">
            <p className="eyebrow">Over ons</p>
            <h2 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">{home.aboutTitle}</h2>
            <p className="text-base leading-[1.65] text-muted sm:text-[17px]">{home.aboutText}</p>
            <ButtonLink href="/over-ons" variant="outline" size="md" className="self-start">
              Lees ons verhaal
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Latest news */}
      {posts.length > 0 && (
        <section className="container-site py-12 sm:py-24">
          <SectionHeader eyebrow="Nieuws" title="Laatste updates" link={{ href: "/nieuws", label: "Al het nieuws" }} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Join call to action */}
      <section className="container-site pb-12 sm:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[24px] bg-brand px-6 py-10 sm:rounded-[32px] sm:px-14 sm:py-[72px]">
          <div className="flex max-w-[620px] flex-col gap-3.5">
            <h2 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-white sm:text-[40px]">{home.ctaTitle}</h2>
            <p className="text-base leading-relaxed text-mist sm:text-[17px]">{home.ctaText}</p>
          </div>
          <ButtonLink href="/lid-worden" variant="white" className="w-full px-7 sm:w-auto">
            Gratis lid worden
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
