"use client";

import {
  SANITY_GET_MY_FOLLOWINGS_QUERYResult,
  SANITY_GET_RECOMMENDED_USERS_QUERYResult,
} from "@/sanity/types";
import { useSidebarStore } from "@/store/use_sidebar_store";
import UserItem from "./UserItem";

interface RecUsersProps {
  recUsers: SANITY_GET_RECOMMENDED_USERS_QUERYResult;
  followedUsers: SANITY_GET_MY_FOLLOWINGS_QUERYResult;
}

export default function RecommendedUsers({
  recUsers,
  followedUsers,
}: RecUsersProps) {
  const { collapsed } = useSidebarStore();

  const showLabel = !collapsed && recUsers.length > 0;

  const filteredRecUsers = recUsers.filter((user) => {
    const isFollowed = followedUsers.some(
      (followedUser) => followedUser.followingId?._id === user._id,
    );
    return !isFollowed;
  });

  return (
    <div className="w-full px-2">
      {showLabel && (
        <h2 className="text-sm font-semibold text-gray-500 mb-2">
          Recommended Users
        </h2>
      )}

      <ul className="space-y-2">
        {filteredRecUsers.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
}
