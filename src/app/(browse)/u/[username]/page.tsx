import { FollowUserButton } from "@/components/custom";
import { isFollowingUser } from "@/lib/utils";
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

  const followingUser = await isFollowingUser(user._id);

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ut?
      <p>{user.email}</p>
      <p>Following this user: {`${followingUser}`}</p>
      <FollowUserButton isFollowing={followingUser} id={user._id} />
    </div>
  );
}
