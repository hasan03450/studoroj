import { defineArrayMember, defineField, defineType } from "sanity";

export const POST_CATEGORIES = [
  { title: "Vereniging", value: "vereniging" },
  { title: "Activiteiten", value: "activiteiten" },
  { title: "Leden", value: "leden" },
];

export const post = defineType({
  name: "post",
  title: "Nieuwsbericht",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Webadres", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Publicatiedatum", type: "datetime", initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: "category", title: "Categorie", type: "string", options: { list: POST_CATEGORIES, layout: "radio" } }),
    defineField({ name: "featured", title: "Uitgelicht op nieuwspagina", type: "boolean", initialValue: false }),
    defineField({ name: "excerpt", title: "Samenvatting", type: "text", rows: 3, validation: (r) => r.max(220) }),
    defineField({ name: "mainImage", title: "Afbeelding", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt-tekst", type: "string" })] }),
    defineField({
      name: "body",
      title: "Tekst",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt-tekst", type: "string" })] }),
      ],
    }),
  ],
  orderings: [{ title: "Nieuwste eerst", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "mainImage" } },
});
