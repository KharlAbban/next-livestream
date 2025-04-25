import { sanityClient } from "@/sanity/lib/client";
import {
  SANITY_GET_STREAM_BY_USER_ID_QUERY,
  SANITY_GET_USER_BY_CLERK_ID,
} from "@/sanity/lib/queries";
import { sanityWriteClient } from "@/sanity/lib/write_client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (!evt) {
      return new Response("Invalid webhook", { status: 400 });
    }

    const existingUser = await sanityClient.fetch(SANITY_GET_USER_BY_CLERK_ID, {
      clerkId: evt.data.id,
    });

    if (evt.type === "user.created" && !existingUser) {
      console.log("Event type:", evt.type);
      const newUser = await sanityWriteClient.create({
        _type: "user",
        clerkId: evt.data.id,
        username: evt.data.username,
        email: evt.data.email_addresses[0].email_address,
        profileImage: evt.data.image_url,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
      });

      const newUserStream = await sanityWriteClient.create({
        _type: "stream",
        userId: {
          _type: "reference",
          _ref: newUser._id,
        },
        name: `${evt.data.username}'s stream`,
        chatEnabled: true,
        chatDelayed: false,
        chatFollowersOnly: false,
        isLive: false,
      });

      await sanityWriteClient
        .patch(newUser._id)
        .set({
          streamReference: { _type: "reference", _ref: newUserStream._id },
        })
        .commit();
    } else if (evt.type === "user.updated" && existingUser) {
      await sanityWriteClient
        .patch(existingUser._id)
        .set({
          username: evt.data.username,
          email: evt.data.email_addresses[0].email_address,
          profileImage: evt.data.image_url,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
        })
        .commit();
    } else if (evt.type === "user.deleted" && existingUser) {
      const userStream = await sanityClient.fetch(
        SANITY_GET_STREAM_BY_USER_ID_QUERY,
        {
          userId: existingUser._id,
        },
      );

      if (userStream) {
        await sanityWriteClient.delete(userStream._id);
      }
      await sanityWriteClient.delete(existingUser._id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
