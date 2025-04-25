import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SANITY_GET_RECOMMENDED_USERS_QUERYResult } from "@/sanity/types";
import { useSidebarStore } from "@/store/use_sidebar_store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAvatar from "../common/UserAvatar";
import LiveBadge from "../common/LiveBadge";
import { RELATIVE_PATHS } from "@/lib/constants";

export default function UserItem({
  user,
}: {
  user: SANITY_GET_RECOMMENDED_USERS_QUERYResult[number];
}) {
  const { collapsed } = useSidebarStore();
  const pathname = usePathname();
  const href = `${RELATIVE_PATHS.user}/${user.username}`;
  const isActive = pathname === href;
  const isLive = user.streamReference ? user.streamReference.isLive : false;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-10",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-gray-300",
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center",
          )}
        >
          <UserAvatar
            showBadge={isLive}
            imgUrl={user.profileImage}
            isLive={isLive}
            username={user.username}
          />
          {!collapsed && <p className="truncate">{user.username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
}
