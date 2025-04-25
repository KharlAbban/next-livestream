"use server";

import {
  RoomServiceClient,
  IngressInput,
  CreateIngressOptions,
  IngressClient,
  AccessToken,
} from "livekit-server-sdk";
import { getStreamByUserId, isBlockedByUser } from "./utils";
import { revalidatePath } from "next/cache";
import { RELATIVE_PATHS } from "./constants";
import { sanityWriteClient } from "@/sanity/lib/write_client";
import { v4 as uuidv4 } from "uuid";
import { getLoggedInUser } from "./server_actions";
import { sanityClient } from "@/sanity/lib/client";
import { SANITY_GET_USER_BY_ID } from "@/sanity/lib/queries";

const roomService = new RoomServiceClient(
  String(process.env.NEXT_LIVEKIT_HTTPS_URL),
  String(process.env.NEXT_LIVEKIT_API_KEY),
  String(process.env.NEXT_LIVEKIT_API_SECRET),
);

const ingressclient = new IngressClient(
  String(process.env.NEXT_LIVEKIT_HTTPS_URL),
  String(process.env.NEXT_LIVEKIT_API_KEY),
  String(process.env.NEXT_LIVEKIT_API_SECRET),
);

export async function resetIngress(hostIdentity: string) {
  try {
    const allIngresses = await ingressclient.listIngress({
      roomName: hostIdentity,
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    for (const room of rooms) {
      await roomService.deleteRoom(room.name);
    }

    for (const ingress of allIngresses) {
      if (ingress.ingressId) {
        await ingressclient.deleteIngress(ingress.ingressId);
      }
    }
  } catch (error: any) {
    console.error("Error resetting ingress:", error.message);
    throw new Error("Failed to reset ingress");
  }
}

export async function createIngress(ingressType: IngressInput) {
  try {
    const currentStream = await getStreamByUserId();

    if (!currentStream?.userId) throw new Error("User not found");

    // Reset previous ingress if exists
    await resetIngress(currentStream.userId._id);

    const options: CreateIngressOptions = {
      name: currentStream?.userId.username,
      roomName: currentStream?.userId._id,
      participantName: currentStream?.userId.username,
      participantIdentity: currentStream?.userId._id,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
      options.enableTranscoding = true;
    }
    // else {
    //     options.video = {
    //         source: TrackSource.CAMERA,
    //         encodingOptions: {
    //             case: "preset",
    //             value: 1
    //         }
    //     };
    //     options.audio = {
    //         source: TrackSource.MICROPHONE,
    //         preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    //     }
    // }

    const ingress = await ingressclient.createIngress(ingressType, options);

    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error("Failed to create ingress");
    }

    await sanityWriteClient
      .patch(currentStream._id)
      .set({
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      })
      .commit();

    revalidatePath(RELATIVE_PATHS.creatorPage);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error creating ingress:", error.message);
    return {
      error: error.message,
    };
  }
}

export async function createViewerToken(hostIdentity: string) {
  try {
    const currentUser = await getLoggedInUser();
    const guestProfile = {
      id: uuidv4(),
      username: `guest#${Math.floor(Math.random() * 10000)}`,
    };
    const streamHost = await sanityClient.fetch(SANITY_GET_USER_BY_ID, {
      userId: hostIdentity,
    });

    if (!streamHost) throw new Error("Stream host not found");

    const isBlockedByHost = await isBlockedByUser(hostIdentity);

    if (isBlockedByHost) throw new Error("You have been blocked by the host");

    const isHost = currentUser?._id === streamHost._id;
    const viewerIdentity = currentUser
      ? isHost
        ? `host-${currentUser._id}`
        : currentUser._id
      : guestProfile.id;
    const viewerName = currentUser
      ? currentUser.username
      : guestProfile.username;

    const newViewerToken = new AccessToken(
      String(process.env.NEXT_LIVEKIT_API_KEY),
      String(process.env.NEXT_LIVEKIT_API_SECRET),
      {
        identity: String(viewerIdentity) || "",
        name: viewerName,
      },
    );

    newViewerToken.addGrant({
      room: streamHost._id,
      roomJoin: true,
      canPublish: false,
      canPublishData: true,
    });

    return await Promise.resolve(newViewerToken.toJwt());
  } catch (error: any) {
    console.error("Error creating token for viewer:", error);
    return "";
  }
}
