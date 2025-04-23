import { defineQuery } from "next-sanity";

// User Queries
export const SANITY_GET_USER_BY_CLERK_ID = defineQuery(
  `*[_type == "user" && clerkId == $clerkId][0]`,
);

export const SANITY_GET_USER_BY_ID = defineQuery(
  `*[_type == "user" && _id == $userId][0]`,
);

export const SANITY_GET_USER_BY_USERNAME = defineQuery(
  `*[_type == "user" && username == $username][0]`,
);

export const SANITY_GET_RECOMMENDED_USERS_QUERY = defineQuery(
  `*[_type == "user" && clerkId != $clerkId] | order(_createdAt desc) {
    ...
  }`,
);

// Following Queries
export const SANITY_GET_EXISTING_FOLLOWING_QUERY = defineQuery(
  `*[_type == "follow" && followerId._ref == $followerId && followingId._ref == $followingId][0]`,
);

export const SANITY_GET_MY_FOLLOWINGS_QUERY = defineQuery(
  `*[_type == "follow" && followerId._ref == $followerId] {
    ...,
    followingId -> {
      ...
    }
  }`,
);

// Blocking Queries
export const SANITY_GET_EXISTING_BLOCKING_QUERY = defineQuery(
  `*[_type == "blocking" && blockerId._ref == $blockerId && blockedId._ref == $blockedId][0]`,
);
export const SANITY_GET_USERS_WHO_BLOCKED_ME_QUERY = defineQuery(
  `*[_type == "blocking" && blockedId._ref == $blockedId] {
      blockerId
    }`,
);

// Stream Queries
export const SANITY_GET_STREAM_BY_USER_ID_QUERY = defineQuery(
  `*[_type == "stream" && userId._ref == $userId][0] {
    ...
  }`,
);
export const SANITY_GET_STREAM_BY_ID_QUERY = defineQuery(
  `*[_type == "stream" && _id == $streamId][0] {
    ...
  }`,
);
