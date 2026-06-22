import type { HangarClientCore } from '../core.js';

/** Server health report. */
export interface HealthReport {
  missingFiles: unknown[];
  erroredJobs: unknown[];
  staleProjects: unknown[];
}

/** Internal API namespace for server health. */
export class InternalHealthApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Returns the current server health report. */
  get(): Promise<HealthReport> {
    return this.core.requestJson<HealthReport>('internal/health/');
  }

  /** Queues a health check job. */
  queue(): Promise<void> {
    return this.core.requestVoid('internal/health/queue', { method: 'POST', body: {} });
  }

  /** Retries a failed background job. */
  retryJob(jobId: number): Promise<void> {
    return this.core.requestVoid(`internal/health/retry/${jobId}`, { method: 'POST', body: {} });
  }
}
