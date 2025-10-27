import {Skeleton} from "@heroui/react";

export default function SponsorshipSkeleton() {
  return (
    <div className="max-w-[200px] w-full flex items-center gap-3">
      <div className="w-full flex items-center flex-col gap-2">
        <Skeleton className="dark h-6 w-3/5 rounded-lg" />
        <Skeleton className="dark h-4 w-4/5 rounded-lg" />
      </div>
    </div>
  );
}
