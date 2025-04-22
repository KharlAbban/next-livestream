import { cn } from "@/lib/utils";

export default function LiveBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[8px] border border-background font-semibold tracking-wide",
        className,
      )}
    >
      Live
    </div>
  );
}
