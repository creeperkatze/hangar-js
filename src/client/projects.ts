import type { HangarClientCore } from './core.js';
import type {
  Project,
  ProjectCompact,
  ProjectMember,
  ProjectChannel,
  DayProjectStats,
  GetProjectsOptions,
  GetProjectStatsOptions,
} from '../types/index.js';
import type { PaginatedResult } from '../types/base.js';

export class ProjectsApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Returns a paginated list of projects matching the given filters. */
  list(options?: GetProjectsOptions): Promise<PaginatedResult<Project>> {
    return this.core.requestJson<PaginatedResult<Project>>('v1/projects', { query: options });
  }

  /** Returns a single project by its author and slug. */
  get(author: string, slug: string): Promise<Project> {
    return this.core.requestJson<Project>(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}`,
    );
  }

  /**
   * Returns daily view/download stats for a project between two dates.
   * Dates must be in `YYYY-MM-DD` format.
   */
  getStats(author: string, slug: string, options: GetProjectStatsOptions): Promise<Record<string, DayProjectStats>> {
    return this.core.requestJson<Record<string, DayProjectStats>>(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/stats`,
      { query: options },
    );
  }

  /** Returns all members of a project. */
  getMembers(author: string, slug: string): Promise<ProjectMember[]> {
    return this.core.requestJson<ProjectMember[]>(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/members`,
    );
  }

  /** Returns the release channels for a project. */
  getChannels(author: string, slug: string): Promise<ProjectChannel[]> {
    return this.core.requestJson<ProjectChannel[]>(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/channels`,
    );
  }

  /** Returns projects pinned/starred by the given user. */
  getPinned(user: string): Promise<ProjectCompact[]> {
    return this.core.requestJson<ProjectCompact[]>(
      `v1/projects/${encodeURIComponent(user)}/pinned`,
    );
  }

  /** Returns projects starred by the given user (paginated). */
  getStarred(user: string, options?: GetProjectsOptions): Promise<PaginatedResult<ProjectCompact>> {
    return this.core.requestJson<PaginatedResult<ProjectCompact>>(
      `v1/projects/${encodeURIComponent(user)}/starred`,
      { query: options },
    );
  }

  /** Returns projects watched by the given user (paginated). */
  getWatching(user: string, options?: GetProjectsOptions): Promise<PaginatedResult<ProjectCompact>> {
    return this.core.requestJson<PaginatedResult<ProjectCompact>>(
      `v1/projects/${encodeURIComponent(user)}/watching`,
      { query: options },
    );
  }
}
