import { defineArrayMember, defineField, defineType } from "sanity";

export const privacyPage = defineType({
  name: "privacyPage",
  title: "Privacyverklaring",
  type: "document",
  fields: [
    defineField({ name: "updatedAt", title: "Laatst bijgewerkt", type: "date" }),
    defineField({ name: "body", title: "Tekst", type: "array", of: [defineArrayMember({ type: "block" })] }),
  ],
  preview: { prepare: () => ({ title: "Privacyverklaring" }) },
});
