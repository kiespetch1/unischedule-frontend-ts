import { ApiErrorType } from "./api-error-schema";

export class ApiError extends Error {
  readonly response: Response | null;
  readonly data: ApiErrorType | null;

  constructor(response: Response | null, data: ApiErrorType | null = null) {
    super("API Error with status code: " + (response?.status ?? "unknown"));
    this.name = "ApiError";
    this.response = response;
    this.data = data;
  }
}
