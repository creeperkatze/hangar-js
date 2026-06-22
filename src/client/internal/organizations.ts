import type { HangarClientCore } from '../core.js';

/** Form for creating an organization. */
export interface CreateOrganizationForm {
  name: string;
}

/** An organization with its members. */
export interface Organization {
  name: string;
  owner: string;
  createdAt: string;
  avatarUrl: string;
  tagline?: string;
  members: OrganizationMember[];
}

/** An organization member entry. */
export interface OrganizationMember {
  user: string;
  userId: number;
  role: string;
  hidden: boolean;
}

/** Form for adding or editing an organization member. */
export interface EditOrganizationMemberForm {
  role: string;
  name: string;
}

/** Form for transferring ownership. */
export interface TransferForm {
  to: string;
}

/** A user's role within an organization. */
export interface OrganizationRoleData {
  organization: string;
  role: string;
  accepted: boolean;
  hidden: boolean;
}

/** Internal API namespace for organizations. */
export class InternalOrganizationsApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Creates a new organization. */
  create(form: CreateOrganizationForm): Promise<void> {
    return this.core.requestVoid('internal/organizations/create', {
      method: 'POST',
      body: form,
    });
  }

  /** Returns an organization by name. */
  getOrganization(org: string): Promise<Organization> {
    return this.core.requestJson<Organization>(
      `internal/organizations/org/${encodeURIComponent(org)}`,
    );
  }

  /** Cancels a pending ownership transfer. */
  cancelTransfer(org: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/canceltransfer`,
      { method: 'POST', body: {} },
    );
  }

  /** Deletes an organization. */
  delete(org: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/delete`,
      { method: 'POST', body: {} },
    );
  }

  /** Adds a member to an organization. */
  addMember(org: string, form: EditOrganizationMemberForm): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/members/add`,
      { method: 'POST', body: form },
    );
  }

  /** Edits a member's role in an organization. */
  editMember(org: string, form: EditOrganizationMemberForm): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/members/edit`,
      { method: 'POST', body: form },
    );
  }

  /** Removes the current user from an organization. */
  leaveOrganization(org: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/members/leave`,
      { method: 'POST', body: {} },
    );
  }

  /** Removes a member from an organization. */
  removeMember(org: string, name: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/members/remove`,
      { method: 'POST', body: { name } },
    );
  }

  /** Uploads a new avatar for an organization. */
  changeAvatar(org: string, avatar: Blob): Promise<void> {
    const form = new FormData();
    form.set('avatar', avatar);
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/settings/avatar`,
      { method: 'POST', body: form },
    );
  }

  /** Saves social links for an organization. */
  saveSocials(org: string, socials: Record<string, string>): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/settings/socials`,
      { method: 'POST', body: socials },
    );
  }

  /** Updates the tagline of an organization. */
  saveTagline(org: string, tagline: string): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/settings/tagline`,
      { method: 'POST', body: { content: tagline } },
    );
  }

  /** Initiates an ownership transfer for an organization. */
  transfer(org: string, form: TransferForm): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/org/${encodeURIComponent(org)}/transfer`,
      { method: 'POST', body: form },
    );
  }

  /** Validates an organization name. */
  validateName(name: string): Promise<void> {
    return this.core.requestVoid('internal/organizations/validate', { query: { name } });
  }

  /** Sets whether an organization is hidden from a user's profile. */
  changeVisibility(org: string, hidden: boolean): Promise<void> {
    return this.core.requestVoid(
      `internal/organizations/${encodeURIComponent(org)}/userOrganizationsVisibility`,
      { method: 'POST', body: { hidden } },
    );
  }

  /** Returns the organization roles for a user. */
  getUserOrganizationRoles(user: string): Promise<OrganizationRoleData[]> {
    return this.core.requestJson<OrganizationRoleData[]>(
      `internal/organizations/${encodeURIComponent(user)}/userOrganizations`,
    );
  }

  /** Returns the visibility settings for a user's organizations. */
  getUserOrganizationVisibility(user: string): Promise<Record<string, boolean>> {
    return this.core.requestJson<Record<string, boolean>>(
      `internal/organizations/${encodeURIComponent(user)}/userOrganizationsVisibility`,
    );
  }
}
