import type { Platform } from './platforms.js';
import type { Visibility, ProjectChannel } from './projects.js';
import type { PaginationOptions } from './base.js';
import type { NamedPermission } from './permissions.js';

/** Review state of a version. */
export type ReviewState = 'unreviewed' | 'reviewed' | 'under_review' | 'partially_reviewed';

/** Pin state of a version. */
export type PinnedStatus = 'NONE' | 'VERSION' | 'CHANNEL';

/** File metadata for a version download. */
export interface FileInfo {
  name: string;
  sha256Hash: string;
  sizeBytes: number;
}

/** Download information for a version on a specific platform. */
export interface PlatformVersionDownload {
  fileInfo?: FileInfo;
  externalUrl?: string;
  downloadUrl?: string;
}

/** A plugin dependency for a specific platform. */
export interface PluginDependency {
  name: string;
  projectId: number;
  required: boolean;
  platform: Platform;
  externalUrl?: string;
}

/** Download statistics for a version. */
export interface VersionStats {
  totalDownloads: number;
  platformDownloads: Record<string, number>;
}

/** A full version object. */
export interface Version {
  id: number;
  name: string;
  description: string;
  author: string;
  projectId: number;
  createdAt: string;
  channel: ProjectChannel;
  visibility: Visibility;
  reviewState: ReviewState;
  pinnedStatus: PinnedStatus;
  memberNames: string[];
  stats: VersionStats;
  downloads: Record<string, PlatformVersionDownload>;
  platformDependencies: Record<string, string[]>;
  platformDependenciesFormatted: Record<string, string[]>;
  pluginDependencies: Record<string, PluginDependency[]>;
}

/** Metadata returned after uploading a version. */
export interface UploadedVersion {
  url: string;
}

/** Platform and version details for a version upload. */
export interface VersionUploadPlatform {
  platform: Platform;
  versions: string[];
}

/** Plugin dependency entry in an upload form. */
export interface VersionUploadDependency {
  name: string;
  required: boolean;
  externalUrl?: string;
  platform: Platform;
}

/** Channel definition in an upload form. */
export interface VersionUploadChannel {
  name: string;
  description?: string;
  color: string;
  flags?: string[];
}

/** Request body sent as the JSON part of a version upload multipart request. */
export interface VersionUpload {
  description?: string;
  files?: VersionUploadFile[];
  channel: VersionUploadChannel;
  platformDependencies: Record<string, string[]>;
  pluginDependencies: Record<string, VersionUploadDependency[]>;
}

/** A file entry in a version upload (URL or placeholder for binary). */
export interface VersionUploadFile {
  platforms: Platform[];
  externalUrl?: string;
}

/** Request body for the create-API-key form. */
export interface CreateApiKeyBody {
  name: string;
  permissions: NamedPermission[];
}

/** Query parameters for listing versions. */
export interface ListVersionsOptions extends PaginationOptions {
  includeHiddenChannels?: boolean;
  channel?: string;
  platform?: Platform | string;
  platformVersion?: string;
}

/** Query parameters for fetching version stats. */
export interface GetVersionStatsOptions {
  fromDate: string;
  toDate: string;
}
