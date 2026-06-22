import type { HangarClientCore } from '../core.js';

/** A project wiki page. */
export interface ProjectPage {
  id: number;
  name: string;
  slug: string;
  home: boolean;
  children: ProjectPage[];
  deletable: boolean;
}

export interface CreatePageForm {
  name: string;
  parentId?: number;
}

export interface SavePageForm {
  content: string;
}

export class InternalPagesApi {
  constructor(private readonly core: HangarClientCore) {}

  checkName(projectId: number, name: string, parentId?: number): Promise<void> {
    return this.core.requestVoid('internal/pages/checkName', {
      query: { projectId, name, parentId },
    });
  }

  convertBBCode(content: string): Promise<string> {
    return this.core.requestText('internal/pages/convert-bbcode', {
      method: 'POST',
      body: { content },
    });
  }

  createPage(projectId: number, form: CreatePageForm): Promise<void> {
    return this.core.requestVoid(`internal/pages/create/${projectId}`, {
      method: 'POST',
      body: form,
    });
  }

  deletePage(projectId: number, pageId: number): Promise<void> {
    return this.core.requestVoid(`internal/pages/delete/${projectId}/${pageId}`, {
      method: 'POST',
      body: {},
    });
  }

  listPages(projectId: number): Promise<ProjectPage[]> {
    return this.core.requestJson<ProjectPage[]>(`internal/pages/list/${projectId}`);
  }

  getPage(project: string, path: string): Promise<string> {
    return this.core.requestText(
      `internal/pages/page/${encodeURIComponent(project)}/${path.replace(/^\/+/, '')}`,
    );
  }

  savePage(projectId: number, pageId: number, form: SavePageForm): Promise<void> {
    return this.core.requestVoid(`internal/pages/save/${projectId}/${pageId}`, {
      method: 'POST',
      body: form,
    });
  }
}
