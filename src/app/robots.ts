import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/format";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of search engines.
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  return {
    rules: isProduction ? { userAgent: "*", allow: "/", disallow: ["/studio", "/api/", "/lid-worden/bevestigen"] } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
