import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { formOptions, useForm } from "@tanstack/react-form"
import { z } from "zod"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { getErrorMessages } from "@/utils/formatters"

export interface Credentials {
  email: string
  password: string
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const defaultCredentials: Credentials = { email: "", password: "" }
  const credentialsSchema = z.object({
    email: z.string().trim().email("Некорректный формат почты"),
    password: z.string().trim().min(8, "Пароль должен содержать минимум 8 символов"),
  })

  const loginFormOptions = formOptions({
    defaultValues: defaultCredentials,
    validators: { onChange: credentialsSchema },
    canSubmitWhenInvalid: false,
  })

  const loginForm = useForm({
    ...loginFormOptions,
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войти в аккаунт</CardTitle>
          <CardDescription>
            Для доступа к редактированию расписания, групп, а также добавлению объявлений необходимо
            авторизоваться.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()
              loginForm.handleSubmit()
            }}>
            <div className="flex flex-col gap-6">
              <loginForm.Field name="email">
                {field => {
                  const { errors, isTouched } = field.state.meta
                  return (
                    <div className="grid gap-3">
                      <Label htmlFor={field.name}>Электронная почта</Label>
                      <TooltipWrapper
                        isOpen={isTouched && errors.length > 0}
                        message={getErrorMessages(errors)}
                        delayDuration={0}>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={e => field.setValue(e.target.value)}
                          aria-invalid={isTouched && errors.length > 0}
                          type={field.name}
                          placeholder="email@mail.ru"
                          required
                        />
                      </TooltipWrapper>
                    </div>
                  )
                }}
              </loginForm.Field>
              <loginForm.Field name="password">
                {field => {
                  const { errors, isTouched } = field.state.meta
                  return (
                    <div className="grid gap-3">
                      <Label htmlFor={field.name}>Пароль</Label>
                      <TooltipWrapper
                        isOpen={isTouched && errors.length > 0}
                        message={getErrorMessages(errors)}
                        delayDuration={0}>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={e => field.setValue(e.target.value)}
                          aria-invalid={isTouched && errors.length > 0}
                          type={field.name}
                          required
                        />
                      </TooltipWrapper>
                    </div>
                  )
                }}
              </loginForm.Field>
              <loginForm.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full" disabled={!canSubmit}>
                      {isSubmitting ? "..." : "Войти"}
                    </Button>
                  </div>
                )}
              />
            </div>
            <div className="font-raleway mt-4 text-center text-sm">
              Нет аккаунта?{" "}
              <TooltipWrapper message="На данный момент никак :) Доступ предоставляется только сотрудникам вуза, старостам, и другим ответственным лицам в личном порядке. Но все может поменяться!">
                <a href="#" className="font-raleway underline underline-offset-4">
                  Узнать, как создать
                </a>
              </TooltipWrapper>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
