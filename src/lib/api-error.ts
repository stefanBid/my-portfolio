export class ApiError extends Error {
  readonly status: number;
  readonly cause?: unknown;

  constructor(status: number, message: string, cause?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.cause = cause;
  }
}
