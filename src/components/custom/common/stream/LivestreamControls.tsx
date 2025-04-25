"use client";

import { Slider } from "@/components/ui/slider";
import { Maximize, Minimize, Volume1, Volume2, VolumeX } from "lucide-react";

interface FullScreenControlProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

export function FullScreenControl({
  isFullScreen,
  onToggle,
}: FullScreenControlProps) {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        title={label}
        onClick={onToggle}
        className="text-white p-1.5 hover:bg-white/20 rounded-lg"
      >
        <Icon className="h-5 w-5" />
      </button>
    </div>
  );
}

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export function VolumeControls({
  onChange,
  onToggle,
  value,
}: VolumeControlProps) {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const handleVolumeChange = (value: number[]) => {
    onChange(value[0]);
  };

  const label = isMuted ? "Unmute" : "Mute";

  return (
    <div className="flex items-center gap-2">
      <button
        title={label}
        onClick={onToggle}
        className="text-white p-1.5 hover:bg-white/20 rounded-lg"
      >
        <Icon className="h-5 w-5" />
      </button>
      <Slider
        onValueChange={handleVolumeChange}
        className="w-[8rem] cursor-pointer"
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
}
