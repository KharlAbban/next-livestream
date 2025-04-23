import { Fullscreen } from "lucide-react";
import { defineField, defineType } from "sanity";

export const stream_schema = defineType({
  name: "stream",
  title: "Stream",
  type: "document",
  icon: Fullscreen,
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "reference",
      to: [{ type: "user" }],
      description: "User who created the stream",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Stream Name",
      type: "string",
      description: "Name of the live stream",
    }),
    defineField({
      name: "thumbnailUrl",
      title: "Thumbnail Url",
      type: "string",
      description: "Livestream thumbnail image",
    }),
    defineField({
      name: "ingressId",
      title: "Ingress ID for streaming",
      type: "string",
      description: "Livestream ingress id",
    }),
    defineField({
      name: "serverUrl",
      title: "Ingress / Livestream Server url",
      type: "url",
      description: "Livestream server url",
    }),
    defineField({
      name: "streamKey",
      title: "Stream Key",
      type: "string",
      description: "Key for the stream",
    }),
    defineField({
      name: "isLive",
      title: "Stream is Live",
      type: "boolean",
      initialValue: false,
      description: "Is the stream live?",
    }),
    defineField({
      name: "chatEnabled",
      title: "Enable Livestream chat",
      type: "boolean",
      initialValue: true,
      description: "Enable participant chat for the stream",
    }),
    defineField({
      name: "chatDelayed",
      title: "Delay Stream Chat",
      type: "boolean",
      initialValue: true,
      description: "Delay chat for the stream",
    }),
    defineField({
      name: "chatFollowersOnly",
      title: "Followers-Only chat",
      type: "boolean",
      initialValue: true,
      description: "Only followers can chat",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "isLive",
    },
  },
});
