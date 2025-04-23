"use client";

import { Button } from "@/components/ui/button";
import { CREATOR_SIDEBAR_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use_sidebar_store";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CreatorSidebarNavigation() {
  const pathname = usePathname();
  const { collapsed } = useSidebarStore((state) => state);
  const { user } = useUser();

  return (
    <ul className="space-y-2 px-2">
      {CREATOR_SIDEBAR_ROUTES.map((route) => {
        const isActive = pathname === route.href;
        const linkToUse =
          route.label === "Stream"
            ? `${route.href}/${user?.username}`
            : route.href;

        return (
          <Button
            title={route.label}
            key={route.label}
            asChild
            variant="ghost"
            className={cn(
              "w-full h-10",
              collapsed ? "justify-center" : "justify-start",
              isActive && "bg-gray-400",
            )}
          >
            <Link href={linkToUse}>
              <div className="flex items-center gap-x-3">
                <route.icon
                  className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")}
                />
                {!collapsed && (
                  <p className="text-sm font-medium">{route.label}</p>
                )}
              </div>
            </Link>
          </Button>
        );
      })}
    </ul>
  );
}
