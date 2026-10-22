import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Over ons",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", title: "Introductie", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Brede foto", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt-tekst", type: "string" })] }),
    defineField({ name: "mission", title: "Missie", type: "text", rows: 2 }),
    defineField({ name: "vision", title: "Visie", type: "text", rows: 2 }),
    defineField({ name: "values", title: "Kernwaarden", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "timeline",
      title: "Geschiedenis",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "milestone",
          fields: [
            defineField({ name: "year", title: "Jaar (of 'Nu')", type: "string" }),
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "text", title: "Omschrijving", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "year" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Over ons" }) },
});
