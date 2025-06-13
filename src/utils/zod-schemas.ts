import z, { ZodIssueCode } from "zod"

export const classDefaultSchema = z.object({
  name: z.string().min(1, { message: "Название пары не может быть пустым" }),
  started_at: z.preprocess(
    val => {
      if (typeof val === "string" && /^\d{2}:\d{2}$/.test(val)) {
        return `${val}:00`
      }
      return val
    },
    z.string().time({ precision: 0, message: "Некорректное время начала пары" })
  ),
  finished_at: z.preprocess(
    val => {
      if (typeof val === "string" && /^\d{2}:\d{2}$/.test(val)) {
        return `${val}:00`
      }
      return val
    },
    z.string().time({ precision: 0, message: "Некорректное время конца пары" })
  ),
  type: z.enum(["lecture", "practice", "lab_work"] as const, {
    errorMap: (issue, ctx) => {
      if (issue.code === ZodIssueCode.invalid_enum_value) {
        return { message: "Тип пары должен быть одним из списка" }
      }
      return { message: ctx.defaultError }
    },
  }),
  features: z.object({
    week_type: z.enum(["every", "even", "odd"] as const, {
      errorMap: (issue, ctx) => {
        if (issue.code === ZodIssueCode.invalid_enum_value) {
          return { message: "Тип недели должен быть одним из списка" }
        }
        return { message: ctx.defaultError }
      },
    }),
    subgroup: z.enum(["none", "first", "second"] as const, {
      errorMap: (issue, ctx) => {
        if (issue.code === ZodIssueCode.invalid_enum_value) {
          return { message: "Подгруппа должна быть одной из списка" }
        }
        return { message: ctx.defaultError }
      },
    }),
  }),
  location_id: z
    .string()
    .uuid("Локация пуста или указана неверно")
    .refine(val => val !== "00000000-0000-0000-0000-000000000000", {
      message: "Локация должна быть заполнена",
    }),
  teacher_id: z
    .string()
    .uuid("Преподаватель пуст или указан неверно")
    .refine(val => val !== "00000000-0000-0000-0000-000000000000", {
      message: "Преподаватель должен быть заполнен",
    }),
  is_new: z.boolean(),
})

export const teacherSchema = z.object({
  name: z.string().min(1, { message: "ФИО преподавателя не может быть пустым" }),
  full_name: z.string().optional(),
})

export const locationSchema = z
  .object({
    name: z.string().min(1, { message: "Название локации не может быть пустым" }),
    type: z.enum(["irl", "online"] as const, {
      errorMap: (issue, ctx) => {
        if (issue.code === ZodIssueCode.invalid_enum_value) {
          return { message: "Тип локации должен быть очно или дистант" }
        }
        return { message: ctx.defaultError }
      },
    }),
    link: z.string().url({ message: "Ссылка должна быть валидным URL" }).optional().nullable(),
  })
  .refine(
    data => {
      return (
        data.type !== "online" ||
        (data.link !== undefined && data.link !== null && data.link !== "")
      )
    },
    { message: "Для дистанционной локации необходимо указать ссылку", path: ["link"] }
  )

export const announcementSchema = z.object({
  message: z.string().min(1, { message: "Текст объявления не может быть пустым" }).nullable(),
  priority: z.enum(["normal", "high", "very_high"] as const),
  is_anonymous: z.boolean(),
  is_time_limited: z.boolean(),
  available_until: z.string().optional().nullable(),
  target: z.object({
    included_grades: z
      .array(z.number())
      .default([])
      .transform(val => val ?? []),
    included_groups: z
      .array(z.string())
      .default([])
      .transform(val => val ?? []),
    included_departments: z
      .array(z.string())
      .default([])
      .transform(val => val ?? []),
    excluded_grades: z
      .array(z.number())
      .default([])
      .transform(val => val ?? []),
    excluded_groups: z
      .array(z.string())
      .default([])
      .transform(val => val ?? []),
    excluded_departments: z
      .array(z.string())
      .default([])
      .transform(val => val ?? []),
  }),
})

export const importSchema = z.object({ url: z.string().trim().url("Введите корректный URL") })

export const groupSchema = z.object({
  name: z.string().min(1, { message: "Название группы обязательно" }),
  grade: z
    .coerce
    .number()
    .refine(val => !isNaN(val), {
      message: "Курс должен быть числом"
    })
    .refine(val => val >= 1 && val <= 4, {
      message: "Курс должен быть от 1 до 4"
    }),
  has_fixed_subgroups: z.boolean(),
  last_academic_week_number: z
    .number()
    .min(1, { message: "Количество недель должно быть больше 0" }),
})
