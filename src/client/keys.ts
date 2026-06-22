import type { HangarClientCore } from './core.js';
import type { ApiKey, CreateApiKeyForm } from '../types/index.js';

export class KeysApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Lists all API keys for the currently authenticated user. */
  list(user: string): Promise<ApiKey[]> {
    return this.core.requestJson<ApiKey[]>(`v1/keys/${encodeURIComponent(user)}`, { authenticated: true });
  }

  /** Creates a new API key for the currently authenticated user. */
  create(user: string, form: CreateApiKeyForm): Promise<string> {
    return this.core.requestJson<string>(`v1/keys/${encodeURIComponent(user)}`, {
      method: 'POST',
      body: form,
      authenticated: true,
    });
  }

  /** Deletes an API key by name for the currently authenticated user. */
  delete(user: string, name: string): Promise<void> {
    return this.core.requestVoid(`v1/keys/${encodeURIComponent(user)}`, {
      method: 'DELETE',
      query: { name },
      authenticated: true,
    });
  }
}
