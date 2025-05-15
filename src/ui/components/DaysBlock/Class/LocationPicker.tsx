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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { useGetLocations } from "@/features/classes-schedule/locations/hooks/use-locations-query.ts"
import {
  extractDomain,
  formatLocationName,
  getRussianLocationTypeName,
} from "@/ui/components/DaysBlock/formatters.ts"
import { LocationForm } from "./LocationForm.tsx"

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
  const [searchQuery, setSearchQuery] = useState("")
  const { data: locations, refetch } = useGetLocations()
  const options = useMemo(() => locations?.data ?? [], [locations])

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) {
      return [...options].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    }

    const query = searchQuery.toLowerCase().trim()

    return options
      .filter(item => {
        const name = item.name.toLowerCase()
        const domain =
          item.type === "online" && item.link ? extractDomain(item.link).toLowerCase() : ""

        return (
          name.includes(query) ||
          domain.includes(query) ||
          (item.link && item.link.toLowerCase().includes(query)) ||
          item.type.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()

        const aStartsWith = aName.startsWith(query)
        const bStartsWith = bName.startsWith(query)

        if (aStartsWith && !bStartsWith) return -1
        if (!aStartsWith && bStartsWith) return 1

        return aName < bName ? -1 : aName > bName ? 1 : 0
      })
  }, [options, searchQuery])

  const currentValue = value || options[0]?.id || ""
  const currentLocation = options.find(opt => opt.id === currentValue)

  const displayLabel = currentLocation ? formatLocationName(currentLocation) : "Выбрать..."

  const displayType =
    (currentLocation && getRussianLocationTypeName(currentLocation?.type)) ?? "Н/Д"

  const handleLocationAddSuccess = () => {
    setAddDialogOpen(false)
    void refetch()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="thin"
          role="combobox"
          aria-expanded={open}
          className={cn("overflow-hidden h-full w-full justify-between p-0", widthClass, className)}>
          <div className="flex flex-col items-center justify-center gap-2 min-w-0">
            <div className="font-raleway text-lg font-normal">{displayType}</div>
            <div className="font-raleway text-lg text-ellipsis font-semibold w-full overflow-hidden min-w-0">{displayLabel}</div>
          </div>
          <Switch className="rotate-45 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={0} className={cn("w-full p-0 [*>&]:min-w-52", className)}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={"Поиск по названию"}
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
                    Добавить локацию
                  </CommandItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-raleway text-lg">
                      Добавить новую локацию
                    </DialogTitle>
                    <DialogDescription className="font-raleway text-sm">
                      Заполните информацию о локации. После сохранения она появится в списке.
                    </DialogDescription>
                  </DialogHeader>
                  <LocationForm onSuccess={handleLocationAddSuccess} />
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
                  {formatLocationName(item)}
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
