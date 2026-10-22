import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Photo } from "@/components/Photo";
import { PostCard } from "@/components/PostCard";
import { PageIntro } from "@/components/ui";
import { getPosts } from "@/lib/content";
import { formatLongDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const INTRO = "Aankondigingen, verslagen van activiteiten en verhalen van onze leden.";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: "Nieuws", description: INTRO, path: "/nieuws" });
}

export default async function NewsPage() {
  const posts = await getPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <>
      <section className="container-site pt-12 pb-10 sm:pt-[88px] sm:pb-14">
        <PageIntro eyebrow="Nieuws" title="Nieuws & updates" text={INTRO} />
      </section>

      {featured ? (
        <section className="container-site pb-12 sm:pb-20">
          <Link
            href={`/nieuws/${featured.slug}`}
            className="group grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-6 text-ink no-underline hover:text-ink sm:gap-12"
          >
            <Photo
              image={featured.mainImage}
              placeholder="Uitgelichte foto"
              priority
              sizes="(min-width: 1024px) 570px, 100vw"
              className="aspect-[16/11] rounded-[22px] sm:rounded-[28px]"
            />
            <div className="flex flex-col gap-4 sm:gap-[18px]">
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted">
                <span className="rounded-full bg-mint px-2.5 py-1 font-medium text-brand">Uitgelicht</span>
                <time dateTime={featured.publishedAt ?? undefined}>{formatLongDate(featured.publishedAt)}</time>
              </p>
              <h2 className="text-[28px] leading-[1.15] font-semibold tracking-[-0.025em] group-hover:underline sm:text-4xl">{featured.title}</h2>
              {featured.excerpt && <p className="text-base leading-relaxed text-muted sm:text-[17px]">{featured.excerpt}</p>}
              <span className="text-[15px] font-medium text-brand">
                Lees artikel <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>
      ) : (
        <section className="container-site pb-12">
          <p className="text-muted">Er zijn nog geen nieuwsberichten.</p>
        </section>
      )}

      {rest.length > 0 && (
        <section className="border-t border-line">
          <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 gap-y-12 pt-12 pb-12 sm:pt-[72px] sm:pb-24">
            {rest.map((post) => (
              <PostCard key={post._id} post={post} showExcerpt />
            ))}
          </div>
        </section>
      )}

      <section className="container-site pb-12 sm:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[24px] bg-brand p-7 sm:rounded-[32px] sm:p-14">
          <div className="flex max-w-[520px] flex-col gap-2.5">
            <h2 className="text-[28px] leading-[1.15] font-semibold tracking-[-0.025em] text-white sm:text-[32px]">Blijf op de hoogte</h2>
            <p className="text-base leading-relaxed text-mist">
              Ontvang onze nieuwsbrief met nieuws en komende activiteiten, ongeveer één keer per maand.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
