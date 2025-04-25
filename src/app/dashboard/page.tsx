import { StreamPlayer } from "@/components/custom";
import { getLoggedInUser } from "@/lib/server_actions";
import { getStreamByUserId } from "@/lib/utils";

export default async function CreatorPage() {
  const currentUser = await getLoggedInUser();
  const streamInfo = await getStreamByUserId();

  if (!currentUser || !streamInfo) {
    return (
      <div className="p-4">You need to be logged in to view this page</div>
    );
  }

  return (
    <div className="p-2 w-full">
      <StreamPlayer user={currentUser} stream={streamInfo} isFollowing={true} />
    </div>
  );
}
