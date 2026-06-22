import type { QueryValue } from '../types/index.js';

/** Strips trailing slashes and a trailing `/api` segment if present. */
export function normalizeBaseUrl(baseUrl: string): string {
  if (!baseUrl || typeof baseUrl !== 'string') {
    throw new TypeError('baseUrl must be a non-empty string');
  }

  const url = new URL(baseUrl);
  const pathname = url.pathname.replace(/\/+$/, '');
  url.pathname = pathname.endsWith('/api') ? pathname.slice(0, -4) || '/' : pathname || '/';
  return url.toString().replace(/\/$/, '');
}

/** Appends query parameters to a URL, skipping null and undefined values. */
export function appendQuery(url: URL, query?: object): URL {
  if (!query) return url;

  for (const [key, rawValue] of Object.entries(query as Record<string, QueryValue>)) {
    if (rawValue == null) continue;

    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    for (const value of values) {
      if (value == null) continue;
      url.searchParams.append(key, String(value));
    }
  }

  return url;
}

/** Constructs the full API URL for a given path and optional query parameters. */
export function buildApiUrl(baseUrl: string, path: string, query?: object): string {
  const trimmedPath = path.replace(/^\/+/, '');
  const url = new URL(`${baseUrl}/api/${trimmedPath}`);
  return appendQuery(url, query).toString();
}

/** Returns true if the value is a plain object (not an array, FormData, or Blob). */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof FormData) &&
    !(value instanceof Blob)
  );
}

/** Returns true if the value can be used directly as a fetch request body. */
export function isRawBody(value: unknown): value is BodyInit {
  return (
    typeof value === 'string' ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof Blob ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value)
  );
}

/** Serializes a plain object body as JSON and sets Content-Type if not already set. */
export function withJsonBody(
  init: Omit<RequestInit, 'body'> & { body?: BodyInit | object | object[] | null },
): RequestInit {
  const { body, headers, ...rest } = init;
  const resolvedHeaders = new Headers(headers);

  if (body == null) {
    return { ...rest, headers: resolvedHeaders };
  }

  if (isRawBody(body)) {
    return { ...rest, headers: resolvedHeaders, body };
  }

  if (!resolvedHeaders.has('Content-Type')) {
    resolvedHeaders.set('Content-Type', 'application/json');
  }

  return {
    ...rest,
    headers: resolvedHeaders,
    body: JSON.stringify(body),
  };
}

/** Extracts a human-readable message from an API error response body. */
export function extractErrorMessage(body: unknown, status: number): string {
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    const message = record['message'];
    if (typeof message === 'string' && message.length > 0) return message;
  }

  return `HTTP ${status}`;
}

/** Attempts to parse the error response body as JSON, falling back to text. */
export async function parseErrorBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json().catch(() => null);
  }
  return response.text().catch(() => null);
}
