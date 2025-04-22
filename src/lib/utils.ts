import { sanityClient } from "@/sanity/lib/client";
import {
  SANITY_GET_EXISTING_BLOCKING_QUERY,
  SANITY_GET_EXISTING_FOLLOWING_QUERY,
  SANITY_GET_MY_FOLLOWINGS_QUERY,
  SANITY_GET_RECOMMENDED_USERS_QUERY,
  SANITY_GET_USER_BY_ID,
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

    const allUsers = await sanityClient.fetch(
      SANITY_GET_RECOMMENDED_USERS_QUERY,
      { clerkId: currentUser?.clerkId || "" },
    );

    return allUsers;
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

    return usersFollowing;
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
