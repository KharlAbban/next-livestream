"use client";

import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { FullScreenControl, VolumeControls } from "./LivestreamControls";
import { useEventListener } from "usehooks-ts";

interface StreamIsLiveProps {
  participant: Participant;
}

export default function StreamIsLive({ participant }: StreamIsLiveProps) {
  const streamVideoRef = useRef<HTMLVideoElement | null>(null);
  const streamVideoWrapperRef = useRef<HTMLDivElement | null>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (streamVideoWrapperRef.current) {
      streamVideoWrapperRef.current.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  useEventListener("fullscreenchange" as any, () => {
    const isCurrFullscreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrFullscreen);
  });

  const onVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (streamVideoRef.current) {
      streamVideoRef.current.muted = newVolume === 0;
      streamVideoRef.current.volume = +newVolume * 0.01;
    }
  };
  const toggleMuted = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);

    if (streamVideoRef.current) {
      streamVideoRef.current.muted = !isMuted;
      streamVideoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (streamVideoRef.current) {
        track.publication.track?.attach(streamVideoRef.current);
      }
    });

  return (
    <div ref={streamVideoWrapperRef} className="relative h-full flex">
      <video ref={streamVideoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-10 w-full items-center justify-between bg-neutral-900 px-4">
          <VolumeControls
            onChange={onVolumeChange}
            onToggle={toggleMuted}
            value={volume}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
}
