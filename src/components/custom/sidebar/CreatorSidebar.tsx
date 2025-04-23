import CreatorSidebarNavigation from "./CreatorSidebarNavigation";
import SidebarToggle from "./SidebarToggle";
import SidebarWrapper from "./SidebarWrapper";

export default async function CreatorSidebar() {
  return (
    <SidebarWrapper>
      <SidebarToggle sidebarType="creator" />
      <div className="pt-4 lg:pt-0">
        <CreatorSidebarNavigation />
      </div>
    </SidebarWrapper>
  );
}
