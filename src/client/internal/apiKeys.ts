import type { HangarClientCore } from '../core.js';
import type { ApiKey, NamedPermission } from '../../types/index.js';

export interface CreateAPIKeyForm {
  name: string;
  permissions: NamedPermission[];
}

export interface StringContent {
  content: string;
}

export class InternalApiKeysApi {
  constructor(private readonly core: HangarClientCore) {}

  checkKeyName(user: string, name: string): Promise<void> {
    return this.core.requestVoid(
      `internal/api-keys/check-key/${encodeURIComponent(user)}`,
      { query: { name } },
    );
  }

  createApiKey(user: string, form: CreateAPIKeyForm): Promise<string> {
    return this.core.requestText(
      `internal/api-keys/create-key/${encodeURIComponent(user)}`,
      { method: 'POST', body: form },
    );
  }

  deleteApiKey(user: string, content: StringContent): Promise<void> {
    return this.core.requestVoid(
      `internal/api-keys/delete-key/${encodeURIComponent(user)}`,
      { method: 'POST', body: content },
    );
  }

  getApiKeys(user: string): Promise<ApiKey[]> {
    return this.core.requestJson<ApiKey[]>(
      `internal/api-keys/existing-keys/${encodeURIComponent(user)}`,
    );
  }

  getPossiblePermissions(user: string): Promise<NamedPermission[]> {
    return this.core.requestJson<NamedPermission[]>(
      `internal/api-keys/possible-perms/${encodeURIComponent(user)}`,
    );
  }
}
