"use client";

import { Button } from "@/components/ui/button";
import { blockUser, unblockUser } from "@/lib/server_actions";
import { useTransition } from "react";
import { toast } from "sonner";

export default function BlockUserButton({
  id,
  isBlocked,
}: {
  id: string;
  isBlocked: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const blockUserAction = () => {
    // TODO: Disconnect from livesteam
    // TODO: Kick out guest from room
    startTransition(async () => {
      try {
        const newBlocking = await blockUser(id);

        if (newBlocking.success) {
          toast.success("You have blocked this user!", {
            duration: 5000,
            icon: "▶️",
          });
        } else {
          alert(newBlocking.error);
        }
      } catch (error: any) {
        alert(error.message);
        console.error("Error blocking user:", error.message);
      }
    });
  };

  const unblockUserAction = () => {
    startTransition(async () => {
      try {
        const unblocked = await unblockUser(id);

        if (unblocked.success) {
          toast.success("You have unblocked this user!", {
            duration: 5000,
            icon: "▶️",
          });
        } else {
          alert(unblocked.error);
        }
      } catch (error: any) {
        alert(error.message);
        console.error("Error unblocking user:", error.message);
      }
    });
  };

  return (
    <Button
      variant={isBlocked ? "outline" : "destructive"}
      disabled={isPending}
      onClick={isBlocked ? unblockUserAction : blockUserAction}
    >
      {isBlocked ? "Unblock user" : "Block user"}
    </Button>
  );
}
