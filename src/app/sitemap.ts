import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { siteUrl } from "@/lib/format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  const base = siteUrl();
  const pages = ["", "/over-ons", "/activiteiten", "/nieuws", "/lid-worden", "/contact", "/privacy"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const posts = (await getPosts(500))
    .filter((p) => p.publishedAt) // skip example content
    .map((p) => ({ url: `${base}/nieuws/${p.slug}`, lastModified: p.publishedAt!, changeFrequency: "monthly" as const, priority: 0.5 }));
  return [...pages, ...posts];
}
