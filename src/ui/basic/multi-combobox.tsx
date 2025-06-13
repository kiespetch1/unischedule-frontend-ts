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

export interface MultiComboboxProps<T extends string> {
  options: Options<T>[]
  useSearch?: boolean
  itemName?: string
  className?: string
  widthClass?: string
  value: T[]
  onChange: (value: T[]) => void
  multiple?: boolean
}

export const MultiCombobox = <T extends string>({
  options,
  useSearch,
  className,
  widthClass,
  value,
  onChange,
}: MultiComboboxProps<T>) => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const selectedOptions = options.filter(opt => value.includes(opt.value))
  const displayLabel =
    selectedOptions.length > 0 ? selectedOptions.map(opt => opt.label).join(", ") : "Выбрать..."

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between p-0", widthClass, className)}>
          <span className="truncate">{displayLabel}</span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={0} className={cn("w-full p-0", className)}>
        <Command>
          {useSearch && (
            <CommandInput
              placeholder={`Поиск по названию...`}
              className="h-9"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          )}
          <CommandList>
            <CommandEmpty>Нет элементов</CommandEmpty>
            <CommandGroup>
              {options
                .filter(opt =>
                  searchQuery ? opt.label.toLowerCase().includes(searchQuery.toLowerCase()) : true
                )
                .map(item => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={val => {
                      const newValue = value.includes(val as T)
                        ? value.filter(v => v !== val)
                        : [...value, val as T]
                      onChange(newValue)
                    }}>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded border",
                          value.includes(item.value) ? "bg-primary border-primary" : "border-input"
                        )}>
                        {value.includes(item.value) && (
                          <Check className="text-primary-foreground h-3 w-3" />
                        )}
                      </div>
                      {item.label}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
