import type { Metadata } from "next";
import { getSettings } from "./content";
import { settings as fallbackSettings } from "./fallback";
import { siteUrl } from "./format";
import { urlFor } from "@/sanity/image";

export const fallbackSeoDescription = fallbackSettings.seoDescription;

/** Standard metadata for a page: title, description, canonical URL and share image. */
export async function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description?: string;
  path: string;
  image?: string;
}): Promise<Metadata> {
  const s = await getSettings();
  const desc = description || s.seoDescription;
  const ogImage = image ?? (s.ogImage?.asset ? urlFor(s.ogImage).width(1200).height(630).fit("crop").url() : undefined);
  return {
    ...(title ? { title } : {}),
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} | ${s.name}` : `${s.name} – ${s.tagline}`,
      description: desc,
      url: path,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  };
}

/** JSON-LD for the association; rendered on every page. */
export async function organizationJsonLd() {
  const s = await getSettings();
  const real = (v: string | null | undefined) => (v && !v.startsWith("[") ? v : undefined);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.name,
    alternateName: s.tagline,
    url: siteUrl(),
    logo: `${siteUrl()}/images/logo.png`,
    email: real(s.email),
    telephone: real(s.phone),
    foundingDate: real(s.foundedYear),
    address: real(s.street)
      ? {
          "@type": "PostalAddress",
          streetAddress: s.street,
          postalCode: real(s.postcode),
          addressLocality: real(s.city),
          addressCountry: "NL",
        }
      : undefined,
  };
}
