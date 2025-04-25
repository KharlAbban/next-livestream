import { sanityClient } from "@/sanity/lib/client";
import { SANITY_GET_STREAM_BY_INGRESS_ID_QUERY } from "@/sanity/lib/queries";
import { WebhookReceiver } from "livekit-server-sdk";
import { NextRequest } from "next/server";

const LK_API_KEY = String(process.env.NEXT_LIVEKIT_API_KEY);
const LK_API_SECRET = String(process.env.NEXT_LIVEKIT_API_SECRET);
const lkWhReceiver = new WebhookReceiver(LK_API_KEY, LK_API_SECRET);

export async function POST(req: NextRequest) {
  try {
    const lkAuthHeader = req.headers.get("authorization");
    const lkWhBody = await req.text();

    if (!lkAuthHeader) {
      console.log("Missing Authorization header");
      return new Response("Missing Authorization header", { status: 401 });
    }

    const livekitWebhookEvent = await lkWhReceiver.receive(
      lkWhBody,
      lkAuthHeader,
    );

    console.log(livekitWebhookEvent);

    if (!livekitWebhookEvent) {
      console.log("Invalid webhook event");
      return new Response("Invalid webhook event", { status: 400 });
    }

    const relatedStream = await sanityClient.fetch(
      SANITY_GET_STREAM_BY_INGRESS_ID_QUERY,
      {
        ingressId: livekitWebhookEvent.ingressInfo?.ingressId,
      },
    );

    if (!relatedStream) {
      console.log(
        "No related stream found for ingress ID:",
        livekitWebhookEvent.ingressInfo?.ingressId,
      );
      return new Response("No related stream found", { status: 404 });
    }

    if (livekitWebhookEvent.event === "ingress_started") {
      await sanityClient
        .patch(relatedStream._id)
        .set({ isLive: true })
        .commit();
      console.log("Stream started:", relatedStream._id);
    } else if (livekitWebhookEvent.event === "ingress_ended") {
      await sanityClient
        .patch(relatedStream._id)
        .set({ isLive: false })
        .commit();
      console.log("Stream ended:", relatedStream._id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err: any) {
    console.error("Error verifying webhook:", err.message);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
