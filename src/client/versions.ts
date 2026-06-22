import type { HangarClientCore } from './core.js';
import type {
  Version,
  VersionUpload,
  DayProjectStats,
  ListVersionsOptions,
  GetVersionStatsOptions,
} from '../types/index.js';
import type { PaginatedResult } from '../types/base.js';

export class VersionsApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Returns all versions for a project (paginated). */
  list(
    author: string,
    slug: string,
    options?: ListVersionsOptions,
  ): Promise<PaginatedResult<Version>> {
    return this.core.requestJson<PaginatedResult<Version>>(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/versions`,
      { query: options },
    );
  }

  /** Returns a single version by name. */
  get(author: string, slug: string, name: string): Promise<Version> {
    return this.core.requestJson<Version>(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/versions/${encodeURIComponent(name)}`,
    );
  }

  /**
   * Uploads a new version.
   *
   * The `files` parameter should be a `FormData` or `Blob` array representing
   * the multipart upload (one entry per platform). The `data` parameter maps
   * to the JSON part of the multipart request.
   *
   * Requires `create_version` permission.
   */
  create(
    author: string,
    slug: string,
    data: VersionUpload,
    files?: File[],
  ): Promise<void> {
    const form = new FormData();
    form.set('versionUpload', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (files) {
      for (const file of files) {
        form.append('files', file);
      }
    }
    return this.core.requestVoid(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/versions`,
      { method: 'POST', body: form, authenticated: true },
    );
  }

  /** Deletes a version. Requires `delete_version` permission. */
  delete(author: string, slug: string, name: string): Promise<void> {
    return this.core.requestVoid(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/versions/${encodeURIComponent(name)}`,
      { method: 'DELETE', authenticated: true },
    );
  }

  /** Restores a soft-deleted version. Requires `restore_version` permission. */
  restore(author: string, slug: string, name: string): Promise<void> {
    return this.core.requestVoid(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/versions/${encodeURIComponent(name)}/restore`,
      { method: 'POST', authenticated: true },
    );
  }

  /**
   * Returns daily download stats for a version between two dates.
   * Dates must be in `YYYY-MM-DD` format.
   */
  getStats(
    author: string,
    slug: string,
    name: string,
    options: GetVersionStatsOptions,
  ): Promise<Record<string, DayProjectStats>> {
    return this.core.requestJson<Record<string, DayProjectStats>>(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/versions/${encodeURIComponent(name)}/stats`,
      { query: options },
    );
  }

  /** Returns the download URL for a version on a specific platform. */
  getDownloadUrl(
    author: string,
    slug: string,
    name: string,
    platform: string,
  ): Promise<string> {
    return this.core.requestText(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/versions/${encodeURIComponent(name)}/${encodeURIComponent(platform)}/download`,
    );
  }

  /** Downloads a version file as an ArrayBuffer. */
  download(
    author: string,
    slug: string,
    name: string,
    platform: string,
  ): Promise<ArrayBuffer> {
    return this.core.requestArrayBuffer(
      `v1/projects/${encodeURIComponent(author)}/${encodeURIComponent(slug)}/versions/${encodeURIComponent(name)}/${encodeURIComponent(platform)}/download`,
    );
  }
}
