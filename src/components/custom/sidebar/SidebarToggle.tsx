"use client";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/use_sidebar_store";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export default function SidebarToggle() {
  const { onCollapse, onExpand, collapsed } = useSidebarStore((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Button variant="ghost" onClick={onExpand} title={label}>
            <ArrowRightFromLine className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold">For You</p>
          <Button
            onClick={onCollapse}
            className="h-auto p-2 ml-auto"
            title={label}
            variant="ghost"
          >
            <ArrowLeftFromLine className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
