import type { NamedPermission } from './permissions.js';

/** An API key registered for a user. */
export interface ApiKey {
  name: string;
  createdAt: string;
  lastUsed?: string;
  tokenIdentifier: string;
  permissions: NamedPermission[];
}

/** Request body for creating a new API key. */
export interface CreateApiKeyForm {
  name: string;
  permissions: NamedPermission[];
}
