/** A value that can be serialized as a URL query parameter. */
export type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;

/** Pagination metadata included in paginated responses. */
export interface Pagination {
  offset: number;
  limit: number;
  count: number;
}

/** Wrapper for paginated API results. */
export interface PaginatedResult<T> {
  pagination: Pagination;
  result: T[];
}

/** Common query parameters for paginated endpoints. */
export interface PaginationOptions {
  /** Maximum number of items to return (1–25). */
  limit?: number | string;
  /** Offset to start searching from. */
  offset?: number | string;
}

/**
 * Options for creating a {@link HangarClient}.
 */
export interface HangarClientOptions {
  /**
   * Base URL of the Hangar instance.
   *
   * @defaultValue "https://hangar.papermc.io"
   */
  baseUrl?: string;
  /**
   * API key used to obtain a JWT for authenticated requests.
   */
  apiKey?: string;
  /**
   * Request timeout in milliseconds.
   *
   * @defaultValue 10000
   */
  timeoutMs?: number;
  /**
   * Value to send as the `User-Agent` header on every request.
   */
  userAgent?: string;
  /**
   * Custom fetch implementation.
   */
  fetch?: typeof globalThis.fetch;
}
