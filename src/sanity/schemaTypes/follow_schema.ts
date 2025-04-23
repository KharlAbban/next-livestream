import { LayoutDashboard } from "lucide-react";
import { defineField, defineType } from "sanity";

export const follow_schema = defineType({
  name: "follow",
  title: "Followings",
  type: "document",
  icon: LayoutDashboard,
  fields: [
    defineField({
      name: "followerId",
      title: "Clerk ID",
      description: "Unique user identifier for the user following another user",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "followingId",
      title: "Clerk ID",
      description: "Unique user identifier for the user being followed",
      type: "reference",
      to: [{ type: "user" }],
    }),
  ],
});
