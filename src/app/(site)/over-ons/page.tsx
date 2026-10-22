import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { PageIntro, SectionHeader } from "@/components/ui";
import { getAboutPage, getBoardMembers, getDocuments } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return pageMetadata({ title: "Over ons", description: page.intro.startsWith("[") ? undefined : page.intro, path: "/over-ons" });
}

const row = "flex items-center justify-between gap-4 py-[22px] text-[17px] font-medium text-ink no-underline";

export default async function AboutPage() {
  const [page, board, documents] = await Promise.all([getAboutPage(), getBoardMembers(), getDocuments()]);

  return (
    <>
      <section className="container-site pt-12 pb-10 sm:pt-[88px] sm:pb-16">
        <PageIntro eyebrow="Over ons" title={page.title} text={page.intro} />
      </section>

      <section className="container-site">
        <Photo
          image={page.image}
          placeholder="Brede foto: groep leden"
          priority
          sizes="(min-width: 1248px) 1152px, 100vw"
          className="aspect-[4/3] rounded-[22px] sm:aspect-[21/8] sm:rounded-[28px]"
        />
      </section>

      {/* Mission, vision, values */}
      <section className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4 py-12 sm:gap-6 sm:py-24">
        <div className="flex flex-col gap-3.5 rounded-3xl bg-surface p-7 sm:p-10">
          <p className="eyebrow">Missie</p>
          <p className="text-[22px] leading-tight font-semibold tracking-[-0.02em] sm:text-[26px]">{page.mission}</p>
        </div>
        <div className="flex flex-col gap-3.5 rounded-3xl bg-surface p-7 sm:p-10">
          <p className="eyebrow">Visie</p>
          <p className="text-[22px] leading-tight font-semibold tracking-[-0.02em] sm:text-[26px]">{page.vision}</p>
        </div>
        <div className="flex flex-col gap-3.5 rounded-3xl bg-brand p-7 text-white sm:p-10">
          <p className="eyebrow text-mist!">Kernwaarden</p>
          <ul className="flex flex-col gap-2.5 text-lg font-medium">
            {page.values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* History */}
      <section className="border-t border-line">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-8 py-12 sm:gap-16 sm:py-24">
          <div className="flex flex-col gap-3.5">
            <p className="eyebrow">Geschiedenis</p>
            <h2 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">Ons verhaal tot nu toe</h2>
          </div>
          <ol className="flex flex-col">
            {page.timeline.map((m, i) => (
              <li key={i} className="grid grid-cols-[72px_1fr] gap-4 border-b border-line py-6 last:border-b-0 sm:grid-cols-[96px_1fr] sm:gap-6">
                <span className="text-lg font-semibold text-brand">{m.year}</span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-lg font-semibold">{m.title}</span>
                  <span className="text-[15px] leading-[1.55] text-muted">{m.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Board */}
      {board.length > 0 && (
        <section className="bg-surface">
          <div className="container-site py-12 sm:py-24">
            <SectionHeader eyebrow="Bestuur" title="De mensen achter de vereniging" />
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
              {board.map((m) => (
                <li key={m._id} className="flex flex-col gap-4 rounded-[20px] bg-white p-5">
                  <Photo
                    image={m.photo ? { ...m.photo, alt: m.photo.alt ?? m.name } : null}
                    placeholder={`Foto van ${m.name}`}
                    showPlaceholderLabel={false}
                    sizes="(min-width: 1024px) 250px, 50vw"
                    className="aspect-square rounded-[14px] bg-sage"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-[17px] font-semibold">{m.name}</span>
                    {m.role && <span className="text-sm text-muted">{m.role}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Documents */}
      <section id="documenten" className="container-site grid scroll-mt-24 grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-8 py-12 sm:gap-16 sm:py-24">
        <div className="flex flex-col gap-3.5">
          <p className="eyebrow">Documenten</p>
          <h2 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">Officiële documenten</h2>
          <p className="text-base leading-relaxed text-muted">Onze statuten, reglementen en verslagen zijn voor iedereen beschikbaar.</p>
        </div>
        <ul className="flex flex-col [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-line">
          {documents.map((doc) => (
            <li key={doc._id}>
              {doc.url ? (
                <a href={`${doc.url}?dl=`} download className={`${row} hover:text-brand`}>
                  <span>{doc.title}</span>
                  <span className="text-[13px] text-brand">PDF ↓</span>
                </a>
              ) : (
                <span className={row}>
                  <span>{doc.title}</span>
                  <span className="text-[13px] text-muted">[PDF volgt]</span>
                </span>
              )}
            </li>
          ))}
          <li>
            <Link href="/privacy" className={`${row} hover:text-brand`}>
              <span>Privacyverklaring</span>
              <span className="text-[13px] text-brand" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
