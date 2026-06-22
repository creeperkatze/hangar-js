import type { HangarClientCore } from '../core.js';

export interface CreateOrganizationForm {
  name: string;
}

export interface Organization {
  name: string;
  owner: string;
  createdAt: string;
  avatarUrl: string;
  tagline?: string;
  members: OrganizationMember[];
}

export interface OrganizationMember {
  user: string;
  userId: number;
  role: string;
  hidden: boolean;
}

export interface EditOrganizationMemberForm {
  role: string;
  name: string;
}

export interface TransferForm {
  to: string;
}

export interface OrganizationRoleData {
  organization: string;
  role: string;
  accepted: boolean;
  hidden: boolean;
}

export class InternalOrganizationsApi {
  constructor(private readonly core: HangarClientCore) {}

  create(form: CreateOrganizationForm): Promise<void> {
    return this.core.requestVoid('internal/organizations/create', {
      method: 'POST',
      body: form,
    });
  }

  getOrganization(org: string): Promise<Organization> {
    return this.core.requestJson<Organization>(
      `internal/organizations/org/${encodeURIComponent(org)}`,
    );
  }

  cancelTransfer(org: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/canceltransfer`,
      { method: 'POST', body: {} },
    );
  }

  delete(org: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/delete`,
      { method: 'POST', body: {} },
    );
  }

  addMember(org: string, form: EditOrganizationMemberForm): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/members/add`,
      { method: 'POST', body: form },
    );
  }

  editMember(org: string, form: EditOrganizationMemberForm): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/members/edit`,
      { method: 'POST', body: form },
    );
  }

  leaveOrganization(org: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/members/leave`,
      { method: 'POST', body: {} },
    );
  }

  removeMember(org: string, name: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/members/remove`,
      { method: 'POST', body: { name } },
    );
  }

  changeAvatar(org: string, avatar: Blob): Promise<void> {
    const form = new FormData();
    form.set('avatar', avatar);
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/settings/avatar`,
      { method: 'POST', body: form },
    );
  }

  saveSocials(org: string, socials: Record<string, string>): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/settings/socials`,
      { method: 'POST', body: socials },
    );
  }

  saveTagline(org: string, tagline: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/settings/tagline`,
      { method: 'POST', body: { content: tagline } },
    );
  }

  transfer(org: string, form: TransferForm): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/transfer`,
      { method: 'POST', body: form },
    );
  }

  validateName(name: string): Promise<void> {
    return this.core.requestVoid('internal/organizations/validate', { query: { name } });
  }

  changeVisibility(org: string, hidden: boolean): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/${encodeURIComponent(org)}/userOrganizationsVisibility`,
      { method: 'POST', body: { hidden } },
    );
  }

  getUserOrganizationRoles(user: string): Promise<OrganizationRoleData[]> {
    return this.core.requestJson<OrganizationRoleData[]>(
      `internal/organizations/${encodeURIComponent(user)}/userOrganizations`,
    );
  }

  getUserOrganizationVisibility(user: string): Promise<Record<string, boolean>> {
    return this.core.requestJson<Record<string, boolean>>(
      `internal/organizations/${encodeURIComponent(user)}/userOrganizationsVisibility`,
    );
  }
}
