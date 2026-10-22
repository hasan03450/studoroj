import Link from "next/link";
import type { PostSummary } from "@/lib/content";
import { POST_CATEGORY_LABEL, formatLongDate } from "@/lib/format";
import { Photo } from "./Photo";

export function PostCard({ post, showExcerpt = false }: { post: PostSummary; showExcerpt?: boolean }) {
  return (
    <Link href={`/nieuws/${post.slug}`} className="group flex flex-col gap-3.5 text-ink no-underline hover:text-ink">
      <Photo
        image={post.mainImage}
        placeholder="Foto bij artikel"
        showPlaceholderLabel={false}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[16/10] rounded-[18px] bg-mint"
      />
      <p className="text-[13px] text-muted">
        <time dateTime={post.publishedAt ?? undefined}>{formatLongDate(post.publishedAt)}</time>
        {post.category && <> · {POST_CATEGORY_LABEL[post.category]}</>}
      </p>
      <h3 className="text-xl leading-[1.3] font-semibold tracking-[-0.01em] group-hover:underline">{post.title}</h3>
      {showExcerpt && post.excerpt && <p className="text-[15px] leading-[1.55] text-muted">{post.excerpt}</p>}
    </Link>
  );
}
