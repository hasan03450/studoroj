import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepagina",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroText", title: "Introductie", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hoofdfoto", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt-tekst", type: "string" })] }),
    defineField({
      name: "features",
      title: "Drie pijlers",
      description: "Gemeenschap, activiteiten en steun (in deze volgorde, iconen staan vast).",
      type: "array",
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "text", title: "Tekst", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({ name: "aboutTitle", title: "Over ons – titel", type: "string" }),
    defineField({ name: "aboutText", title: "Over ons – tekst", type: "text", rows: 4 }),
    defineField({ name: "aboutImage", title: "Over ons – foto", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt-tekst", type: "string" })] }),
    defineField({ name: "ctaTitle", title: "Oproep lid worden – titel", type: "string" }),
    defineField({ name: "ctaText", title: "Oproep lid worden – tekst", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Homepagina" }) },
});
