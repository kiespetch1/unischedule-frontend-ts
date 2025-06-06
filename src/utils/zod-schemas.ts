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
