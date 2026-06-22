import type { HangarClientCore } from '../core.js';

/** A site-wide announcement banner. */
export interface Announcement {
  text: string;
  color: string;
}

/** A global notification shown to all users. */
export interface GlobalNotification {
  message: string;
  color: string;
}

/** Combined global data including announcements and notifications. */
export interface GlobalData {
  announcements: Announcement[];
  notifications: GlobalNotification[];
}

/** Internal API namespace for global site data. */
export class InternalGlobalDataApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Returns all global data including announcements and notifications. */
  getGlobalData(): Promise<GlobalData> {
    return this.core.requestJson<GlobalData>('internal/globalData/');
  }

  /** Returns all active announcements. */
  getAnnouncements(): Promise<Announcement[]> {
    return this.core.requestJson<Announcement[]>('internal/globalData/announcements');
  }

  /** Replaces the list of active announcements. */
  updateAnnouncements(announcements: Announcement[]): Promise<void> {
    return this.core.requestVoid('internal/globalData/announcements', {
      method: 'POST',
      body: announcements,
    });
  }

  /** Returns all active global notifications. */
  getGlobalNotifications(): Promise<GlobalNotification[]> {
    return this.core.requestJson<GlobalNotification[]>('internal/globalData/notifications');
  }

  /** Replaces the list of active global notifications. */
  updateGlobalNotifications(notifications: GlobalNotification[]): Promise<void> {
    return this.core.requestVoid('internal/globalData/notifications', {
      method: 'POST',
      body: notifications,
    });
  }

  /** Updates the available platform versions. */
  updatePlatformVersions(versions: Record<string, string[]>): Promise<void> {
    return this.core.requestVoid('internal/globalData/platformVersions', {
      method: 'POST',
      body: versions,
    });
  }
}
