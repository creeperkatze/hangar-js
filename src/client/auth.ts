import type { HangarClientCore } from './core.js';
import type { ApiSession } from '../types/index.js';

/** API namespace for authentication. */
export class AuthApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Authenticates with the given API key and returns a short-lived JWT. */
  authenticate(apiKey: string): Promise<ApiSession> {
    return this.core.requestJson<ApiSession>('v1/authenticate', {
      method: 'POST',
      query: { apiKey },
    });
  }
}
