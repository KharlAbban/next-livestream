import { WifiOff } from "lucide-react";

interface StreamOfflineProps {
  username: string | undefined;
}

export default function StreamOffline({ username }: StreamOfflineProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <WifiOff className="h-10 w-10" />
      <p className="capitalize">{username} is offline</p>
    </div>
  );
}
