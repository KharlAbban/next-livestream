import { ConnectModal, KeyCard, UrlCard } from "@/components/custom";
import { getStreamByUserId } from "@/lib/utils";

export default async function CreatorKeysPage() {
  const streamInfo = await getStreamByUserId();

  if (!streamInfo) return <div>No stream available</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Keys Settings</h1>
        <ConnectModal />
      </div>
      <div className="w-full space-y-4">
        <UrlCard value={streamInfo.serverUrl} />
        <KeyCard value={streamInfo.streamKey} />
      </div>
    </div>
  );
}
