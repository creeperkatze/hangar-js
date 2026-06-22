import type { HangarClientCore } from '../core.js';
import type { Platform } from '../../types/index.js';

/** Jar scan result for a specific platform. */
export interface JarScanResult {
  platform: Platform;
  highestSeverity: string;
  entries: JarScanEntry[];
}

/** An individual entry from a jar scan. */
export interface JarScanEntry {
  location: string;
  description: string;
  severity: string;
}

/** Internal API namespace for jar scanning. */
export class InternalJarScanningApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Returns scan results for all platforms of a version. */
  getResults(versionId: number): Promise<Record<string, JarScanResult>> {
    return this.core.requestJson<Record<string, JarScanResult>>(
      `internal/jarscanning/result/${versionId}`,
    );
  }

  /** Returns the scan result for a specific platform of a version. */
  getResult(versionId: number, platform: Platform | string): Promise<JarScanResult> {
    return this.core.requestJson<JarScanResult>(
      `internal/jarscanning/result/${versionId}/${encodeURIComponent(platform)}`,
    );
  }

  /** Triggers a jar scan for a specific platform of a version. */
  scan(versionId: number, platform: Platform | string): Promise<void> {
    return this.core.requestVoid(
      `internal/jarscanning/scan/${versionId}/${encodeURIComponent(platform)}`,
      { method: 'POST', body: {} },
    );
  }
}
