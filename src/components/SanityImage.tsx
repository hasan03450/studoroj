"use client";

import Image, { type ImageLoader } from "next/image";

/** Resizes on Sanity's image CDN, so Vercel's (limited, free) image optimisation isn't used. */
const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
};

export function SanityImage({
  src,
  alt,
  sizes,
  priority,
  className = "",
  objectPosition,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <Image
      loader={sanityLoader}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}
