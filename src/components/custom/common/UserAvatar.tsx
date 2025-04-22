import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import LiveBadge from "./LiveBadge";

export const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string | undefined;
  imgUrl: string | undefined;
  isLive?: boolean;
  showBadge?: boolean;
}

export default function UserAvatar({
  imgUrl,
  showBadge,
  username,
  isLive,
  size,
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-red-500 border border-background",
          avatarSizes({ size }),
        )}
      >
        <AvatarImage src={imgUrl} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>

      {canShowBadge && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}
