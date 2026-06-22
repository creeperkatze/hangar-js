import type { HangarClientCore } from '../core.js';
import type { FlagReason } from '../../types/index.js';

export interface FlagForm {
  projectId: number;
  reason: FlagReason;
  comment: string;
}

export interface Flag {
  id: number;
  projectId: number;
  reportedBy: string;
  reason: FlagReason;
  comment: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface FlagNotification {
  id: number;
  message: string;
  createdAt: string;
}

export class InternalFlagsApi {
  constructor(private readonly core: HangarClientCore) {}

  flag(form: FlagForm): Promise<void> {
    return this.core.requestVoid('internal/flags/', { method: 'POST', body: form });
  }

  getResolvedFlags(): Promise<Flag[]> {
    return this.core.requestJson<Flag[]>('internal/flags/resolved');
  }

  getUnresolvedFlags(): Promise<Flag[]> {
    return this.core.requestJson<Flag[]>('internal/flags/unresolved');
  }

  getUnresolvedFlagsQueueSize(): Promise<number> {
    return this.core.requestJson<number>('internal/flags/unresolvedamount');
  }

  getNotifications(id: number): Promise<FlagNotification[]> {
    return this.core.requestJson<FlagNotification[]>(`internal/flags/${id}/notifications`);
  }

  notifyReportParty(id: number, message: string): Promise<void> {
    return this.core.requestVoid(`internal/flags/${id}/notify`, {
      method: 'POST',
      body: { content: message },
    });
  }

  resolve(id: number, resolved: boolean): Promise<void> {
    return this.core.requestVoid(`internal/flags/${id}/resolve/${resolved}`, { method: 'POST', body: {} });
  }

  getFlags(slug: string): Promise<Flag[]> {
    return this.core.requestJson<Flag[]>(`internal/flags/${encodeURIComponent(slug)}`);
  }
}
