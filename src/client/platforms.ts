import type { HangarClientCore } from './core.js';
import type { Platform, PlatformVersion } from '../types/index.js';

/** API namespace for platform data. */
export class PlatformsApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Returns all supported platforms and their data. */
  list(): Promise<Record<Platform, PlatformVersion[]>> {
    return this.core.requestJson<Record<Platform, PlatformVersion[]>>('v1/platforms');
  }

  /** Returns all supported versions for a specific platform. */
  getVersions(platform: Platform | string): Promise<PlatformVersion[]> {
    return this.core.requestJson<PlatformVersion[]>(
      `v1/platforms/${encodeURIComponent(platform)}`,
    );
  }
}
