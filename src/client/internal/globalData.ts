import type { HangarClientCore } from '../core.js';

export interface Announcement {
  text: string;
  color: string;
}

export interface GlobalNotification {
  message: string;
  color: string;
}

export interface GlobalData {
  announcements: Announcement[];
  notifications: GlobalNotification[];
}

export class InternalGlobalDataApi {
  constructor(private readonly core: HangarClientCore) {}

  getGlobalData(): Promise<GlobalData> {
    return this.core.requestJson<GlobalData>('internal/globalData/');
  }

  getAnnouncements(): Promise<Announcement[]> {
    return this.core.requestJson<Announcement[]>('internal/globalData/announcements');
  }

  updateAnnouncements(announcements: Announcement[]): Promise<void> {
    return this.core.requestVoid('internal/globalData/announcements', {
      method: 'POST',
      body: announcements,
    });
  }

  getGlobalNotifications(): Promise<GlobalNotification[]> {
    return this.core.requestJson<GlobalNotification[]>('internal/globalData/notifications');
  }

  updateGlobalNotifications(notifications: GlobalNotification[]): Promise<void> {
    return this.core.requestVoid('internal/globalData/notifications', {
      method: 'POST',
      body: notifications,
    });
  }

  updatePlatformVersions(versions: Record<string, string[]>): Promise<void> {
    return this.core.requestVoid('internal/globalData/platformVersions', {
      method: 'POST',
      body: versions,
    });
  }
}
