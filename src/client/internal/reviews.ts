import type { HangarClientCore } from '../core.js';

/** A message within a version review. */
export interface ReviewMessage {
  message: string;
  args: Record<string, unknown>;
  createdAt: string;
  action: string;
}

export interface Review {
  id: number;
  versionId: number;
  reviewerId: number;
  reviewer: string;
  messages: ReviewMessage[];
  createdAt: string;
  endedAt?: string;
}

export interface AddMessageForm {
  message: string;
}

export class InternalReviewsApi {
  constructor(private readonly core: HangarClientCore) {}

  getVersionReviews(versionId: number): Promise<Review[]> {
    return this.core.requestJson<Review[]>(`internal/reviews/${versionId}/reviews`);
  }

  approve(versionId: number): Promise<void> {
    return this.core.requestVoid(`internal/reviews/${versionId}/reviews/approve`, {
      method: 'POST',
      body: {},
    });
  }

  approvePartial(versionId: number): Promise<void> {
    return this.core.requestVoid(`internal/reviews/${versionId}/reviews/approvePartial`, {
      method: 'POST',
      body: {},
    });
  }

  addMessage(versionId: number, form: AddMessageForm): Promise<void> {
    return this.core.requestVoid(`internal/reviews/${versionId}/reviews/message`, {
      method: 'POST',
      body: form,
    });
  }

  reopen(versionId: number): Promise<void> {
    return this.core.requestVoid(`internal/reviews/${versionId}/reviews/reopen`, {
      method: 'POST',
      body: {},
    });
  }

  start(versionId: number): Promise<void> {
    return this.core.requestVoid(`internal/reviews/${versionId}/reviews/start`, {
      method: 'POST',
      body: {},
    });
  }

  stop(versionId: number, form: AddMessageForm): Promise<void> {
    return this.core.requestVoid(`internal/reviews/${versionId}/reviews/stop`, {
      method: 'POST',
      body: form,
    });
  }

  undoApproval(versionId: number): Promise<void> {
    return this.core.requestVoid(`internal/reviews/${versionId}/reviews/undoApproval`, {
      method: 'POST',
      body: {},
    });
  }
}
