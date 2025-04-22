import { BrowseWrapper, Navbar, Sidebar } from "@/components/custom";
import { SidebarSkeleton } from "@/components/custom/common/skeletons";
import { Suspense } from "react";

export default function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full pt-20 flex h-full">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <BrowseWrapper>{children}</BrowseWrapper>
      </div>
    </>
  );
}
