import { getFollowedUsers, getRecommendedUsers } from "@/lib/utils";
import RecommendedUsers from "./RecommendedUsers";
import SidebarToggle from "./SidebarToggle";
import SidebarWrapper from "./SidebarWrapper";
import UsersFollowed from "./UsersFollowed";

export default async function Sidebar() {
  const recommendedUsers = await getRecommendedUsers();
  const usersFollowed = await getFollowedUsers();

  return (
    <SidebarWrapper>
      <SidebarToggle sidebarType="user" />
      <div className="space-y-4 pt-4 lg:pt-0">
        <UsersFollowed usersFollowed={usersFollowed} />
        <RecommendedUsers
          followedUsers={usersFollowed}
          recUsers={recommendedUsers}
        />
      </div>
    </SidebarWrapper>
  );
}
