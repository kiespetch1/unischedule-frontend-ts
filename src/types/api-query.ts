import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { ApiError } from "@/api/api-error.ts"

export type ApiQueryOptions<TFnData, TData = TFnData> = Omit<
  UseQueryOptions<TFnData, ApiError, TData>,
  "queryKey" | "queryFn"
>

export type ApiQueryResult<TData> = UseQueryResult<TData, ApiError>

export type ApiQuery<TFnData> = <TData = TFnData>(
  options?: ApiQueryOptions<TFnData, TData>
) => ApiQueryResult<TData>

export type ApiQueryWithParams<TParams, TFnData> = <TData = TFnData>(
  params: TParams,
  options?: ApiQueryOptions<TFnData, TData>
) => ApiQueryResult<TData>

export type SelectedApiQueryOptions<TFnData, TData = TFnData> = Omit<
  ApiQueryOptions<TFnData, TData>,
  "select"
>

export type SelectedApiQuery<TFnData, TData = TFnData> = (
  options?: SelectedApiQueryOptions<TFnData, TData>
) => ApiQueryResult<TData>

export type SelectedApiQueryWithParams<TParams, TFnData, TData = TFnData> = (
  params: TParams,
  options?: SelectedApiQueryOptions<TFnData, TData>
) => ApiQueryResult<TData>
