"use client";

import { SANITY_GET_MY_FOLLOWINGS_QUERYResult, SANITY_GET_RECOMMENDED_USERS_QUERYResult } from "@/sanity/types";
import { useSidebarStore } from "@/store/use_sidebar_store";
import UserItem from "./UserItem";

interface UsersFollowedProps {
  usersFollowed: SANITY_GET_MY_FOLLOWINGS_QUERYResult;
}

export default function UsersFollowed({ usersFollowed }: UsersFollowedProps) {
  const { collapsed } = useSidebarStore((state) => state);

  if (usersFollowed.length === 0) return null;

  return (
    <>
      {!collapsed && (
        <div className="px-2 mb-2">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">
            Following
          </h2>
        </div>
      )}

      <ul className="px-2 space-y-2">
        {usersFollowed.map((user) => (
          <UserItem user={user.followingId as SANITY_GET_RECOMMENDED_USERS_QUERYResult[number]} key={user.followingId?._id} />
        ))}
      </ul>
    </>
  );
}
