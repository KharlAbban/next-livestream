"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import {
  SANITY_GET_STREAM_BY_ID_QUERYResult,
  SANITY_GET_STREAM_BY_USER_ID_QUERYResult,
  User,
} from "@/sanity/types";
import { LiveKitRoom } from "@livekit/components-react";
import LivestreamVideo from "./LivestreamVideo";

interface StreamPlayerProps {
  user: User; //the stream host, gotten by username or the logged in user
  stream:
    | SANITY_GET_STREAM_BY_ID_QUERYResult
    | SANITY_GET_STREAM_BY_USER_ID_QUERYResult;
  isFollowing: boolean;
}

export default function StreamPlayer({
  isFollowing,
  stream,
  user,
}: StreamPlayerProps) {
  const { identity, name, token } = useViewerToken(user._id);

  if (!token || !name || !identity) {
    return <div>Cannot watch this stream</div>;
  }

  return (
    <div>
      <LiveKitRoom
        token={token}
        serverUrl={String(process.env.NEXT_PUBLIC_LIVEKIT_WS_URL)}
        connect={stream?.isLive}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div
          id="videoContainer"
          className="space-y-4 col-span-1 lg:col-span-2 2xl:col-span-4 lg:overflow-y-auto no-scrollbar pb-8"
        >
          <LivestreamVideo hostName={user.username} hostIdentity={user._id} />
        </div>

        {isFollowing && <p>Following</p>}
      </LiveKitRoom>
    </div>
  );
}
