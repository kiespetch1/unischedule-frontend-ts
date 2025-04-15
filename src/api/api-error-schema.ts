import { z } from "zod";
export const apiErrorSchema = z.object({
  data: z.any(),
  error: z.object({
    message: z.string(),
    inner_messages: z.array(z.string()),
  }),
});

export const isApiError = (value: unknown): value is ApiErrorType =>
  apiErrorSchema.safeParse(value).success;

export type ApiErrorType = z.infer<typeof apiErrorSchema>;
