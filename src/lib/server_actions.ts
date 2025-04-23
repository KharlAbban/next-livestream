"use server";

import { sanityClient } from "@/sanity/lib/client";
import {
  SANITY_GET_EXISTING_BLOCKING_QUERY,
  SANITY_GET_EXISTING_FOLLOWING_QUERY,
  SANITY_GET_STREAM_BY_ID_QUERY,
  SANITY_GET_USER_BY_CLERK_ID,
  SANITY_GET_USER_BY_ID,
} from "@/sanity/lib/queries";
import { sanityWriteClient } from "@/sanity/lib/write_client";
import { User } from "@/sanity/types";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { RELATIVE_PATHS } from "./constants";

export async function getLoggedInUser(): Promise<User | null> {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) return null;

    const existingUser = await sanityClient.fetch(SANITY_GET_USER_BY_CLERK_ID, {
      clerkId: clerkUser.id,
    });

    if (!existingUser) return null;

    return existingUser;
  } catch (error: any) {
    console.log("Current user error:", error.message);
    return null;
  }
}

export async function followUser(userToFollowId: string) {
  try {
    const currentUser = await getLoggedInUser();
    const otherUser = await sanityClient.fetch(SANITY_GET_USER_BY_ID, {
      userId: userToFollowId,
    });

    if (!currentUser || !otherUser) throw new Error("User not found");

    if (otherUser._id === currentUser._id)
      throw new Error("You cannot follow yourself");

    const existingFollowing = await sanityClient.fetch(
      SANITY_GET_EXISTING_FOLLOWING_QUERY,
      {
        followerId: currentUser._id,
        followingId: userToFollowId,
      },
    );

    if (existingFollowing)
      throw new Error("You are already following this user");

    const newFollowing = await sanityWriteClient.create({
      _type: "follow",
      followerId: {
        _type: "reference",
        _ref: currentUser._id,
      },
      followingId: {
        _type: "reference",
        _ref: userToFollowId,
      },
    });

    revalidatePath(RELATIVE_PATHS.home);

    return {
      success: true,
      newFollowing,
    };
  } catch (error: any) {
    console.error("Error following user:", error.message);
    return {
      error: error.message,
    };
  }
}

export async function unfollowUser(userToFollowId: string) {
  try {
    const currentUser = await getLoggedInUser();
    const otherUser = await sanityClient.fetch(SANITY_GET_USER_BY_ID, {
      userId: userToFollowId,
    });

    if (!currentUser || !otherUser) throw new Error("User not found");

    if (otherUser._id === currentUser._id)
      throw new Error("You cannot unfollow yourself");

    const existingFollowing = await sanityClient.fetch(
      SANITY_GET_EXISTING_FOLLOWING_QUERY,
      {
        followerId: currentUser._id,
        followingId: userToFollowId,
      },
    );

    if (!existingFollowing) throw new Error("You are not following this user!");

    await sanityWriteClient.delete(existingFollowing._id);

    revalidatePath(RELATIVE_PATHS.home);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error unfollowing user:", error.message);
    return {
      error: error.message,
    };
  }
}

export async function blockUser(userToBlockId: string) {
  try {
    const currentUser = await getLoggedInUser();
    const otherUser = await sanityClient.fetch(SANITY_GET_USER_BY_ID, {
      userId: userToBlockId,
    });

    if (!currentUser || !otherUser) throw new Error("User not found");

    if (otherUser._id === currentUser._id)
      throw new Error("You cannot block yourself");

    const existingBlock = await sanityClient.fetch(
      SANITY_GET_EXISTING_BLOCKING_QUERY,
      {
        blockerId: currentUser._id,
        blockedId: userToBlockId,
      },
    );

    if (existingBlock) throw new Error("You have already blocked this user!");

    const newBlocking = await sanityWriteClient.create({
      _type: "blocking",
      blockerId: {
        _type: "reference",
        _ref: currentUser._id,
      },
      blockedId: {
        _type: "reference",
        _ref: userToBlockId,
      },
    });

    revalidatePath(RELATIVE_PATHS.user);

    return {
      success: true,
      newBlocking,
    };
  } catch (error: any) {
    console.error("Error blocking user:", error.message);
    return {
      error: error.message,
    };
  }
}

export async function unblockUser(userToUnBlockId: string) {
  try {
    const currentUser = await getLoggedInUser();
    const otherUser = await sanityClient.fetch(SANITY_GET_USER_BY_ID, {
      userId: userToUnBlockId,
    });

    if (!currentUser || !otherUser) throw new Error("User not found");

    if (otherUser._id === currentUser._id)
      throw new Error("You cannot unblock yourself");

    const existingBlock = await sanityClient.fetch(
      SANITY_GET_EXISTING_BLOCKING_QUERY,
      {
        blockerId: currentUser._id,
        blockedId: userToUnBlockId,
      },
    );

    if (!existingBlock) throw new Error("You have not blocked this user!");

    await sanityWriteClient.delete(existingBlock._id);

    revalidatePath(RELATIVE_PATHS.user);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error unblocking user:", error.message);
    return {
      error: error.message,
    };
  }
}

export async function updateStreamChatSetting(
  streamId: string,
  field: string,
  value: boolean,
) {
  try {
    const streamExists = await sanityClient.fetch(
      SANITY_GET_STREAM_BY_ID_QUERY,
      {
        streamId: streamId,
      },
    );

    if (!streamExists) throw new Error("Stream not found");

    await sanityWriteClient
      .patch(streamId)
      .set({
        [field]: value,
      })
      .commit();

    revalidatePath(RELATIVE_PATHS.creatorPage);
    revalidatePath(RELATIVE_PATHS.user);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error updating stream chat setting:", error.message);
    return {
      error: error.message,
    };
  }
}
