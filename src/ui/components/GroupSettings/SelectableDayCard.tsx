import { Card } from "@/ui/basic/card.tsx"
import { Dispatch, SetStateAction } from "react"
import { Check } from "lucide-react"
import { useToggle } from "@/hooks/use-toggle.ts"
import { DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"

export interface SelectableDayCardProps<T extends string | DayOfWeek> {
  value: T
  label: string
  info?: string
  setList: Dispatch<SetStateAction<T[]>>
}

export const SelectableDayCard = <T extends string | DayOfWeek>({
  value,
  label,
  info,
  setList,
}: SelectableDayCardProps<T>) => {
  const [selected, toggle] = useToggle(false)

  const handleSelect = () => {
    toggle()
    setList(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]))
  }

  return (
    <Card
      className="w-55 h-25 flex cursor-pointer flex-row items-center justify-between px-3"
      onClick={handleSelect}>
      <div className="flex flex-col">
        <span className="font-semibold">{label}</span>
        {info && (
          <span className="font-raleway font-regular text-muted-foreground text-sm">{info}</span>
        )}
      </div>
      {selected && <Check className="h-4 w-4" color="#0966BB" />}
    </Card>
  )
}
