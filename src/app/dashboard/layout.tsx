import { BrowseWrapper, CreatorSidebar, Navbar } from "@/components/custom";
import { SidebarSkeleton } from "@/components/custom/common/skeletons";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full pt-14 flex h-full">
        <Suspense fallback={<SidebarSkeleton />}>
          <CreatorSidebar />
        </Suspense>
        <BrowseWrapper>{children}</BrowseWrapper>
      </div>
    </>
  );
}
