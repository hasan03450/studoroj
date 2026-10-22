import { defineArrayMember, defineField, defineType } from "sanity";

export const membershipPage = defineType({
  name: "membershipPage",
  title: "Lid worden",
  type: "document",
  fields: [
    defineField({ name: "intro", title: "Introductie", type: "text", rows: 2 }),
    defineField({ name: "benefits", title: "Voordelen", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "faqs",
      title: "Veelgestelde vragen",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({ name: "question", title: "Vraag", type: "string" }),
            defineField({ name: "answer", title: "Antwoord", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Lid worden" }) },
});
