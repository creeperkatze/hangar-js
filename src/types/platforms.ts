/** A server platform supported by Hangar. */
export type Platform = 'PAPER' | 'WATERFALL' | 'VELOCITY';

/** Broad category a platform belongs to. */
export type PlatformCategory = 'Server' | 'Proxy';

/** A platform version with its sub-versions. */
export interface PlatformVersion {
  version: string;
  subVersions: string[];
}
