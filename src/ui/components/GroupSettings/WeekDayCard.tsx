import { Card } from "@/ui/basic/card.tsx"
import { Dispatch, FC, SetStateAction } from "react"
import { DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import { getRussianDayName } from "@/utils/formatters.ts"
import { Check } from "lucide-react"
import { useToggle } from "@/hooks/use-toggle.ts"

export interface WeekDayCardProps {
  day: DayOfWeek
  setList: Dispatch<SetStateAction<DayOfWeek[]>>
}

export const WeekDayCard: FC<WeekDayCardProps> = ({ day, setList }) => {
  const [isSelected, toggle] = useToggle(false)

  const handleSelect = () => {
    toggle()
    setList(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    )
  }

  return (
    <Card
      key={day}
      className="w-55 h-25 cursor-pointer flex flex-row items-center justify-between px-3"
      onClick={handleSelect}
    >
      <div className="font-semibold">{getRussianDayName(day)}</div>
      {isSelected && <Check className="h-4 w-4" color="#0966BB" />}
    </Card>
  )
}
