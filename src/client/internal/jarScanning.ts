import type { HangarClientCore } from '../core.js';
import type { Platform } from '../../types/index.js';

export interface JarScanResult {
  platform: Platform;
  highestSeverity: string;
  entries: JarScanEntry[];
}

export interface JarScanEntry {
  location: string;
  description: string;
  severity: string;
}

export class InternalJarScanningApi {
  constructor(private readonly core: HangarClientCore) {}

  getResults(versionId: number): Promise<Record<string, JarScanResult>> {
    return this.core.requestJson<Record<string, JarScanResult>>(
      `internal/jarscanning/result/${versionId}`,
    );
  }

  getResult(versionId: number, platform: Platform | string): Promise<JarScanResult> {
    return this.core.requestJson<JarScanResult>(
      `internal/jarscanning/result/${versionId}/${encodeURIComponent(platform)}`,
    );
  }

  scan(versionId: number, platform: Platform | string): Promise<void> {
    return this.core.requestVoid(
      `internal/jarscanning/scan/${versionId}/${encodeURIComponent(platform)}`,
      { method: 'POST', body: {} },
    );
  }
}
