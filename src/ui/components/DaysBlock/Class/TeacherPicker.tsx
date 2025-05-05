import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx"
import { Button } from "@/components/ui/button.tsx"
import { FC, useState } from "react"
import Switch from "@assets/switch.svg?react"
import { cn } from "@/lib/utils.ts"
import { Check, PlusIcon } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx"
import { useGetTeachers } from "@/features/classes-schedule/teachers/hooks/use-teachers-query.ts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"

export interface TeacherPickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
  widthClass?: string
}

export const TeacherPicker: FC<TeacherPickerProps> = ({
  value,
  onChange,
  className,
  widthClass,
}) => {
  const [open, setOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const { data: teachers, refetch } = useGetTeachers()
  const options = teachers?.data ?? []

  const currentValue = value || options[0]?.id || ""

  const displayLabel = options.find(opt => opt.id === currentValue)?.name ?? "Выбрать..."

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="default"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between p-0", widthClass, className)}>
          {displayLabel}
          <Switch className="rotate-45 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={0} className={cn("w-full p-0", className)}>
        <Command>
          <CommandInput placeholder={"Поиск по ФИО"} className="font-raleway h-9" />
          <CommandList>
            <CommandEmpty className="font-raleway">Нет результатов</CommandEmpty>
            <CommandGroup>
              <Dialog
                open={addDialogOpen}
                onOpenChange={isOpen => {
                  if (!isOpen) {
                    refetch()
                  }
                  setAddDialogOpen(isOpen)
                }}>
                <DialogTrigger asChild>
                  <CommandItem
                    className="font-raleway"
                    onSelect={() => {
                      setAddDialogOpen(true)
                    }}>
                    <PlusIcon />
                    Добавить преподавателя
                  </CommandItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    <DialogHeader>Добавить нового преподавателя</DialogHeader>
                  </DialogTitle>
                </DialogContent>
              </Dialog>
              {options.map(item => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  className="font-raleway mb-px"
                  onSelect={val => {
                    onChange(val)
                    setOpen(false)
                  }}>
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentValue === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
