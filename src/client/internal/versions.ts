import type { HangarClientCore } from '../core.js';
import type { Platform } from '../../types/index.js';

export interface SaveDescriptionForm {
  content: string;
}

export interface SavePlatformVersionsForm {
  platformVersions: Record<string, string[]>;
}

export interface PluginDependencyForm {
  name: string;
  required: boolean;
  externalUrl?: string;
}

export interface SavePluginDependenciesForm {
  pluginDependencies: Record<string, PluginDependencyForm[]>;
}

export class InternalVersionsApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Creates a version from an external URL (no file upload). */
  createFromUrl(projectId: number, data: object): Promise<void> {
    return this.core.requestVoid(`internal/versions/version/${projectId}/create`, {
      method: 'POST',
      body: data,
    });
  }

  /** Uploads a version file. */
  upload(projectId: number, files: File[], data: object): Promise<void> {
    const form = new FormData();
    form.set('versionUpload', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    for (const file of files) {
      form.append('files', file);
    }
    return this.core.requestVoid(`internal/versions/version/${projectId}/upload`, {
      method: 'POST',
      body: form,
    });
  }

  softDelete(projectId: number, versionId: number, comment: string): Promise<void> {
    return this.core.requestVoid(
      `internal/versions/version/${projectId}/${versionId}/delete`,
      { method: 'POST', body: { content: comment } },
    );
  }

  hardDelete(projectId: number, versionId: number, comment: string): Promise<void> {
    return this.core.requestVoid(
      `internal/versions/version/${projectId}/${versionId}/hardDelete`,
      { method: 'POST', body: { content: comment } },
    );
  }

  setPinned(projectId: number, versionId: number, pinned: boolean): Promise<void> {
    return this.core.requestVoid(
      `internal/versions/version/${projectId}/${versionId}/pinned`,
      { method: 'POST', query: { pinned } },
    );
  }

  restore(projectId: number, versionId: number): Promise<void> {
    return this.core.requestVoid(
      `internal/versions/version/${projectId}/${versionId}/restore`,
      { method: 'POST', body: {} },
    );
  }

  saveDescription(projectId: number, versionId: number, form: SaveDescriptionForm): Promise<void> {
    return this.core.requestVoid(
      `internal/versions/version/${projectId}/${versionId}/saveDescription`,
      { method: 'POST', body: form },
    );
  }

  savePlatformVersions(projectId: number, versionId: number, form: SavePlatformVersionsForm): Promise<void> {
    return this.core.requestVoid(
      `internal/versions/version/${projectId}/${versionId}/savePlatformVersions`,
      { method: 'POST', body: form },
    );
  }

  savePluginDependencies(projectId: number, versionId: number, form: SavePluginDependenciesForm): Promise<void> {
    return this.core.requestVoid(
      `internal/versions/version/${projectId}/${versionId}/savePluginDependencies`,
      { method: 'POST', body: form },
    );
  }

  download(project: string, version: string, platform: Platform | string): Promise<ArrayBuffer> {
    return this.core.requestArrayBuffer(
      `internal/versions/version/${encodeURIComponent(project)}/versions/${encodeURIComponent(version)}/${encodeURIComponent(platform)}/download`,
    );
  }

  trackDownload(versionId: number, platform: Platform | string): Promise<void> {
    return this.core.requestVoid(
      `internal/versions/version/${versionId}/${encodeURIComponent(platform)}/track`,
    );
  }
}
