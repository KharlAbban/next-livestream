import { FollowUserButton } from "@/components/custom";
import BlockUserButton from "@/components/custom/common/BlockUserButton";
import { hasBlockedUser, isBlockedByUser, isFollowingUser } from "@/lib/utils";
import { sanityClient } from "@/sanity/lib/client";
import { SANITY_GET_USER_BY_USERNAME } from "@/sanity/lib/queries";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await sanityClient.fetch(SANITY_GET_USER_BY_USERNAME, {
    username: username,
  });

  if (!user)
    return (
      <div className="w-full h-full flex items-center justify-center">
        User not found
      </div>
    );

  const isfollowingThisUser = await isFollowingUser(user._id);
  const hasBlockedThisUser = await hasBlockedUser(user._id);
  const isBlockedByThisUser = await isBlockedByUser(user._id);

  if (isBlockedByThisUser) return <div>Blocked by this user</div>;

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ut?
      <p>{user.email}</p>
      <p>Following this user: {`${isfollowingThisUser}`}</p>
      <FollowUserButton isFollowing={isfollowingThisUser} id={user._id} />
      <BlockUserButton id={user._id} hasBlockedUser={hasBlockedThisUser} />
    </div>
  );
}
