"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils.ts"
import { Button } from "@/ui/basic/button.tsx"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/basic/command.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/basic/popover.tsx"
import { useState } from "react"

export interface Options<T extends string = string> {
  value: T
  label: string
}

export interface ComboboxProps<T extends string> {
  options: Options<T>[]
  useSearch?: boolean
  itemName?: string
  className?: string
  widthClass?: string
  value: T
  onChange: (value: T) => void
}

export const Combobox = <T extends string>({
  options,
  useSearch,
  itemName,
  className,
  widthClass,
  value,
  onChange,
}: ComboboxProps<T>) => {
  const [open, setOpen] = useState(false)

  const currentValue = value || options[0]?.value || ""

  const displayLabel = options.find(opt => opt.value === currentValue)?.label ?? "Выбрать..."

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between p-0", widthClass, className)}>
          {displayLabel}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={0} className={cn("w-full p-0", className)}>
        <Command>
          {useSearch && (
            <CommandInput
              placeholder={`Выбрать${itemName ? ` ${itemName}` : ""}...`}
              className="h-9"
            />
          )}
          <CommandList>
            <CommandEmpty>Нет элементов</CommandEmpty>
            <CommandGroup>
              {options.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={val => {
                    onChange(val as T)
                    setOpen(false)
                  }}
                  className="font-raleway">
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentValue === item.value ? "opacity-100" : "opacity-0"
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
