import { FC, useState } from "react"
import { Button } from "@/ui/basic/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/basic/dialog.tsx"
import { Input } from "@/ui/basic/input.tsx"
import { Label } from "@/ui/basic/label.tsx"
import { useCreateGroup } from "@/features/classes-schedule/groups/hooks/use-create-group.ts"
import { formOptions, useForm } from "@tanstack/react-form"
import { ZodType } from "zod"
import { Plus, Check } from "lucide-react"
import { TooltipWrapper } from "@/ui/components/common/TooltipWrapper.tsx"
import { getErrorMessages } from "@/utils/formatters.ts"
import { groupSchema } from "@/utils/zod-schemas.ts"
import { defaultGroupCreateParameters } from "@/utils/default-entities"
import { GroupCreateParameters } from "@/features/classes-schedule/groups/create-group.ts"

export const CreateGroupDialog: FC = () => {
  const [open, setOpen] = useState(false)
  const { mutateAsync: createGroup } = useCreateGroup()

  const groupFormOptions = formOptions({
    defaultValues: defaultGroupCreateParameters,
    validators: {
      onChange: groupSchema as ZodType<GroupCreateParameters>,
      onChangeAsyncDebounceMs: 400,
    },
    canSubmitWhenInvalid: false,
  })

  const groupForm = useForm({
    ...groupFormOptions,
    onSubmit: async ({ value }) => {
      await createGroup(value as GroupCreateParameters)
      setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Создать группу
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание новой группы</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-y-6"
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            groupForm.handleSubmit(e)
          }}>
          <groupForm.Field name="name">
            {field => {
              const { errors, isTouched } = field.state.meta
              return (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name}>Название группы</Label>
                  <TooltipWrapper
                    isOpen={isTouched && errors.length > 0}
                    message={getErrorMessages(errors)}
                    delayDuration={0}>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={isTouched && errors.length > 0}
                      required
                      className="font-raleway"
                    />
                  </TooltipWrapper>
                </div>
              )
            }}
          </groupForm.Field>

          <groupForm.Field name="grade">
            {field => {
              const { errors, isTouched } = field.state.meta
              return (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name}>Курс</Label>
                  <TooltipWrapper
                    isOpen={isTouched && errors.length > 0}
                    message={getErrorMessages(errors)}
                    delayDuration={0}>
                    <Input
                      id={field.name}
                      type="number"
                      min={1}
                      max={4}
                      value={field.state.value ?? ""}
                      onChange={e => {
                        const value = e.target.value === "" ? null : Number(e.target.value)
                        field.handleChange(value)
                      }}
                      aria-invalid={isTouched && errors.length > 0}
                      required
                      className="font-raleway"
                    />
                  </TooltipWrapper>
                </div>
              )
            }}
          </groupForm.Field>

          <groupForm.Field name="last_academic_week_number">
            {field => {
              const { errors, isTouched } = field.state.meta
              return (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name}>Количество академических недель</Label>
                  <TooltipWrapper
                    isOpen={isTouched && errors.length > 0}
                    message={getErrorMessages(errors)}
                    delayDuration={0}>
                    <Input
                      id={field.name}
                      type="number"
                      min={1}
                      value={field.state.value}
                      onChange={e => field.handleChange(Number(e.target.value))}
                      aria-invalid={isTouched && errors.length > 0}
                      required
                      className="font-raleway"
                    />
                  </TooltipWrapper>
                </div>
              )
            }}
          </groupForm.Field>

          <groupForm.Field name="has_fixed_subgroups">
            {field => {
              const { errors, isTouched } = field.state.meta
              return (
                <div className="flex flex-col gap-y-2">
                  <TooltipWrapper
                    isOpen={isTouched && errors.length > 0}
                    message={getErrorMessages(errors)}
                    delayDuration={0}>
                    <div className="flex items-center gap-x-2">
                      <input
                        type="checkbox"
                        id={field.name}
                        checked={field.state.value}
                        onChange={e => field.handleChange(e.target.checked)}
                        className="h-4 w-4"
                      />
                      <Label htmlFor={field.name} className="cursor-pointer">
                        Группа имеет фиксированные подгруппы
                      </Label>
                    </div>
                  </TooltipWrapper>
                </div>
              )
            }}
          </groupForm.Field>

          <groupForm.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex items-center justify-end gap-x-2">
                <Button type="submit" className="font-raleway" disabled={!canSubmit}>
                  {!isSubmitting && <Check className="mr-2 h-4 w-4" />}
                  {isSubmitting ? "Создание..." : "Создать группу"}
                </Button>
              </div>
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
