import { Loader } from "lucide-react";

interface StreamLoadingProps {
  username: string | undefined;
}

export default function StreamLoading({ username }: StreamLoadingProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Loader className="h-10 w-10 animate-spin" />
      <p className="capitalize">{username}'s stream is loading</p>
    </div>
  );
}
