import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("user").title("Users"),
      S.documentTypeListItem("follow").title("Following"),
      S.documentTypeListItem("blocking").title("Blocking"),
      S.documentTypeListItem("stream").title("Live Streams"),
    ]);
