import { FC, useState, useMemo } from "react"
import { formOptions, useForm } from "@tanstack/react-form"
import { ZodType } from "zod"
import { announcementSchema } from "@/utils/zod-schemas.ts"
import {
  AnnouncementCreateParameters,
  defaultAnnouncementCreateParameters,
} from "@/features/announcements/types/announcement-types.ts"
import { AnnouncementPriority } from "@/features/classes-schedule/types/classes-types.ts"
import { Button } from "@/ui/basic/button.tsx"
import { Label } from "@/ui/basic/label.tsx"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { getErrorMessages } from "@/utils/formatters.ts"
import { Combobox, Options } from "@/ui/basic/combobox.tsx"
import { MultiCombobox } from "@/ui/basic/multi-combobox.tsx"
import { DatePicker } from "@/ui/basic/date-picker.tsx"
import {
  Trash,
  AlertCircle,
  UserMinus,
  UserPlus,
  ListPlus,
  ListMinus,
  Check,
  CircleHelp,
} from "lucide-react"
import { useDeleteAnnouncement } from "@/features/announcements/hooks/use-delete-announcement.ts"
import { ConfirmDialog } from "@components/common/confirm-dialog.tsx"
import { useGetGroups } from "@/features/classes-schedule/groups/hooks/use-groups-query.ts"

const textareaClass =
  "font-raleway placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive min-h-[50px] max-h-[250px] resize-y"

interface AnnouncementFormProps {
  defaultValues: AnnouncementCreateParameters
  onSubmit: (values: AnnouncementCreateParameters) => Promise<void>
  onEditOpen: (value: boolean) => void
  onListOpen: (value: boolean) => void
  selectedId: string | null
}

const getTargetAudienceText = (target: AnnouncementCreateParameters["target"]) => {
  if (!target) return "все группы"

  const { included_grades, excluded_grades, included_groups, excluded_groups } = target

  if (included_groups?.length && excluded_groups?.length) {
    return "включенные курсы"
  }

  let result = ""

  if (excluded_grades?.length) {
    const includedGrades = [1, 2, 3, 4].filter(grade => !excluded_grades.includes(grade))
    if (includedGrades.length === 0) {
      if (included_groups?.length) {
        return "включенные группы"
      }
      return "нет групп"
    }
    if (includedGrades.length === 1) {
      result = `все группы ${includedGrades[0]} курса`
    } else if (includedGrades.length === 2) {
      result = `все группы ${includedGrades[0]} и ${includedGrades[1]} курсов`
    } else {
      result = `все группы ${includedGrades.slice(0, -1).join(", ")} и ${includedGrades[includedGrades.length - 1]} курсов`
    }
  } else {
    result = "все группы"
  }

  if (included_groups?.length) {
    if (result === "все группы") {
      result = "включенные группы"
    } else {
      result += " и включенные группы"
    }
  }

  if (excluded_groups?.length) {
    if (result === "все группы") {
      result = "все группы кроме исключенных"
    } else {
      result += ", кроме исключенных"
    }
  }

  if (
    (included_grades?.length || included_groups?.length) &&
    !excluded_grades?.length &&
    !excluded_groups?.length
  ) {
    return "все группы"
  }

  return result
}

export const AnnouncementForm: FC<AnnouncementFormProps> = ({
  defaultValues,
  onSubmit,
  onEditOpen,
  onListOpen,
  selectedId,
}) => {
  const { mutateAsync: remove } = useDeleteAnnouncement({ id: selectedId ?? "" })
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const { data: groups } = useGetGroups({ fetch_details: false })

  const options = formOptions({
    defaultValues: {
      ...defaultAnnouncementCreateParameters,
      ...defaultValues,
      is_time_limited: defaultValues.is_time_limited ?? false,
    },
    validators: {
      onChange: announcementSchema as ZodType<AnnouncementCreateParameters>,
      onChangeAsyncDebounceMs: 400,
    },
    canSubmitWhenInvalid: false,
  })
  const form = useForm({
    ...options,
    onSubmit: async ({ value }) => {
      try {
        await onSubmit(value)
      } catch (error) {
        console.error("Error during form submission:", error)
      }
    },
  })

  const groupOptions = useMemo(() => {
    return (groups?.data ?? []).map(group => ({ value: group.id, label: group.name }))
  }, [groups])

  const gradeOptions = [
    { value: "1", label: "1 курс" },
    { value: "2", label: "2 курс" },
    { value: "3", label: "3 курс" },
    { value: "4", label: "4 курс" },
  ]

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit(e)
      }}>
      <form.Field name="message">
        {field => {
          const { errors, isTouched } = field.state.meta
          return (
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={field.name}>Текст объявления</Label>
              <TooltipWrapper
                isOpen={isTouched && errors.length > 0}
                message={getErrorMessages(errors)}
                delayDuration={0}>
                <textarea
                  id={field.name}
                  value={field.state.value || ""}
                  onChange={e => field.setValue(e.target.value)}
                  aria-invalid={isTouched && errors.length > 0}
                  className={textareaClass}
                  required
                />
              </TooltipWrapper>
            </div>
          )
        }}
      </form.Field>

      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-2">
            <p className="font-raleway text-lg font-medium">Целевая аудитория</p>
            <TooltipWrapper message="Целевая аудитория объявления может быть настроена через исключение и включение по критериям.\nБез исключений целевая аудитория будет включать всех учащихся.\nИсключение по критерию может быть перезаписано включением по другому критерию.\nТекст справа показывает, какие группы подходят под текущие настройки.">
              <div className="pt-px">
                <CircleHelp width={14} height={14} />
              </div>
            </TooltipWrapper>
          </div>
          <form.Subscribe
            selector={state => state.values.target}
            children={target => (
              <span className="font-raleway text-muted-foreground text-sm">
                {getTargetAudienceText(target)}
              </span>
            )}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label className="flex items-center gap-2">Курсы</Label>
            <div className="flex flex-col gap-2">
              <form.Subscribe
                selector={state => state.values.target?.excluded_grades}
                children={excludedGrades => (
                  <form.Field name="target.included_grades">
                    {field => (
                      <div className="flex flex-col gap-y-2">
                        <Label
                          htmlFor="included_grades"
                          className="text-muted-foreground flex items-center gap-2 text-sm">
                          <ListPlus className="h-4 w-4" />
                          Включенные курсы
                        </Label>
                        <MultiCombobox
                          options={gradeOptions.filter(
                            opt => !excludedGrades?.includes(Number(opt.value))
                          )}
                          value={field.state.value?.map(String) || []}
                          onChange={val => field.setValue(val.map(Number))}
                          widthClass="w-full"
                          className="font-raleway"
                          useSearch
                        />
                      </div>
                    )}
                  </form.Field>
                )}
              />

              <form.Subscribe
                selector={state => state.values.target?.included_grades}
                children={includedGrades => (
                  <form.Field name="target.excluded_grades">
                    {field => (
                      <div className="flex flex-col gap-y-2">
                        <Label
                          htmlFor="excluded_grades"
                          className="text-muted-foreground flex items-center gap-2 text-sm">
                          <ListMinus className="h-4 w-4" />
                          Исключенные курсы
                        </Label>
                        <MultiCombobox
                          options={gradeOptions.filter(
                            opt => !includedGrades?.includes(Number(opt.value))
                          )}
                          value={field.state.value?.map(String) || []}
                          onChange={val => field.setValue(val.map(Number))}
                          widthClass="w-full"
                          className="font-raleway"
                          useSearch
                        />
                      </div>
                    )}
                  </form.Field>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label className="flex items-center gap-2">Группы</Label>
            <div className="flex flex-col gap-2">
              <form.Subscribe
                selector={state => state.values.target?.excluded_groups}
                children={excludedGroups => (
                  <form.Field name="target.included_groups">
                    {field => (
                      <div className="flex flex-col gap-y-2">
                        <Label
                          htmlFor="included_groups"
                          className="text-muted-foreground flex items-center gap-2 text-sm">
                          <UserPlus className="h-4 w-4" />
                          Включенные группы
                        </Label>
                        <MultiCombobox
                          options={groupOptions.filter(opt => !excludedGroups?.includes(opt.value))}
                          value={field.state.value || []}
                          onChange={val => field.setValue(val)}
                          widthClass="w-full"
                          className="font-raleway"
                          useSearch
                        />
                      </div>
                    )}
                  </form.Field>
                )}
              />

              <form.Subscribe
                selector={state => state.values.target?.included_groups}
                children={includedGroups => (
                  <form.Field name="target.excluded_groups">
                    {field => (
                      <div className="flex flex-col gap-y-2">
                        <Label
                          htmlFor="excluded_groups"
                          className="text-muted-foreground flex items-center gap-2 text-sm">
                          <UserMinus className="h-4 w-4" />
                          Исключенные группы
                        </Label>
                        <MultiCombobox
                          options={groupOptions.filter(opt => !includedGroups?.includes(opt.value))}
                          value={field.state.value || []}
                          onChange={val => field.setValue(val)}
                          widthClass="w-full"
                          className="font-raleway"
                          useSearch
                        />
                      </div>
                    )}
                  </form.Field>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <form.Field name="priority">
        {field => (
          <div className="flex flex-col gap-y-2">
            <Label htmlFor={field.name} className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Приоритет
            </Label>
            <Combobox<AnnouncementPriority>
              options={
                [
                  { value: "normal", label: "Обычный" },
                  { value: "high", label: "Высокий" },
                  { value: "very_high", label: "Очень высокий" },
                ] as Options<AnnouncementPriority>[]
              }
              value={field.state.value}
              onChange={val => field.setValue(val)}
              widthClass="w-[200px]"
              className="font-raleway"
            />
          </div>
        )}
      </form.Field>

      <div className="flex flex-col items-start justify-start gap-2">
        <form.Field name="is_anonymous">
          {field => (
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="anon"
                checked={field.state.value}
                onChange={e => field.setValue(e.target.checked)}
              />
              <Label htmlFor="anon">Анонимно</Label>
            </div>
          )}
        </form.Field>
        <form.Field name="is_time_limited">
          {field => (
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="time"
                checked={field.state.value}
                onChange={e => field.setValue(e.target.checked)}
              />
              <Label htmlFor="time">Ограничить время показа на странице расписания</Label>
            </div>
          )}
        </form.Field>
      </div>

      <form.Subscribe
        selector={state => state.values.is_time_limited}
        children={limited =>
          limited && (
            <form.Field name="available_until">
              {field => (
                <div className="flex gap-2">
                  <Label htmlFor={field.name}>Доступно до</Label>
                  <DatePicker
                    date={field.state.value ? new Date(field.state.value) : undefined}
                    onChange={val => field.setValue(val ? val.toISOString() : null)}
                    placeholder="Выберите дату"
                    className="font-raleway"
                  />
                </div>
              )}
            </form.Field>
          )
        }
      />

      <form.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="flex justify-between">
            <div className="flex justify-end">
              {selectedId !== null && (
                <>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setIsConfirmDialogOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Удалить объявление
                  </Button>
                  <ConfirmDialog
                    title="Вы уверены, что хотите удалить объявление?"
                    description="Это действие нельзя будет отменить."
                    onConfirm={async () => {
                      await remove()
                      onEditOpen(false)
                      onListOpen(true)
                    }}
                    open={isConfirmDialogOpen}
                    onOpenChange={setIsConfirmDialogOpen}
                  />
                </>
              )}
            </div>
            <Button type="submit" disabled={!canSubmit} className="font-raleway">
              {!isSubmitting && <Check className="mr-2 h-4 w-4" />}
              {isSubmitting ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        )}
      />
    </form>
  )
}
