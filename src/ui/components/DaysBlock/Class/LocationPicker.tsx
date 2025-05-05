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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { useGetLocations } from "@/features/classes-schedule/locations/hooks/use-locations-query.ts"
import { getRussianLocationTypeName } from "@components/DaysBlock/formatters.ts"

export interface LocationPickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
  widthClass?: string
}

export const LocationPicker: FC<LocationPickerProps> = ({
  value,
  onChange,
  className,
  widthClass,
}) => {
  const [open, setOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const { data: locations, refetch } = useGetLocations()
  const options = locations?.data ?? []

  const currentValue = value || options[0]?.id || ""
  const currentLocation = options.find(opt => opt.id === currentValue)

  const displayLabel = currentLocation?.name ?? "Выбрать..."
  const displayType =
    (currentLocation && getRussianLocationTypeName(currentLocation?.type)) ?? "Очно"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="thin"
          role="combobox"
          aria-expanded={open}
          className={cn("h-full justify-between p-0", widthClass, className)}>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-raleway text-lg font-normal">{displayType}</div>
            <div className="font-raleway text-lg font-semibold">{displayLabel}</div>
          </div>
          <Switch className="rotate-45 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={0} className={cn("w-full p-0", className)}>
        <Command>
          <CommandInput
            placeholder={"Поиск по названию локации/домену"}
            className="font-raleway h-9"
          />
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
                    Добавить локацию
                  </CommandItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    <DialogHeader>Добавить новую локацию</DialogHeader>
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
