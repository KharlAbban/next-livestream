import { ToggleCard } from "@/components/custom";
import { getStreamByUserId } from "@/lib/utils";

export default async function CreatorChatPage() {
  const streamInfo = await getStreamByUserId();

  if (!streamInfo) return <div>No stream available</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Chat Settings</h1>
      <div className="w-full space-y-4">
        <ToggleCard
          streamId={streamInfo._id}
          field="chatEnabled"
          label="Enable Livestream chat"
          value={streamInfo.chatEnabled}
        />

        {streamInfo.chatEnabled && (
          <>
            <ToggleCard
              streamId={streamInfo._id}
              field="chatDelayed"
              label="Delay Livestream Chat"
              value={streamInfo.chatDelayed}
            />
            <ToggleCard
              streamId={streamInfo._id}
              field="chatFollowersOnly"
              label="Only followers Can Chat"
              value={streamInfo.chatFollowersOnly}
            />
          </>
        )}
      </div>
    </div>
  );
}
