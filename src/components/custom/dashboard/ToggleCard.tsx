"use client";

import { Switch } from "@/components/ui/switch";
import { updateStreamChatSetting } from "@/lib/server_actions";
import { useTransition } from "react";
import { toast } from "sonner";

interface ToggleCardProps {
  field: "chatEnabled" | "chatDelayed" | "chatFollowersOnly";
  label: string;
  value: boolean | undefined;
  streamId: string;
}

export default function ToggleCard({
  streamId,
  field,
  label,
  value,
}: ToggleCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleStreamSettingChange = (value: boolean) => {
    startTransition(async () => {
      const updateStream = await updateStreamChatSetting(
        streamId,
        field,
        value,
      );

      if (updateStream.error) {
        toast.error("Error updating stream settings!", {
          description: updateStream.error,
          duration: 3000,
          icon: "⚠️",
        });
      } else {
        toast.success("Updated stream chat settings", {
          description: updateStream.error,
          duration: 3000,
          icon: "✅",
        });
      }
    });
  };
  return (
    <div className="w-full rounded-xl bg-gray-400 p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <Switch
          disabled={isPending}
          checked={value}
          onCheckedChange={(value) => handleStreamSettingChange(value)}
        />
      </div>
    </div>
  );
}
