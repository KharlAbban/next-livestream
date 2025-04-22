import { VariantProps } from "class-variance-authority";
import { avatarSizes } from "./UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface UserAvatarSkeletonProps
  extends VariantProps<typeof avatarSizes> {
  className?: string;
}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-2 py-1">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, idx) => (
        <UserItemSkeleton key={idx} />
      ))}
    </ul>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, idx) => (
        <UserItemSkeleton key={idx} />
      ))}
    </ul>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r z-50">
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-2 pl-4 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-5 w-[100px]" />
      <Skeleton className="h-5 w-[100px]" />
    </div>
  );
};
