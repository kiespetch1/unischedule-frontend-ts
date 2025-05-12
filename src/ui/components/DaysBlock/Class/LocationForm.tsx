import { FC } from "react"
import { formOptions, useForm } from "@tanstack/react-form"
import { ZodType } from "zod"
import { locationSchema } from "@/utils/zod-schemas.ts"
import { useCreateLocation } from "@/features/classes-schedule/locations/hooks/use-location-query.ts"
import { LocationCreateModel } from "@/features/classes-schedule/locations/create-location.ts"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Button } from "@/components/ui/button.tsx"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { getErrorMessages } from "@/utils/formatters.ts"
import { LocationType } from "@/features/classes-schedule/types/classes-types.ts"
import { getRussianLocationTypeName } from "@/ui/components/DaysBlock/formatters.ts"

interface LocationFormProps {
  onSuccess: () => void
}

export const LocationForm: FC<LocationFormProps> = ({ onSuccess }) => {
  const { mutateAsync: createLocation } = useCreateLocation()

  const defaultValues: LocationCreateModel = { name: "", type: "irl" as LocationType, link: null }

  const locationFormOptions = formOptions({
    defaultValues,
    validators: {
      onChange: locationSchema as ZodType<LocationCreateModel>,
      onChangeAsyncDebounceMs: 400,
    },
    canSubmitWhenInvalid: false,
  })

  const locationForm = useForm({
    ...locationFormOptions,
    onSubmit: async ({ value }) => {
      const safeValue: LocationCreateModel = {
        name: value.name,
        type: value.type,
        link: value.type === "online" ? value.link : null,
      }
      await createLocation(safeValue)
      onSuccess()
    },
  })

  return (
    <form
      className="space-y-6"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        locationForm.handleSubmit(e)
      }}>
      <locationForm.Field name="name">
        {field => {
          const { errors, isTouched } = field.state.meta
          return (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Название локации</Label>
              <TooltipWrapper
                isOpen={isTouched && errors.length > 0}
                message={getErrorMessages(errors)}
                delayDuration={0}>
                <locationForm.Subscribe
                  selector={state => state.values.type}
                  children={locationType => (
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={e => field.setValue(e.target.value)}
                      aria-invalid={isTouched && errors.length > 0}
                      placeholder={locationType === "irl" ? "4-321" : "meet.example.com/abc123"}
                      required
                      className="font-raleway"
                    />
                  )}
                />
              </TooltipWrapper>
              <locationForm.Subscribe
                selector={state => state.values.type}
                children={locationType => (
                  <p className="font-raleway text-sm text-gray-500">
                    {locationType === "online"
                      ? "Для дистанционной локации указывается имя сервиса (будет отображаться вместе с сокращенной ссылкой)"
                      : "Для очной локации используйте формат «корпус-аудитория» (например: 4-321)"}
                  </p>
                )}
              />
            </div>
          )
        }}
      </locationForm.Field>

      <locationForm.Field name="type">
        {field => {
          const { errors, isTouched } = field.state.meta
          return (
            <div className="space-y-2">
              <Label>Тип локации</Label>
              <TooltipWrapper
                isOpen={isTouched && errors.length > 0}
                message={getErrorMessages(errors)}
                delayDuration={0}>
                <div className="flex gap-4" role="radiogroup">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="irl"
                      name="locationType"
                      value="irl"
                      checked={field.state.value === "irl"}
                      onChange={() => {
                        field.setValue("irl" as LocationType)
                        locationForm.setFieldValue("link", null)
                      }}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="irl" className="cursor-pointer">
                      {getRussianLocationTypeName("irl")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="online"
                      name="locationType"
                      value="online"
                      checked={field.state.value === "online"}
                      onChange={() => {
                        field.setValue("online" as LocationType)
                        locationForm.setFieldValue("link", "")
                      }}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="online" className="cursor-pointer">
                      {getRussianLocationTypeName("online")}
                    </Label>
                  </div>
                </div>
              </TooltipWrapper>
            </div>
          )
        }}
      </locationForm.Field>

      <locationForm.Subscribe
        selector={state => state.values.type === "online"}
        children={isOnline =>
          isOnline && (
            <locationForm.Field name="link">
              {field => {
                const { errors, isTouched } = field.state.meta
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Ссылка</Label>
                    <TooltipWrapper
                      isOpen={isTouched && errors.length > 0}
                      message={getErrorMessages(errors)}
                      delayDuration={0}>
                      <Input
                        id={field.name}
                        value={field.state.value || ""}
                        onChange={e => field.setValue(e.target.value)}
                        aria-invalid={isTouched && errors.length > 0}
                        placeholder="https://meet.example.com/abc123"
                        className="font-raleway"
                        required
                      />
                    </TooltipWrapper>
                    <p className="font-raleway text-sm text-gray-500">
                      Полная ссылка для подключения к дистанционному занятию
                    </p>
                  </div>
                )
              }}
            </locationForm.Field>
          )
        }
      />

      <locationForm.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="flex justify-end">
            <Button type="submit" className="font-raleway" disabled={!canSubmit}>
              {isSubmitting ? "Сохранение..." : "Добавить локацию"}
            </Button>
          </div>
        )}
      />
    </form>
  )
}
