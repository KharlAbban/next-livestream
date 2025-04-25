import { sanityClient } from "@/sanity/lib/client";
import {
  SANITY_GET_EXISTING_BLOCKING_QUERY,
  SANITY_GET_EXISTING_FOLLOWING_QUERY,
  SANITY_GET_MY_FOLLOWINGS_QUERY,
  SANITY_GET_RECOMMENDED_USERS_QUERY,
  SANITY_GET_STREAM_BY_USER_ID_QUERY,
  SANITY_GET_USER_BY_ID,
  SANITY_GET_USER_BY_USERNAME,
  SANITY_GET_USERS_WHO_BLOCKED_ME_QUERY,
} from "@/sanity/lib/queries";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getLoggedInUser } from "./server_actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getRecommendedUsers() {
  try {
    const currentUser = await getLoggedInUser();

    // Fetch all users excluding the current user
    const allUsers = await sanityClient.fetch(
      SANITY_GET_RECOMMENDED_USERS_QUERY,
      { clerkId: currentUser?.clerkId || "" },
    );

    const usersWhoBlockedMe = await sanityClient.fetch(
      SANITY_GET_USERS_WHO_BLOCKED_ME_QUERY,
      {
        blockedId: currentUser?._id || "",
      },
    );

    if (!usersWhoBlockedMe || usersWhoBlockedMe.length < 1) return allUsers;

    // Filter out users who have blocked the current user
    const filteredUsers = allUsers.filter((recUser) => {
      const blockedByThisUser = usersWhoBlockedMe.some(
        (user) => user.blockerId?._ref === recUser._id,
      );
      return !blockedByThisUser;
    });

    console.log("Filtered users:", filteredUsers);

    return filteredUsers;
  } catch (error: any) {
    console.error("Error fetching recommended users:", error);
    return [];
  }
}

export async function isFollowingUser(userFollowedId: string) {
  try {
    const currentUser = await getLoggedInUser();
    const otherUser = await sanityClient.fetch(SANITY_GET_USER_BY_ID, {
      userId: userFollowedId,
    });

    if (!currentUser || !otherUser) return false;

    if (otherUser._id === currentUser._id) return true;

    const existingFollowing = await sanityClient.fetch(
      SANITY_GET_EXISTING_FOLLOWING_QUERY,
      {
        followerId: currentUser._id,
        followingId: userFollowedId,
      },
    );

    return !!existingFollowing;
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
}

export async function getFollowedUsers() {
  try {
    const currentUser = await getLoggedInUser();

    if (!currentUser) throw Error("User not found");

    const usersFollowing = await sanityClient.fetch(
      SANITY_GET_MY_FOLLOWINGS_QUERY,
      {
        followerId: currentUser._id,
      },
    );

    const usersWhoBlockedMe = await sanityClient.fetch(
      SANITY_GET_USERS_WHO_BLOCKED_ME_QUERY,
      {
        blockedId: currentUser?._id || "",
      },
    );

    if (!usersWhoBlockedMe || usersWhoBlockedMe.length < 1)
      return usersFollowing;

    // Filter out users who have blocked the current user
    const filteredUsers = usersFollowing.filter((userFollowing) => {
      const blockedByThisUser = usersWhoBlockedMe.some(
        (user) => user.blockerId?._ref === userFollowing._id,
      );
      return blockedByThisUser;
    });

    return filteredUsers;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
}

export async function isBlockedByUser(userBlockedById: string) {
  try {
    const currentUser = await getLoggedInUser();
    const otherUser = await sanityClient.fetch(SANITY_GET_USER_BY_ID, {
      userId: userBlockedById,
    });

    if (!currentUser || !otherUser) return false;

    if (otherUser._id === currentUser._id) return false;

    const existingBlock = await sanityClient.fetch(
      SANITY_GET_EXISTING_BLOCKING_QUERY,
      {
        blockerId: userBlockedById,
        blockedId: currentUser._id,
      },
    );

    return !!existingBlock;
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
}

export async function hasBlockedUser(userBlockedId: string) {
  try {
    const currentUser = await getLoggedInUser();
    const otherUser = await sanityClient.fetch(SANITY_GET_USER_BY_ID, {
      userId: userBlockedId,
    });

    if (!currentUser || !otherUser) return false;

    if (otherUser._id === currentUser._id) return false;

    const existingBlock = await sanityClient.fetch(
      SANITY_GET_EXISTING_BLOCKING_QUERY,
      {
        blockedId: userBlockedId,
        blockerId: currentUser._id,
      },
    );

    return !!existingBlock;
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
}

export async function getStreamByUserId() {
  try {
    const currentUser = await getLoggedInUser();

    if (!currentUser) throw Error("User not found");

    const stream = await sanityClient.fetch(
      SANITY_GET_STREAM_BY_USER_ID_QUERY,
      {
        userId: currentUser._id,
      },
    );

    if (!stream) throw Error("Stream not found");

    return stream;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function getStreamByUsername(username: string) {
  try {
    const existingUser = await sanityClient.fetch(SANITY_GET_USER_BY_USERNAME, {
      username: username,
    });

    if (!existingUser) throw Error("User not found");

    const userStream = await sanityClient.fetch(
      SANITY_GET_STREAM_BY_USER_ID_QUERY,
      {
        userId: existingUser._id,
      },
    );

    if (!userStream) throw Error("Stream not found");

    return userStream;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}
