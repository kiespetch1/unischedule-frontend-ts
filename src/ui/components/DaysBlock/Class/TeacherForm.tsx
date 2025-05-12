import { FC } from "react"
import { formOptions, useForm } from "@tanstack/react-form"
import { ZodType } from "zod"
import { teacherSchema } from "@/utils/zod-schemas.ts"
import { defaultTeacher } from "@/utils/default-entities.ts"
import { useCreateTeacher } from "@/features/classes-schedule/teachers/hooks/use-teacher-query.ts"
import { TeacherCreateModel } from "@/features/classes-schedule/teachers/create-teacher.ts"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Button } from "@/components/ui/button.tsx"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { getErrorMessages } from "@/utils/formatters.ts"

interface TeacherFormProps {
  onSuccess: () => void
}

export const TeacherForm: FC<TeacherFormProps> = ({ onSuccess }) => {
  const { mutateAsync: createTeacher } = useCreateTeacher()

  const defaultValues: TeacherCreateModel = { name: "", full_name: undefined }

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
      await createTeacher(safeValue)
      onSuccess()
    },
  })

  return (
    <form
      className="space-y-6"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        teacherForm.handleSubmit(e)
      }}>
      <teacherForm.Field name="name">
        {field => {
          const { errors, isTouched } = field.state.meta
          return (
            <div className="space-y-2">
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
            <div className="space-y-2">
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
          <div className="flex justify-end">
            <Button type="submit" className="font-raleway" disabled={!canSubmit}>
              {isSubmitting ? "Сохранение..." : "Добавить преподавателя"}
            </Button>
          </div>
        )}
      />
    </form>
  )
}
