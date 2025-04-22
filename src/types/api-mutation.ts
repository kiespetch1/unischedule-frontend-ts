import { UseMutationOptions, UseMutationResult } from "@tanstack/react-query"
import { ApiError } from "@/api/api-error.ts"

export type ApiMutationOptions<TVariables = void, TData = void, TContext = unknown> = Omit<
  UseMutationOptions<TData, ApiError, TVariables, TContext>,
  "mutationFn" | "mutationKey"
>

export type ApiMutationResult<
  TVariables = void,
  TData = void,
  TContext = unknown,
> = UseMutationResult<TData, ApiError, TVariables, TContext>

export type ApiMutation<TVariables = void, TData = void> = <TContext = unknown>(
  options?: ApiMutationOptions<TVariables, TData, TContext>
) => ApiMutationResult<TVariables, TData, TContext>

export type ApiMutationWithParams<TParams, TVariables = void, TData = void> = <TContext = unknown>(
  params: TParams,
  options?: ApiMutationOptions<TVariables, TData, TContext>
) => ApiMutationResult<TVariables, TData, TContext>
