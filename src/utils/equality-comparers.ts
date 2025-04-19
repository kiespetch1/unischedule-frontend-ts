export const isNullable = <TValue>(
  value: TValue | null | undefined,
): value is null | undefined => value === null || value === undefined;

export const isNonNullable = <TValue>(
  value: TValue | null | undefined,
): value is TValue => value !== null && value !== undefined;

export const isNullableOrEmpty = <TValue>(
  value: TValue | TValue[] | null | undefined,
): value is null | undefined | TValue[] => {
  if (Array.isArray(value)) return value.length === 0;
  return isNullable(value);
};

export const toNonNullable = <TValue>(
  value: TValue | null | undefined,
  message: string = "Value is null or undefined",
): TValue => {
  if (isNullable(value)) throw new Error(message);

  return value;
};

export const MapNonNullable = <TValue, TResult>(
  value: TValue | null | undefined,
  mapper: (value: TValue) => TResult,
): TResult | null | undefined => {
  if (isNullable(value)) return value;

  return mapper(value);
};
