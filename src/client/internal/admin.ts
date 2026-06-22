import type { HangarClientCore } from '../core.js';
import type { PaginatedResult } from '../../types/base.js';

export interface FlagActivity {
  createdAt: string;
  reportedBy: string;
  flagReason: string;
  comment: string;
}

export interface ReviewActivity {
  createdAt: string;
  reviewedBy: string;
}

export interface ProjectApprovals {
  needsApproval: unknown[];
  waitingProjects: unknown[];
}

export interface ReviewQueue {
  underReview: unknown[];
  waitingVersions: unknown[];
}

export interface DayStats {
  day: string;
  reviews: number;
  uploads: number;
  origDownloads: number;
  unsafeDownloads: number;
  openFlags: number;
  closedFlags: number;
}

export interface HangarLoggedAction {
  createdAt: string;
  userName: string;
  userAvatarUrl: string;
  project: unknown;
  version: unknown;
  page: unknown;
  subject: unknown;
  action: unknown;
  contextType: string;
  address: unknown;
}

export interface GetActionLogOptions {
  logAction?: string;
  pageId?: string;
  projectSlug?: string;
  authorName?: string;
  subjectName?: string;
  user?: string;
  platform?: string;
  versionString?: string;
  limit?: number | string;
  offset?: number | string;
}

export interface ChangeRoleForm {
  roleName: string;
  userId: number;
}

export interface StringContent {
  content: string;
}

export class InternalAdminApi {
  constructor(private readonly core: HangarClientCore) {}

  getFlagActivity(user: string): Promise<FlagActivity[]> {
    return this.core.requestJson<FlagActivity[]>(
      `internal/admin/activity/${encodeURIComponent(user)}/flags`,
    );
  }

  getReviewActivity(user: string): Promise<ReviewActivity[]> {
    return this.core.requestJson<ReviewActivity[]>(
      `internal/admin/activity/${encodeURIComponent(user)}/reviews`,
    );
  }

  getProjectApprovalQueueSize(): Promise<number> {
    return this.core.requestJson<number>('internal/admin/approval/projectneedingapproval');
  }

  getProjectApprovals(): Promise<ProjectApprovals> {
    return this.core.requestJson<ProjectApprovals>('internal/admin/approval/projects');
  }

  getReviewQueue(): Promise<ReviewQueue> {
    return this.core.requestJson<ReviewQueue>('internal/admin/approval/versions');
  }

  getVersionApprovalQueueSize(): Promise<number> {
    return this.core.requestJson<number>('internal/admin/approval/versionsneedingapproval');
  }

  fixAvatarUrls(force?: boolean): Promise<string> {
    return this.core.requestText('internal/admin/fixAvatars', {
      method: 'POST',
      query: force !== undefined ? { force } : undefined,
    });
  }

  setUserLock(user: string, locked: boolean, content: StringContent, toggleProjectDeletion?: boolean): Promise<void> {
    return this.core.requestVoid(
      `internal/admin/lock-user/${encodeURIComponent(user)}`,
      { method: 'POST', query: { locked, toggleProjectDeletion }, body: content },
    );
  }

  getActionLog(options?: GetActionLogOptions): Promise<PaginatedResult<HangarLoggedAction>> {
    return this.core.requestJson<PaginatedResult<HangarLoggedAction>>('internal/admin/log', {
      query: options,
    });
  }

  changeRoles(roles: ChangeRoleForm[]): Promise<void> {
    return this.core.requestVoid('internal/admin/roles', { method: 'POST', body: roles });
  }

  approveVersionsWithSafeLinks(): Promise<void> {
    return this.core.requestVoid('internal/admin/scanSafeLinks', { method: 'POST' });
  }

  getStats(from?: string, to?: string): Promise<DayStats[]> {
    return this.core.requestJson<DayStats[]>('internal/admin/stats', {
      query: { from, to },
    });
  }

  updateHashes(): Promise<string[]> {
    return this.core.requestJson<string[]>('internal/admin/updateHashes', { method: 'POST' });
  }

  removeRole(user: string, role: string): Promise<void> {
    return this.core.requestVoid(
      `internal/admin/user/${encodeURIComponent(user)}/${encodeURIComponent(role)}`,
      { method: 'DELETE' },
    );
  }

  addRole(user: string, role: string): Promise<void> {
    return this.core.requestVoid(
      `internal/admin/user/${encodeURIComponent(user)}/${encodeURIComponent(role)}`,
      { method: 'POST' },
    );
  }

  deleteUser(user: string, content: StringContent): Promise<void> {
    return this.core.requestVoid(
      `internal/admin/yeet/${encodeURIComponent(user)}`,
      { method: 'POST', body: content },
    );
  }
}
