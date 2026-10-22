import { defineField, defineType } from "sanity";

export const EVENT_CATEGORIES = [
  { title: "Vergadering", value: "vergadering" },
  { title: "Workshop", value: "workshop" },
  { title: "Sociaal", value: "sociaal" },
];

export const event = defineType({
  name: "event",
  title: "Activiteit",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Soort", type: "string", options: { list: EVENT_CATEGORIES, layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "start", title: "Begint op", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "end", title: "Eindigt op", type: "datetime" }),
    defineField({ name: "location", title: "Locatie", type: "string" }),
    defineField({ name: "description", title: "Korte omschrijving", type: "text", rows: 3 }),
    defineField({ name: "registrationUrl", title: "Aanmeldlink", description: "Leeg laten om naar het contactformulier te verwijzen.", type: "url" }),
  ],
  orderings: [{ title: "Datum", name: "startAsc", by: [{ field: "start", direction: "asc" }] }],
  preview: {
    select: { title: "title", start: "start", category: "category" },
    prepare: ({ title, start, category }) => ({
      title,
      subtitle: [start ? new Date(start).toLocaleString("nl-NL", { dateStyle: "medium", timeStyle: "short" }) : null, category].filter(Boolean).join(" · "),
    }),
  },
});
