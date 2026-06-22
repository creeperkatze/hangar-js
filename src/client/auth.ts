import type { HangarClientCore } from './core.js';
import type { ApiSession } from '../types/index.js';

export class AuthApi {
  constructor(private readonly core: HangarClientCore) {}

  /**
   * Authenticates with the given API key and returns a short-lived JWT.
   *
   * You normally don't need to call this directly — the client caches and
   * refreshes tokens automatically when `apiKey` is provided.
   */
  authenticate(apiKey: string): Promise<ApiSession> {
    return this.core.requestJson<ApiSession>('v1/authenticate', {
      method: 'POST',
      query: { apiKey },
    });
  }
}
