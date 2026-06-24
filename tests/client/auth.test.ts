import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { ApiSession } from '../../src/types/index.js';

const MOCK_SESSION: ApiSession = { token: 'eyJhbGciOiJIUzI1NiJ9.test', expiresIn: 3_600_000 };

describe('AuthApi', () => {
  it('returns a session for the given API key', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_SESSION)]);
    const session = await client.auth.authenticate('my-api-key');
    expect(session).toEqual(MOCK_SESSION);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/authenticate');
    expect(mockFetch.lastCall()?.url).toContain('apiKey=my-api-key');
  });

  it('sends a POST request', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_SESSION)]);
    await client.auth.authenticate('my-api-key');
    expect(mockFetch.lastCall()?.method).toBe('POST');
  });

  it('does not attach an Authorization header', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_SESSION)]);
    await client.auth.authenticate('my-api-key');
    expect(mockFetch.lastCall()?.headers.get('Authorization')).toBeNull();
  });
});
