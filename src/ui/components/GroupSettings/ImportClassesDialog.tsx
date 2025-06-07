import { FC, useState } from "react"
import { DialogWrapper } from "@components/common/DialogWrapper.tsx"
import { Button } from "@/ui/basic/button.tsx"
import { Input } from "@/ui/basic/input.tsx"
import { Label } from "@/ui/basic/label.tsx"
import { formOptions, useForm } from "@tanstack/react-form"
import { z } from "zod"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { getErrorMessages } from "@/utils/formatters.ts"
import { useImportClasses } from "@/features/classes-schedule/classes/hooks/use-import-classes.ts"
import { ArrowLeft, Import } from "lucide-react"

interface ImportClassesDialogProps {
  groupId: string
}

export const ImportClassesDialog: FC<ImportClassesDialogProps> = ({ groupId }) => {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const { mutateAsync: importClasses } = useImportClasses({ groupId, url })

  const importSchema = z.object({
    url: z.string().trim().url("Введите корректный URL")
  })

  const options = formOptions({
    defaultValues: { url: "" },
    validators: { onChange: importSchema, onChangeAsyncDebounceMs: 400 },
    canSubmitWhenInvalid: false
  })

  const form = useForm({
    ...options,
    onSubmit: async () => {
      await importClasses()
      setOpen(false)
    },
  })

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      showCloseButton={false}
      trigger={
        <Button>
          <Import className="mr-2 h-4 w-4" />
          Импортировать расписание с оф. сайта
        </Button>
      }>
      <div className="flex flex-col gap-2">
        <div className="font-raleway text-base/6 font-semibold">Импорт расписания</div>
        <div className="font-raleway text-muted-foreground text-sm font-normal">
          Укажите ссылку на страницу расписания на официальном сайте ИАТЭ. Другие сервисы пока не поддерживаются.
        </div>
        <form
          className="flex flex-col gap-4 pt-2"
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(e)
          }}>
          <form.Field name="url">
            {field => {
              const { errors, isTouched } = field.state.meta
              return (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={field.name}>URL</Label>
                  <TooltipWrapper
                    isOpen={isTouched && errors.length > 0}
                    message={getErrorMessages(errors)}
                    delayDuration={0}>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={e => {
                        field.setValue(e.target.value)
                        setUrl(e.target.value)
                      }}
                      aria-invalid={isTouched && errors.length > 0}
                      placeholder="https://"
                      required
                    />
                  </TooltipWrapper>
                </div>
              )
            }}
          </form.Field>
          <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <div className="mt-2 flex flex-row items-center justify-end gap-2 pt-2">
                <Button type="button" onClick={() => setOpen(false)} disabled={isSubmitting}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Вернуться
                </Button>
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  <Import className="mr-2 h-4 w-4" />
                  Импортировать
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </div>
    </DialogWrapper>
  )
}
