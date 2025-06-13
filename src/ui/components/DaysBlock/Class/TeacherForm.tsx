import { FC, useState } from "react"
import { formOptions, useForm } from "@tanstack/react-form"
import { ZodType } from "zod"
import { teacherSchema } from "@/utils/zod-schemas.ts"
import { defaultTeacher } from "@/utils/default-entities.ts"
import { useCreateTeacher } from "@/features/classes-schedule/teachers/hooks/use-teacher-query.ts"
import { useUpdateTeacher } from "@/features/classes-schedule/teachers/hooks/use-update-teacher.ts"
import { TeacherCreateModel } from "@/features/classes-schedule/teachers/create-teacher.ts"
import { Input } from "@/ui/basic/input.tsx"
import { Label } from "@/ui/basic/label.tsx"
import { Button } from "@/ui/basic/button.tsx"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { getErrorMessages } from "@/utils/formatters.ts"
import { Check, Trash } from "lucide-react"
import { ConfirmDialog } from "@components/common/confirm-dialog.tsx"

interface TeacherFormProps {
  onSuccess: () => void
  id?: string
  initial?: TeacherCreateModel
}

export const TeacherForm: FC<TeacherFormProps> = ({ onSuccess, id, initial }) => {
  const { mutateAsync: createTeacher } = useCreateTeacher()
  const { mutateAsync: updateTeacher } = useUpdateTeacher({ id: id ?? "" })
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const defaultValues: TeacherCreateModel = initial ?? { name: "", full_name: undefined }

  const teacherFormOptions = formOptions({
    defaultValues,
    validators: {
      onChange: teacherSchema as ZodType<TeacherCreateModel>,
      onChangeAsyncDebounceMs: 400,
    },
    canSubmitWhenInvalid: false,
  })

  const teacherForm = useForm({
    ...teacherFormOptions,
    onSubmit: async ({ value }) => {
      const safeValue: TeacherCreateModel = {
        name: value.name || defaultTeacher.name,
        full_name: value.full_name,
      }
      if (id) {
        await updateTeacher(safeValue)
      } else {
        await createTeacher(safeValue)
      }
      onSuccess()
    },
  })

  return (
    <form
      className="flex flex-col gap-y-6"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        teacherForm.handleSubmit(e)
      }}>
      <teacherForm.Field name="name">
        {field => {
          const { errors, isTouched } = field.state.meta
          return (
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={field.name}>ФИО преподавателя (кратко)</Label>
              <TooltipWrapper
                isOpen={isTouched && errors.length > 0}
                message={getErrorMessages(errors)}
                delayDuration={0}>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={e => field.setValue(e.target.value)}
                  aria-invalid={isTouched && errors.length > 0}
                  placeholder="Иванов И.И."
                  required
                  className="font-raleway"
                />
              </TooltipWrapper>
              <p className="font-raleway text-sm text-gray-500">
                Формат, который будет отображаться в расписании (например: Иванов И.И.)
              </p>
            </div>
          )
        }}
      </teacherForm.Field>

      <teacherForm.Field name="full_name">
        {field => {
          const { errors, isTouched } = field.state.meta
          return (
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={field.name}>Полное ФИО преподавателя</Label>
              <TooltipWrapper
                isOpen={isTouched && errors.length > 0}
                message={getErrorMessages(errors)}
                delayDuration={0}>
                <Input
                  id={field.name}
                  value={field.state.value || ""}
                  onChange={e => field.setValue(e.target.value)}
                  aria-invalid={isTouched && errors.length > 0}
                  placeholder="Иванов Иван Иванович"
                  className="font-raleway"
                />
              </TooltipWrapper>
              <p className="font-raleway text-sm text-gray-500">
                Полное имя (опционально), будет отображаться при наведении
              </p>
            </div>
          )
        }}
      </teacherForm.Field>

      <teacherForm.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="flex flex-row-reverse justify-between">
            <Button type="submit" className="font-raleway" disabled={!canSubmit}>
              {!isSubmitting && <Check className="mr-2 h-4 w-4" />}
              {isSubmitting ? "Сохранение..." : id ? "Сохранить" : "Добавить"}
            </Button>
            {id && (
              <>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsConfirmDialogOpen(true)}
                  disabled={true}>
                  <Trash className="mr-2 h-4 w-4" />
                  Удалить преподавателя
                </Button>
                <ConfirmDialog
                  title="Вы уверены, что хотите удалить преподавателя?"
                  description="Это действие нельзя будет отменить."
                  onConfirm={async () => {
                    onSuccess()
                  }}
                  open={isConfirmDialogOpen}
                  onOpenChange={setIsConfirmDialogOpen}
                />
              </>
            )}
          </div>
        )}
      />
    </form>
  )
}
