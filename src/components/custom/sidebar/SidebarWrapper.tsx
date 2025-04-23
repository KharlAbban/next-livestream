"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use_sidebar_store";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface SidebarProps {
  children: React.ReactNode;
}

export default function SidebarWrapper({ children }: SidebarProps) {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebarStore((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <aside
      className={cn(
        "fixed overflow-x-hidden left-0 flex flex-col h-full w-[70px] lg:w-60 bg-background border-r z-50 transition-all duration-200",
        collapsed && "lg:w-[70px] transition-all duration-200",
      )}
    >
      {children}
    </aside>
  );
}
