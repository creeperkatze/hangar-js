import type { HangarClientCore } from '../core.js';

export interface HealthReport {
  missingFiles: unknown[];
  erroredJobs: unknown[];
  staleProjects: unknown[];
}

export class InternalHealthApi {
  constructor(private readonly core: HangarClientCore) {}

  get(): Promise<HealthReport> {
    return this.core.requestJson<HealthReport>('internal/health/');
  }

  queue(): Promise<void> {
    return this.core.requestVoid('internal/health/queue', { method: 'POST', body: {} });
  }

  retryJob(jobId: number): Promise<void> {
    return this.core.requestVoid(`internal/health/retry/${jobId}`, { method: 'POST', body: {} });
  }
}
