import { defineField, defineType } from "sanity";

export const boardMember = defineType({
  name: "boardMember",
  title: "Bestuurslid",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Naam", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Functie", type: "string" }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Volgorde", type: "number" }),
  ],
  orderings: [{ title: "Volgorde", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
