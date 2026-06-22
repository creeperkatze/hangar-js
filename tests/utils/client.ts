import { HangarClient } from '../../src/client/hangar.js';
import { createMockFetch } from './http.js';

export function createTestClient(responses: Response[] = []) {
  const mockFetch = createMockFetch(responses);
  const client = new HangarClient({
    baseUrl: 'https://hangar.papermc.io',
    apiKey: 'test-api-key',
    fetch: mockFetch as unknown as typeof fetch,
  });
  return { client, mockFetch };
}
