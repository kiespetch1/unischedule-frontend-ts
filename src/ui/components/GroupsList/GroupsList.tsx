import { FC, MouseEvent as ReactMouseEvent, useState } from "react"
import { GroupModel } from "@/features/classes-schedule/types/classes-types.ts"
import { GroupSearch } from "@components/GroupsList/GroupSearch.tsx"
import { CourseGroupsRow } from "./CourseGroupsRow"

export interface GroupsListProps {
  groups: GroupModel[] | undefined
  loading: boolean
  onGroupClick?: (groupId: string, event: ReactMouseEvent<HTMLElement>) => void
  addBottomText?: boolean
}

export const GroupsList: FC<GroupsListProps> = ({
  groups,
  loading,
  onGroupClick,
  addBottomText = false,
}) => {
  const [filterText, setFilterText] = useState("")
  const grades = [1, 2, 3, 4]
  const groupsData = groups || []

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <p className="font-raleway mb-2 text-xl/6 font-medium">Группы</p>
        <GroupSearch input={filterText} onInputChange={setFilterText} />
      </div>
      <div className="flex flex-col gap-3">
        {grades.map(grade => (
          <CourseGroupsRow
            key={grade}
            grade={grade}
            groups={groupsData}
            filter={filterText}
            loading={loading}
            onGroupClick={onGroupClick}
          />
        ))}
      </div>
      {addBottomText && (
        <div className="font-raleway italic text-neutral-500">
          Вашей группы нет в списке? Напишите{" "}
          <a
            className="whitespace-nowrap text-neutral-500 underline"
            href="https://t.me/kiespetchq"
            target="_blank"
            rel="noreferrer">
            {" "}
            мне
          </a>
          .
        </div>
      )}
    </div>
  )
}
