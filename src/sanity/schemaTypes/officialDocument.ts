import { defineField, defineType } from "sanity";

export const officialDocument = defineType({
  name: "officialDocument",
  title: "Document",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "file", title: "Bestand (PDF)", type: "file", options: { accept: "application/pdf" }, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Volgorde", type: "number" }),
  ],
  orderings: [{ title: "Volgorde", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
