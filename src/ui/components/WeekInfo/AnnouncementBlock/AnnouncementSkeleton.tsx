import { Skeleton } from "@/components/ui/skeleton.tsx"

export const AnnouncementSkeleton = () => {
  return (
    <div className="mt-2 flex flex-col gap-3">
      <Skeleton className="w-130 h-[21px]" />
      <Skeleton className="h-[21px] w-[201px]" />
    </div>
  )
}
