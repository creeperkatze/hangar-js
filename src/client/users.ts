import type { HangarClientCore } from './core.js';
import type { User, GetUsersOptions, GetAuthorsOptions, GetStaffOptions } from '../types/index.js';
import type { PaginatedResult } from '../types/base.js';

/** API namespace for users. */
export class UsersApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Returns a single user by name. */
  get(user: string): Promise<User> {
    return this.core.requestJson<User>(`v1/users/${encodeURIComponent(user)}`);
  }

  /** Returns a paginated list of all users. */
  list(options?: GetUsersOptions): Promise<PaginatedResult<User>> {
    return this.core.requestJson<PaginatedResult<User>>('v1/users', { query: options });
  }

  /** Returns a paginated list of users who have published at least one project. */
  listAuthors(options?: GetAuthorsOptions): Promise<PaginatedResult<User>> {
    return this.core.requestJson<PaginatedResult<User>>('v1/authors', { query: options });
  }

  /** Returns a paginated list of staff members. */
  listStaff(options?: GetStaffOptions): Promise<PaginatedResult<User>> {
    return this.core.requestJson<PaginatedResult<User>>('v1/staff', { query: options });
  }
}
