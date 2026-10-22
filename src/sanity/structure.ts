import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([
      singleton(S, "siteSettings", "Website-instellingen"),
      S.divider(),
      singleton(S, "homePage", "Homepagina"),
      singleton(S, "aboutPage", "Over ons"),
      singleton(S, "membershipPage", "Lid worden"),
      singleton(S, "privacyPage", "Privacyverklaring"),
      S.divider(),
      S.documentTypeListItem("event").title("Activiteiten"),
      S.documentTypeListItem("post").title("Nieuws"),
      S.documentTypeListItem("boardMember").title("Bestuur"),
      S.documentTypeListItem("officialDocument").title("Documenten"),
    ]);
