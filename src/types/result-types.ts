export interface Result<T> {
  data: T
  total_count: number
}

export interface CollectionResult<T> {
  data: T[] | null
  total_count: number
}
