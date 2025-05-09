export interface ApiErrors {
  message: string
  inner_messages: string[] | null
}

export interface Result<T> {
  data: T
  errors: ApiErrors
}

export interface CollectionResult<T> {
  data: T[] | null
  total_count: number
}
