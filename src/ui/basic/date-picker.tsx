"use client"

import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils.ts"
import { Button } from "@/ui/basic/button.tsx"
import { Calendar } from "./calendar.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/basic/popover.tsx"

export interface DatePickerProps {
  date: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({
  date,
  onChange,
  placeholder = "Выберите дату",
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            "font-raleway w-[280px] justify-start text-left font-normal",
            "data-[empty=true]:text-muted-foreground",
            className
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ru }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={onChange} locale={ru} />
      </PopoverContent>
    </Popover>
  )
}
