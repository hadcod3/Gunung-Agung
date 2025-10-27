import { Skeleton } from "@heroui/react";

interface ImageBoxSkeletonProps {
  count?: number;
}

export default function ImageBoxSkeleton({ count = 1 }: ImageBoxSkeletonProps) {
  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="relative aspect-video w-[23%] min-w-80">
            <Skeleton className="dark relative w-full h-full rounded-none" />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="relative aspect-video w-[23%] min-w-80">
      <Skeleton className="dark relative w-full h-full rounded-none" />
    </div>
  );
}