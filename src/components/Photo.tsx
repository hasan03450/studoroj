import type { SanityImage as SanityImageType } from "@/lib/content";
import { urlFor } from "@/sanity/image";
import { SanityImage } from "./SanityImage";
import { PhotoPlaceholder } from "./ui";

/**
 * A rounded photo frame with a fixed aspect ratio.
 * Shows the Sanity image when set, otherwise a labelled placeholder from the design.
 */
export function Photo({
  image,
  placeholder,
  sizes,
  className,
  priority,
  showPlaceholderLabel = true,
}: {
  image?: SanityImageType | null;
  placeholder: string;
  sizes: string;
  className: string;
  priority?: boolean;
  showPlaceholderLabel?: boolean;
}) {
  if (!image?.asset) {
    return showPlaceholderLabel ? (
      <PhotoPlaceholder label={placeholder} className={className} />
    ) : (
      <div className={className} aria-hidden="true" />
    );
  }
  const position = image.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : undefined;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <SanityImage src={urlFor(image).url()} alt={image.alt ?? ""} sizes={sizes} priority={priority} objectPosition={position} />
    </div>
  );
}
