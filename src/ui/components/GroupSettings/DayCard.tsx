import { Card } from "@/ui/basic/card.tsx"
import { Dispatch, FC, SetStateAction } from "react"
import { getPluralForm, getRussianDayName } from "@/utils/formatters.ts"
import { DayModel } from "@/features/classes-schedule/types/classes-types.ts"
import { Check } from "lucide-react"
import { useToggle } from "@/hooks/use-toggle.ts"

export interface DayCardProps {
  day: DayModel
  setIdList: Dispatch<SetStateAction<string[]>>
}
export const DayCard: FC<DayCardProps> = ({ day, setIdList }) => {
  const [isSelected, toggleIsSelected] = useToggle(false)

  const handleSelect = () => {
    toggleIsSelected()
    if (isSelected) {
      setIdList(prevList => prevList.filter(id => id !== day.id));
    } else {
      setIdList(prevList => [...prevList, day.id]);
    }
  }

  return (
    <Card key={day.id} className="w-55 h-25 cursor-pointer flex flex-row items-center justify-between px-3" onClick={handleSelect}>
      <div>
        <div className="font-semibold">{getRussianDayName(day.day_of_week)}</div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="font-raleway font-regular text-muted-foreground text-sm">
          {day?.classes?.length} {getPluralForm(day?.classes?.length ?? 0, ["пара", "пары", "пар"])}
        </div>
        <div>
          { isSelected && <Check className="h-4 w-4" color="#0966BB" /> }
        </div>
      </div>
    </Card>
  )
}
