import { Blocks } from "lucide-react";
import { defineField, defineType } from "sanity";

export const block_schema = defineType({
  name: "blocking",
  title: "Blockings",
  type: "document",
  icon: Blocks,
  fields: [
    defineField({
      name: "blockerId",
      title: "Blocker ID",
      description: "Unique user identifier for the user blocking another user",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "blockedId",
      title: "Blocked ID",
      description:
        "Unique user identifier for the user blocked by another user",
      type: "reference",
      to: [{ type: "user" }],
    }),
  ],
});
