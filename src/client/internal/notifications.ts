import type { HangarClientCore } from '../core.js';

export interface HangarNotification {
  id: number;
  createdAt: string;
  action: string;
  message: string[];
  read: boolean;
  originUserId?: number;
  type: string;
}

export interface ProjectInvite {
  id: number;
  role: string;
  name: string;
  url: string;
  representingOrg?: string;
  type: 'project' | 'organization';
}

export class InternalNotificationsApi {
  constructor(private readonly core: HangarClientCore) {}

  getInvites(): Promise<{ project: ProjectInvite[]; organization: ProjectInvite[] }> {
    return this.core.requestJson('internal/invites');
  }

  updateOrganizationInviteStatus(id: number, status: string): Promise<void> {
    return this.core.requestVoid(
      `internal/invites/organization/${id}/${encodeURIComponent(status)}`,
      { method: 'POST', body: {} },
    );
  }

  updateProjectInviteStatus(id: number, status: string): Promise<void> {
    return this.core.requestVoid(
      `internal/invites/project/${id}/${encodeURIComponent(status)}`,
      { method: 'POST', body: {} },
    );
  }

  markAllRead(): Promise<void> {
    return this.core.requestVoid('internal/markallread', { method: 'POST', body: {} });
  }

  getNotifications(): Promise<HangarNotification[]> {
    return this.core.requestJson<HangarNotification[]>('internal/notifications');
  }

  markNotificationAsRead(id: number): Promise<void> {
    return this.core.requestVoid(`internal/notifications/${id}`, { method: 'POST', body: {} });
  }

  readPrompt(prompt: string): Promise<void> {
    return this.core.requestVoid(
      `internal/read-prompt/${encodeURIComponent(prompt)}`,
      { method: 'POST', body: {} },
    );
  }

  getReadNotifications(): Promise<HangarNotification[]> {
    return this.core.requestJson<HangarNotification[]>('internal/readnotifications');
  }

  getRecentNotifications(): Promise<HangarNotification[]> {
    return this.core.requestJson<HangarNotification[]>('internal/recentnotifications');
  }

  getUnreadCount(): Promise<number> {
    return this.core.requestJson<number>('internal/unreadcount');
  }

  getUnreadNotifications(): Promise<HangarNotification[]> {
    return this.core.requestJson<HangarNotification[]>('internal/unreadnotifications');
  }
}
