import type { HangarClientCore } from './core.js';
import type {
  UserPermissions,
  PermissionCheck,
  PermissionsOptions,
  HasPermissionsOptions,
} from '../types/index.js';

/** API namespace for permission checks. */
export class PermissionsApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Returns the current user's permissions in the given context. */
  get(options?: PermissionsOptions): Promise<UserPermissions> {
    return this.core.requestJson<UserPermissions>('v1/permissions', {
      query: options,
      authenticated: true,
    });
  }

  /** Returns whether the current user has ALL of the given permissions. */
  hasAll(options: HasPermissionsOptions): Promise<PermissionCheck> {
    return this.core.requestJson<PermissionCheck>('v1/permissions/hasAll', {
      query: options,
      authenticated: true,
    });
  }

  /** Returns whether the current user has ANY of the given permissions. */
  hasAny(options: HasPermissionsOptions): Promise<PermissionCheck> {
    return this.core.requestJson<PermissionCheck>('v1/permissions/hasAny', {
      query: options,
      authenticated: true,
    });
  }
}
