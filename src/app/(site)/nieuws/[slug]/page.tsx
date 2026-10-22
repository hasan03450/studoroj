import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { PostCard } from "@/components/PostCard";
import { ButtonLink } from "@/components/ui";
import { getPost, getPostSlugs, getPosts, getSettings, type SanityImage } from "@/lib/content";
import { POST_CATEGORY_LABEL, formatLongDate, siteUrl } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/image";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  // Cache Components needs at least one entry; an unknown slug simply shows the 404 page.
  return (slugs.length ? slugs : ["nog-geen-berichten"]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/nieuws/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Bericht niet gevonden", robots: { index: false } };
  const image = post.mainImage?.asset ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url() : undefined;
  const meta = await pageMetadata({ title: post.title, description: post.excerpt ?? undefined, path: `/nieuws/${post.slug}`, image });
  return {
    ...meta,
    // Example posts are placeholders and should never appear in search results.
    ...(post._id.startsWith("voorbeeld-") ? { robots: { index: false } } : {}),
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.publishedAt ?? undefined },
  };
}

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 mb-4 text-[28px] leading-tight font-semibold tracking-[-0.02em]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-[22px] font-semibold tracking-[-0.015em]">{children}</h3>,
    normal: ({ children }) => <p className="mb-5 text-[17px] leading-[1.7] text-ink-soft">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-2xl bg-surface px-6 py-5 text-lg leading-relaxed text-ink">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-ink-soft">{children}</ul>,
    number: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-ink-soft">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="underline">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <Photo image={value} placeholder="" sizes="(min-width: 768px) 720px, 100vw" className="my-8 aspect-[16/10] rounded-[18px]" />
    ),
  },
};

export default async function PostPage({ params }: PageProps<"/nieuws/[slug]">) {
  const { slug } = await params;
  const [post, settings, latest] = await Promise.all([getPost(slug), getSettings(), getPosts(4)]);
  if (!post) notFound();
  const more = latest.filter((p) => p._id !== post._id).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    image: post.mainImage?.asset ? [urlFor(post.mainImage).width(1200).url()] : undefined,
    mainEntityOfPage: `${siteUrl()}/nieuws/${post.slug}`,
    publisher: { "@type": "Organization", name: settings.name, logo: { "@type": "ImageObject", url: `${siteUrl()}/images/logo.png` } },
  };

  return (
    <>
      {post.publishedAt && <JsonLd data={articleJsonLd} />}
      <article>
        <header className="container-site max-w-[816px]! pt-12 pb-8 sm:pt-[88px] sm:pb-12">
          <nav aria-label="Kruimelpad" className="mb-6 text-sm">
            <Link href="/nieuws" className="no-underline">
              <span aria-hidden="true">←</span> Alle nieuws
            </Link>
          </nav>
          <p className="mb-4 text-[13px] text-muted">
            <time dateTime={post.publishedAt ?? undefined}>{formatLongDate(post.publishedAt)}</time>
            {post.category && <> · {POST_CATEGORY_LABEL[post.category]}</>}
          </p>
          <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.035em]">{post.title}</h1>
          {post.excerpt && <p className="mt-5 text-[19px] leading-relaxed text-muted">{post.excerpt}</p>}
        </header>
        {post.mainImage?.asset && (
          <div className="container-site max-w-[1032px]!">
            <Photo image={post.mainImage} placeholder="" priority sizes="(min-width: 1032px) 984px, 100vw" className="aspect-[16/9] rounded-[22px] sm:rounded-[28px]" />
          </div>
        )}
        <div className="container-site max-w-[816px]! py-10 sm:py-16">
          {post.body?.length ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <PortableText value={post.body as any} components={portableComponents} />
          ) : (
            <p className="text-[17px] leading-[1.7] text-ink-soft">[De volledige tekst van het artikel komt hier.]</p>
          )}
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-line">
          <div className="container-site py-12 sm:py-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[32px]">Meer nieuws</h2>
              <ButtonLink href="/nieuws" variant="outline" size="md">
                Al het nieuws
              </ButtonLink>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8">
              {more.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
