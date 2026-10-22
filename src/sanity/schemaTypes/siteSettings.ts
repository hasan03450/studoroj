import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-instellingen",
  type: "document",
  groups: [
    { name: "general", title: "Algemeen", default: true },
    { name: "contact", title: "Contactgegevens" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Naam vereniging", type: "string", group: "general", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Slogan (footer)", type: "string", group: "general" }),
    defineField({ name: "foundedYear", title: "Opgericht in (jaar)", type: "number", group: "general" }),
    defineField({ name: "city", title: "Plaats", type: "string", group: "general" }),
    defineField({ name: "email", title: "E-mailadres", type: "string", group: "contact", validation: (r) => r.email() }),
    defineField({ name: "phone", title: "Telefoonnummer", type: "string", group: "contact" }),
    defineField({ name: "street", title: "Straat en huisnummer", type: "string", group: "contact" }),
    defineField({ name: "postcode", title: "Postcode", type: "string", group: "contact" }),
    defineField({ name: "kvk", title: "KvK-nummer", type: "string", group: "contact" }),
    defineField({ name: "responseDays", title: "Reactietijd (werkdagen)", type: "number", group: "contact" }),
    defineField({ name: "mapImage", title: "Kaartafbeelding", description: "Optioneel: afbeelding van de locatie op de kaart.", type: "image", group: "contact" }),
    defineField({ name: "seoDescription", title: "Standaard omschrijving voor zoekmachines", type: "text", rows: 3, group: "seo", validation: (r) => r.max(160) }),
    defineField({ name: "ogImage", title: "Deelafbeelding (social media)", description: "1200 × 630 px", type: "image", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Website-instellingen" }) },
});
