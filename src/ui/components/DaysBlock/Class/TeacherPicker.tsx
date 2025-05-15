import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx"
import { Button } from "@/components/ui/button.tsx"
import { FC, useMemo, useState } from "react"
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { TeacherForm } from "./TeacherForm.tsx"

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
  const [searchQuery, setSearchQuery] = useState("")
  const { data: teachers, refetch } = useGetTeachers()
  const options = useMemo(() => teachers?.data ?? [], [teachers])

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) {
      return [...options].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    }

    const query = searchQuery.toLowerCase().trim()

    const filtered = options.filter(item => {
      const name = String(item.name).toLowerCase()
      const fullName = item.full_name ? String(item.full_name).toLowerCase() : ""
      const id = String(item.id).toLowerCase()

      if (fullName && fullName.includes(query)) {
        return true
      }

      return name.includes(query) || id.includes(query)
    })

    return filtered.sort((a, b) => {
      const aName = String(a.name).toLowerCase()
      const bName = String(b.name).toLowerCase()
      const aFullName = a.full_name ? String(a.full_name).toLowerCase() : ""
      const bFullName = b.full_name ? String(b.full_name).toLowerCase() : ""

      const aFullNameStartsWith = aFullName && aFullName.startsWith(query)
      const bFullNameStartsWith = bFullName && bFullName.startsWith(query)

      if (aFullNameStartsWith && !bFullNameStartsWith) return -1
      if (!aFullNameStartsWith && bFullNameStartsWith) return 1

      const aNameStartsWith = aName.startsWith(query)
      const bNameStartsWith = bName.startsWith(query)

      if (aNameStartsWith && !bNameStartsWith) return -1
      if (!aNameStartsWith && bNameStartsWith) return 1

      const aFullNameIncludes = aFullName && aFullName.includes(query)
      const bFullNameIncludes = bFullName && bFullName.includes(query)

      if (aFullNameIncludes && !bFullNameIncludes) return -1
      if (!aFullNameIncludes && bFullNameIncludes) return 1

      return aName < bName ? -1 : aName > bName ? 1 : 0
    })
  }, [options, searchQuery])

  const currentValue = value || options[0]?.id || ""
  const currentTeacher = options.find(opt => opt.id === currentValue)

  const displayLabel = currentTeacher ? currentTeacher.name : "Выбрать..."

  const handleTeacherAddSuccess = () => {
    setAddDialogOpen(false)
    void refetch()
  }

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
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={"Поиск по ФИО"}
            className="font-raleway h-9"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty className="font-raleway">Нет результатов</CommandEmpty>
            <CommandGroup>
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
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
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-raleway text-lg">
                      Добавить нового преподавателя
                    </DialogTitle>
                    <DialogDescription className="font-raleway text-sm">
                      Заполните информацию о преподавателе. После сохранения он появится в списке.
                    </DialogDescription>
                  </DialogHeader>
                  <TeacherForm onSuccess={handleTeacherAddSuccess} />
                </DialogContent>
              </Dialog>
              {filteredOptions.map(item => (
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
