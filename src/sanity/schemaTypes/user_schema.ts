import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const user_schema = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "clerkId",
      title: "Clerk ID",
      type: "string",
      description: "Unique Clerk_ID identifier for the user",
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      description: "User's alias",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "User's email address",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "url",
      description: "Link to Clerk hosted asset for user profile image",
    }),
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      description: "User's firstname",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      description: "User's lastname",
    }),
    defineField({
      name: "streamReference",
      title: "Stream Reference",
      type: "reference",
      to: [{ type: "stream" }],
      description: "Reference to the stream document",
    }),
  ],
  preview: {
    select: {
      title: "username",
      subtitle: "email",
    },
  },
});
