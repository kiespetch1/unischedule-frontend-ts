import { Skeleton } from "@/ui/basic/skeleton.tsx"

export const DaySkeleton = () => {
  return (
    <div className="group flex flex-col">
      <Skeleton className="h-[182px] w-[600px] rounded-b-sm" />
      <Skeleton className="rounded-sm] mt-[6px] h-[133px] w-[600px]" />
      <div className="day-end-block"></div>
    </div>
  )
}
