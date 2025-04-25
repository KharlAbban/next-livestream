"use client";

import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import StreamOffline from "./StreamOffline";
import StreamLoading from "./StreamLoading";
import StreamIsLive from "./StreamIsLive";

interface LivestreamVideoProps {
  hostName: string | undefined;
  hostIdentity: string | undefined;
}

export default function LivestreamVideo({
  hostIdentity,
  hostName,
}: LivestreamVideoProps) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  console.log("Connection state: ", connectionState);
  console.log("Participant: ", participant);
  console.log("Tracks: ", tracks);

  let streamContent;

  if (
    !participant &&
    (connectionState === ConnectionState.Disconnected ||
      connectionState === ConnectionState.Connected)
  ) {
    streamContent = <StreamOffline username={hostName} />;
  } else if (!participant || tracks.length < 1) {
    streamContent = <StreamLoading username={hostName} />;
  } else {
    streamContent = <StreamIsLive participant={participant} />;
  }

  return (
    <div className="aspect-video border-b-2 group relative">
      {streamContent}
    </div>
  );
}
