import type { HangarClientCore } from '../core.js';
import type { Category, Visibility } from '../../types/index.js';

export interface CreateProjectForm {
  name: string;
  description: string;
  category: Category;
  pageContent: string;
  settings: unknown;
  ownerId: number;
}

export interface EditProjectMemberForm {
  role: string;
  name: string;
}

export interface TransferForm {
  to: string;
}

export interface RenameForm {
  content: string;
}

export interface ProjectNote {
  id: number;
  message: string;
  userName: string;
  createdAt: string;
}

export interface VisibilityChangeForm {
  comment: string;
  visibility: Visibility;
}

export interface PossibleOwner {
  id: number;
  name: string;
  avatarUrl: string;
}

export class InternalProjectsApi {
  constructor(private readonly core: HangarClientCore) {}

  create(form: CreateProjectForm): Promise<string> {
    return this.core.requestText('internal/projects/create', {
      method: 'POST',
      body: form,
    });
  }

  getPossibleOwners(): Promise<PossibleOwner[]> {
    return this.core.requestJson<PossibleOwner[]>('internal/projects/possibleOwners');
  }

  getRedirect(slugOrId: string): Promise<string> {
    return this.core.requestText(
      `internal/projects/project-redirect/${encodeURIComponent(slugOrId)}`,
    );
  }

  setStarred(id: number, state: boolean): Promise<void> {
    return this.core.requestVoid(`internal/projects/project/${id}/star/${state}`, {
      method: 'POST',
      body: {},
    });
  }

  setWatching(id: number, state: boolean): Promise<void> {
    return this.core.requestVoid(`internal/projects/project/${id}/watch/${state}`, {
      method: 'POST',
      body: {},
    });
  }

  softDelete(projectId: number, comment: string): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${projectId}/manage/delete`,
      { method: 'POST', body: { content: comment } },
    );
  }

  hardDelete(projectId: number, comment: string): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${projectId}/manage/hardDelete`,
      { method: 'POST', body: { content: comment } },
    );
  }

  get(slugOrId: string): Promise<unknown> {
    return this.core.requestJson(
      `internal/projects/project/${encodeURIComponent(slugOrId)}`,
    );
  }

  cancelTransfer(slugOrId: string): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/canceltransfer`,
      { method: 'POST', body: {} },
    );
  }

  addMember(slugOrId: string, form: EditProjectMemberForm): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/members/add`,
      { method: 'POST', body: form },
    );
  }

  editMember(slugOrId: string, form: EditProjectMemberForm): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/members/edit`,
      { method: 'POST', body: form },
    );
  }

  leaveProject(slugOrId: string): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/members/leave`,
      { method: 'POST', body: {} },
    );
  }

  removeMember(slugOrId: string, name: string): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/members/remove`,
      { method: 'POST', body: { name } },
    );
  }

  setPinnedStatus(slugOrId: string, state: boolean): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/pin/${state}`,
      { method: 'POST', body: {} },
    );
  }

  rename(slugOrId: string, form: RenameForm): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/rename`,
      { method: 'POST', body: form },
    );
  }

  resetIcon(slugOrId: string): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/resetIcon`,
      { method: 'POST', body: {} },
    );
  }

  saveIcon(slugOrId: string, icon: Blob): Promise<void> {
    const form = new FormData();
    form.set('projectIcon', icon);
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/saveIcon`,
      { method: 'POST', body: form },
    );
  }

  saveSettings(slugOrId: string, settings: object): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/settings`,
      { method: 'POST', body: settings },
    );
  }

  saveSponsors(slugOrId: string, content: string): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/sponsors`,
      { method: 'POST', body: { content } },
    );
  }

  transfer(slugOrId: string, form: TransferForm): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/project/${encodeURIComponent(slugOrId)}/transfer`,
      { method: 'POST', body: form },
    );
  }

  validateName(name: string, ownerId: number): Promise<void> {
    return this.core.requestVoid('internal/projects/validateName', { query: { name, ownerId } });
  }

  addNote(projectId: number, message: string): Promise<void> {
    return this.core.requestVoid(`internal/projects/notes/${projectId}`, {
      method: 'POST',
      body: { content: message },
    });
  }

  getNotes(slugOrId: string): Promise<ProjectNote[]> {
    return this.core.requestJson<ProjectNote[]>(
      `internal/projects/notes/${encodeURIComponent(slugOrId)}`,
    );
  }

  changeVisibility(projectId: number, form: VisibilityChangeForm): Promise<void> {
    return this.core.requestVoid(`internal/projects/visibility/${projectId}`, {
      method: 'POST',
      body: form,
    });
  }

  sendForApproval(projectId: number): Promise<void> {
    return this.core.requestVoid(
      `internal/projects/visibility/${projectId}/sendforapproval`,
      { method: 'POST', body: {} },
    );
  }
}
