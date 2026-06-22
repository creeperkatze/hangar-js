/**
 * Error thrown for request failures, authentication failures, timeouts, and Hangar API errors.
 */
export class HangarError extends Error {
  override name = 'HangarError' as const;
  status: number;
  response: Response | undefined;
  body: unknown;

  constructor(message: string, options: {
    status?: number;
    response?: Response;
    body?: unknown;
  } = {}) {
    super(message);
    this.status = options.status ?? 0;
    this.response = options.response;
    this.body = options.body;
  }
}
