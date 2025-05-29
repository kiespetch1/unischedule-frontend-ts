import { GroupModel } from "@/features/classes-schedule/types/classes-types.ts"
import { FC } from "react"
import { GroupButton } from "@components/GroupsList/GroupButton.tsx"
import { Skeleton } from "@/ui/basic/skeleton.tsx"

export interface CourseGroupsRowProps {
  grade: number
  groups: GroupModel[]
  filter: string
  loading: boolean
}

export const CourseGroupsRow: FC<CourseGroupsRowProps> = ({ grade, groups, filter, loading }) => {
  const filteredGroups = groups
    .filter(group => group.grade == grade)
    .filter(group => (!filter ? true : group.name.toLowerCase().includes(filter.toLowerCase())))

  if (loading) {
    return <GroupsListSkeleton />
  }

  if (filteredGroups.length == 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-3">
        <div className="font-raleway text-md">{grade} курс</div>
        <div className="h-px w-[450px] bg-neutral-300" />
      </div>

      <div className="flex flex-row gap-4">
        {filteredGroups.map(group => (
          <GroupButton key={group.id} groupName={group.name} link={"/classes/" + group.id} />
        ))}
      </div>
    </div>
  )
}

export const GroupsListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 pt-1">
      <Skeleton className="h-5 w-[100px]" />

      <div className="flex flex-row gap-4">
        <Skeleton className="h-[39px] w-[126px] rounded-[20px]" />
        <Skeleton className="h-[39px] w-[126px] rounded-[20px]" />
      </div>
    </div>
  )
}
