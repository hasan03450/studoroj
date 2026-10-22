/**
 * Example content from the design, translated to Dutch.
 * Shown while Sanity is not connected or a field is still empty.
 * Text in [brackets] is a placeholder for the board to fill in.
 */
import type { AboutPage, BoardMember, EventItem, HomePage, MembershipPage, OfficialDocument, PostSummary, SiteSettings } from "./content";

export const settings: SiteSettings = {
  name: "StuduRoj",
  tagline: "Studenten van Roj",
  foundedYear: "[JAAR]",
  city: "[Plaats]",
  email: null,
  phone: "[06 00000000]",
  street: "[Straat en huisnummer]",
  postcode: "[Postcode]",
  kvk: "[00000000]",
  responseDays: "[X]",
  mapImage: null,
  seoDescription:
    "StuduRoj (Studenten van Roj) is een vereniging die studenten samenbrengt. Gratis lid worden, activiteiten, nieuws en contact.",
  ogImage: null,
};

export const homePage: HomePage = {
  heroTitle: "Een gemeenschap die samen groeit.",
  heroText:
    "[Korte omschrijving van je vereniging: wie jullie zijn, wie jullie samenbrengen en wat jullie voor je leden doen.]",
  heroImage: null,
  features: [
    {
      title: "Gemeenschap",
      text: "Een plek om gelijkgestemden te ontmoeten, kennis te delen en blijvende contacten op te bouwen.",
    },
    {
      title: "Activiteiten",
      text: "Bijeenkomsten, workshops en gezellige avonden, het hele jaar door, georganiseerd door en voor leden.",
    },
    {
      title: "Steun",
      text: "We behartigen de belangen van onze leden en bieden hulp, advies en middelen wanneer het ertoe doet.",
    },
  ],
  aboutTitle: "Door leden, voor leden.",
  aboutText:
    "[Twee of drie zinnen over de geschiedenis en missie van de vereniging: waarom ze is opgericht, waar ze voor staat en hoe leden betrokken zijn.]",
  aboutImage: null,
  ctaTitle: "Word onderdeel van StuduRoj.",
  ctaText:
    "Lidmaatschap is gratis. Doe mee aan onze activiteiten, stem mee op de algemene ledenvergadering en geef mee vorm aan de vereniging.",
};

export const aboutPage: AboutPage = {
  title: "Een vereniging gebouwd op gedeelde interesse en wederzijdse steun.",
  intro: "[Introductie: wanneer en waarom de vereniging is opgericht, en voor wie ze is.]",
  image: null,
  mission: "[Wat de vereniging elke dag voor haar leden doet.]",
  vision: "[Waar de vereniging de komende jaren wil staan.]",
  values: ["Open voor iedereen", "Gedragen door vrijwilligers", "Transparant in besluiten"],
  timeline: [
    { year: "[JAAR]", title: "Opgericht", text: "[Hoe en door wie de vereniging is opgericht.]" },
    { year: "[JAAR]", title: "[Mijlpaal]", text: "[Korte omschrijving van deze mijlpaal.]" },
    { year: "[JAAR]", title: "[Mijlpaal]", text: "[Korte omschrijving van deze mijlpaal.]" },
    { year: "Nu", title: "[Waar de vereniging nu staat]", text: "[Aantal leden, belangrijkste activiteiten, huidige focus.]" },
  ],
};

export const membershipPage: MembershipPage = {
  intro: "Lidmaatschap is helemaal gratis. Meld je aan, doe mee aan onze activiteiten en geef mee vorm aan de vereniging.",
  benefits: [
    "Toegang tot alle activiteiten",
    "Stemrecht op de algemene ledenvergadering",
    "Ledennieuwsbrief",
    "Deelnemen aan een commissie",
    "Neem een gast mee naar activiteiten",
    "Altijd opzegbaar",
  ],
  faqs: [
    {
      question: "Wanneer gaat mijn lidmaatschap in?",
      answer: "Zodra je je e-mailadres bevestigt. Je ontvangt dan een welkomstmail met alle details.",
    },
    {
      question: "Hoe zeg ik mijn lidmaatschap op?",
      answer: "Je kunt op elk moment opzeggen door ons een e-mail te sturen via de contactpagina.",
    },
    {
      question: "Kan ik meedoen aan een activiteit voordat ik lid ben?",
      answer: "[Ja / Nee, plus eventuele voorwaarden voor gasten.]",
    },
    {
      question: "Is het lidmaatschap echt gratis?",
      answer: "Ja. Er is geen contributie en je wordt nooit gevraagd te betalen om lid te zijn.",
    },
  ],
};

const exampleEvent = (id: string, e: Pick<EventItem, "title" | "category" | "description"> & { time: string }): EventItem => ({
  _id: id,
  title: e.title,
  category: e.category,
  description: e.description,
  start: null,
  end: null,
  location: null,
  registrationUrl: null,
  timePlaceholder: e.time,
});

export const events: EventItem[] = [
  exampleEvent("voorbeeld-1", {
    title: "Algemene ledenvergadering",
    category: "vergadering",
    time: "[19:30]",
    description: "Jaaroverzicht, financieel verslag en plannen voor het komende jaar. Ieder lid heeft stemrecht.",
  }),
  exampleEvent("voorbeeld-2", {
    title: "[Titel workshop]",
    category: "workshop",
    time: "[14:00]",
    description: "[Een of twee regels over wat deelnemers leren en voor wie het is.]",
  }),
  exampleEvent("voorbeeld-3", {
    title: "Ledenavond",
    category: "sociaal",
    time: "[20:00]",
    description: "Een informele avond om nieuwe en bestaande leden te ontmoeten. Drankjes zijn verzorgd.",
  }),
  exampleEvent("voorbeeld-4", {
    title: "[Titel workshop]",
    category: "workshop",
    time: "[10:00]",
    description: "[Een of twee regels over wat deelnemers leren en voor wie het is.]",
  }),
  exampleEvent("voorbeeld-5", {
    title: "Vrijwilligersdag",
    category: "sociaal",
    time: "[12:00]",
    description: "Help een dag mee en leer de mensen kennen die de vereniging draaiende houden.",
  }),
];

const examplePost = (n: number, title: string, category: PostSummary["category"], excerpt: string, featured = false): PostSummary => ({
  _id: `voorbeeld-${n}`,
  slug: `voorbeeld-${n}`,
  title,
  category,
  excerpt,
  featured,
  publishedAt: null,
  mainImage: null,
});

const summary = "[Korte samenvatting van het artikel.]";

export const posts: PostSummary[] = [
  examplePost(
    1,
    "[Kop van het belangrijkste nieuwsbericht]",
    "vereniging",
    "[Introductie van twee regels die de lezer nieuwsgierig maakt naar het volledige artikel.]",
    true,
  ),
  examplePost(2, "[Verslag van een recente activiteit]", "activiteiten", summary),
  examplePost(3, "[Mededeling van het bestuur]", "vereniging", summary),
  examplePost(4, "[Lid in de schijnwerpers]", "leden", summary),
  examplePost(5, "[Nieuwskop]", "vereniging", summary),
  examplePost(6, "[Nieuwskop]", "activiteiten", summary),
  examplePost(7, "[Nieuwskop]", "leden", summary),
];

export const boardMembers: BoardMember[] = [
  { _id: "b1", name: "[Naam]", role: "Voorzitter" },
  { _id: "b2", name: "[Naam]", role: "Secretaris" },
  { _id: "b3", name: "[Naam]", role: "Penningmeester" },
  { _id: "b4", name: "[Naam]", role: "Bestuurslid" },
];

export const documents: OfficialDocument[] = [
  { _id: "d1", title: "Statuten", url: null },
  { _id: "d2", title: "Huishoudelijk reglement", url: null },
  { _id: "d3", title: "Jaarverslag [JAAR]", url: null },
];
