import "server-only";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/fetch";
import * as fallback from "./fallback";

/* ---------- Types ---------- */

export type SanityImage = {
  asset?: { _ref: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type SiteSettings = {
  name: string;
  tagline: string;
  foundedYear: string;
  city: string;
  email: string | null;
  phone: string;
  street: string;
  postcode: string;
  kvk: string;
  responseDays: string;
  mapImage?: SanityImage | null;
  seoDescription: string;
  ogImage?: SanityImage | null;
};

export type HomePage = {
  heroTitle: string;
  heroText: string;
  heroImage?: SanityImage | null;
  features: { title: string; text: string }[];
  aboutTitle: string;
  aboutText: string;
  aboutImage?: SanityImage | null;
  ctaTitle: string;
  ctaText: string;
};

export type AboutPage = {
  title: string;
  intro: string;
  image?: SanityImage | null;
  mission: string;
  vision: string;
  values: string[];
  timeline: { year: string; title: string; text: string }[];
};

export type MembershipPage = {
  intro: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
};

export type EventCategory = "vergadering" | "workshop" | "sociaal";

export type EventItem = {
  _id: string;
  title: string;
  category: EventCategory;
  /** ISO date-time; null in example content. */
  start: string | null;
  end: string | null;
  location: string | null;
  description: string | null;
  registrationUrl: string | null;
  /** Shown instead of a time when there is no real date (example content). */
  timePlaceholder?: string;
};

export type PostCategory = "vereniging" | "activiteiten" | "leden";

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string | null;
  category: PostCategory | null;
  excerpt: string | null;
  featured: boolean;
  mainImage?: SanityImage | null;
};

export type Post = PostSummary & {
  // Portable Text blocks
  body: unknown[] | null;
};

export type BoardMember = { _id: string; name: string; role: string | null; photo?: SanityImage | null };
export type OfficialDocument = { _id: string; title: string; url: string | null };
export type PrivacyPage = { updatedAt: string | null; body: unknown[] | null };

/* ---------- Helpers ---------- */

/** Use Sanity values where filled in, example content everywhere else. */
function merge<T extends object>(base: T, data: Partial<T> | null): T {
  if (!data) return base;
  const out = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(data)) {
    const empty = value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
    if (!empty) out[key] = value;
  }
  return out as T;
}

/* ---------- Queries ---------- */

const settingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  name, tagline, "foundedYear": string(foundedYear), city, email, phone, street, postcode, kvk,
  "responseDays": string(responseDays), mapImage, seoDescription, ogImage
}`);

const homeQuery = defineQuery(`*[_id == "homePage"][0]{
  heroTitle, heroText, heroImage, features[]{title, text}, aboutTitle, aboutText, aboutImage, ctaTitle, ctaText
}`);

const aboutQuery = defineQuery(`*[_id == "aboutPage"][0]{
  title, intro, image, mission, vision, values, timeline[]{year, title, text}
}`);

const membershipQuery = defineQuery(`*[_id == "membershipPage"][0]{ intro, benefits, faqs[]{question, answer} }`);

const privacyQuery = defineQuery(`*[_id == "privacyPage"][0]{ updatedAt, body }`);

const eventFields = `_id, title, category, start, end, location, description, registrationUrl`;

const upcomingEventsQuery = defineQuery(
  `*[_type == "event" && coalesce(end, start) >= now()] | order(start asc)[0...$limit]{ ${eventFields} }`,
);

const postFields = `_id, title, "slug": slug.current, publishedAt, category, excerpt, "featured": coalesce(featured, false), mainImage`;

const postsQuery = defineQuery(
  `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc)[0...$limit]{ ${postFields} }`,
);

const postQuery = defineQuery(`*[_type == "post" && slug.current == $slug && publishedAt <= now()][0]{ ${postFields}, body }`);

const postSlugsQuery = defineQuery(`*[_type == "post" && defined(slug.current) && publishedAt <= now()].slug.current`);

const boardQuery = defineQuery(`*[_type == "boardMember"] | order(order asc, name asc){ _id, name, role, photo }`);

const documentsQuery = defineQuery(`*[_type == "officialDocument"] | order(order asc, title asc){ _id, title, "url": file.asset->url }`);

/* ---------- Fetchers ---------- */

export async function getSettings(): Promise<SiteSettings> {
  return merge(fallback.settings, await sanityFetch<Partial<SiteSettings>>(settingsQuery));
}

export async function getHomePage(): Promise<HomePage> {
  return merge(fallback.homePage, await sanityFetch<Partial<HomePage>>(homeQuery));
}

export async function getAboutPage(): Promise<AboutPage> {
  return merge(fallback.aboutPage, await sanityFetch<Partial<AboutPage>>(aboutQuery));
}

export async function getMembershipPage(): Promise<MembershipPage> {
  return merge(fallback.membershipPage, await sanityFetch<Partial<MembershipPage>>(membershipQuery));
}

export async function getPrivacyPage(): Promise<PrivacyPage | null> {
  return sanityFetch<PrivacyPage>(privacyQuery);
}

export async function getUpcomingEvents(limit = 50): Promise<EventItem[]> {
  const data = await sanityFetch<EventItem[]>(upcomingEventsQuery, { limit });
  return data ?? fallback.events.slice(0, limit);
}

export async function getPosts(limit = 50): Promise<PostSummary[]> {
  const data = await sanityFetch<PostSummary[]>(postsQuery, { limit });
  return data ?? fallback.posts.slice(0, limit);
}

export async function getPost(slug: string): Promise<Post | null> {
  const data = await sanityFetch<Post>(postQuery, { slug });
  if (data) return data;
  const example = fallback.posts.find((p) => p.slug === slug);
  return example ? { ...example, body: null } : null;
}

export async function getPostSlugs(): Promise<string[]> {
  const data = await sanityFetch<string[]>(postSlugsQuery);
  return data ?? fallback.posts.map((p) => p.slug);
}

export async function getBoardMembers(): Promise<BoardMember[]> {
  const data = await sanityFetch<BoardMember[]>(boardQuery);
  return data ?? fallback.boardMembers;
}

export async function getDocuments(): Promise<OfficialDocument[]> {
  const data = await sanityFetch<OfficialDocument[]>(documentsQuery);
  return data ?? fallback.documents;
}
