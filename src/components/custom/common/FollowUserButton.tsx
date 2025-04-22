"use client";

import { Button } from "@/components/ui/button";
import { followUser, unfollowUser } from "@/lib/server_actions";
import { useTransition } from "react";
import { toast } from "sonner";

export default function FollowUserButton({
  id,
  isFollowing,
}: {
  id: string;
  isFollowing: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const followUserAction = () => {
    startTransition(async () => {
      try {
        const newFollowing = await followUser(id);

        if (newFollowing.success) {
          toast.success("You are now following this user", {
            duration: 5000,
            icon: "▶️",
          });
        } else {
          alert(newFollowing.error);
        }
      } catch (error: any) {
        alert(error.message);
        console.error("Error following user:", error.message);
      }
    });
  };

  const unfollowUserAction = () => {
    startTransition(async () => {
      try {
        const unfollowed = await unfollowUser(id);

        if (unfollowed.success) {
          toast.success("You are no longer following this user!", {
            duration: 5000,
            icon: "▶️",
          });
        } else {
          alert(unfollowed.error);
        }
      } catch (error: any) {
        alert(error.message);
        console.error("Error unfollowing user:", error.message);
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={isFollowing ? unfollowUserAction : followUserAction}
    >
      {isFollowing ? "Unfollow user" : "Follow user"}
    </Button>
  );
}
