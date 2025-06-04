import { useGetGroups } from "@/features/classes-schedule/groups/hooks/use-groups-query"
import { GroupsList } from "@components/GroupsList/GroupsList.tsx"

export const HomePage = () => {
  const { data: groups, isLoading } = useGetGroups({ grade: null })
  return (
    <div className="mx-8 flex flex-col items-start gap-6">
      <div>
        <p className="font-raleway mb-3 text-2xl/6 font-medium">Привет!</p>
        <p className="font-raleway text-lg/6">
          Это мой небольшой проект - здесь можно быстро найти актуальное расписание занятий, и
          другую важную информацию об учебе.
        </p>
        <p className="font-raleway text-lg/6">
          Если твоей группы в списках еще нет, напиши мне, и я добавлю ее.
        </p>
      </div>
      <div className="flex gap-3 flex-col">
      <p className="font-raleway text-xl/6 font-medium">Группы</p>
      <GroupsList groups={groups?.data} loading={isLoading} addBottomText={true} />
      </div>
    </div>
  )
}
