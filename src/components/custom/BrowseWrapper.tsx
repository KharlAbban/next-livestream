"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use_sidebar_store";

interface SidebarProps {
  children: React.ReactNode;
}

export default function BrowseWrapper({ children }: SidebarProps) {
  const { collapsed } = useSidebarStore((state) => state);

  return (
    <div
      className={cn(
        "flex-1 transition-all duration-200",
        collapsed
          ? "ml-[70px] transition-all duration-200"
          : "ml-[70px] lg:ml-60",
      )}
    >
      {children}
    </div>
  );
}
