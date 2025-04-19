import { isNullableOrEmpty } from "@/utils/equality-comparers.ts"

export type UnformattedSearchParams = Record<
  string,
  number | string | Date | (number | string | Date)[] | null | undefined
>

export const formatSearchParams = (params: UnformattedSearchParams) => {
  const searchParam = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (isNullableOrEmpty(value)) continue

    if (Array.isArray(value)) {
      value.forEach(item => searchParam.append(key, item.toString()))
    } else if (value instanceof Date) {
      searchParam.append(key, value.toISOString())
    } else {
      searchParam.append(key, value?.toString())
    }
  }
  return searchParam
}
