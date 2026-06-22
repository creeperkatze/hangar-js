import type { HangarClientCore } from '../core.js';

export interface CategoryData {
  apiName: string;
  title: string;
  icon: string;
  visible: boolean;
}

export interface ColorData {
  name: string;
  hex: string;
}

export interface FlagReasonData {
  type: string;
  title: string;
}

export interface RoleData {
  roleId: number;
  name: string;
  title: string;
  color: string;
  rank: number;
  assignable: boolean;
}

export interface PermissionData {
  value: string;
  frontendName: string;
  permission: string;
}

export interface PromptData {
  ordinal: number;
  name: string;
  titleKey: string;
  messageKey: string;
}

export interface SecurityData {
  safeDownloadHosts: string[];
}

export interface ValidationData {
  project: Record<string, unknown>;
  org: Record<string, unknown>;
  userTagline: Record<string, unknown>;
  version: Record<string, unknown>;
  page: Record<string, unknown>;
  maxPageCount: number;
}

export interface VersionInfoData {
  version: string;
  commitsAhead: number;
  commit: string;
  commitDistance: number;
  branch: string;
  build: string;
  state: string;
}

export interface VisibilityData {
  name: string;
  showModal: boolean;
  canChangeTo: boolean;
  title: string;
  color: string;
}

export class InternalDataApi {
  constructor(private readonly core: HangarClientCore) {}

  getCategories(): Promise<CategoryData[]> {
    return this.core.requestJson<CategoryData[]>('internal/data/categories');
  }

  getColors(): Promise<ColorData[]> {
    return this.core.requestJson<ColorData[]>('internal/data/channelColors');
  }

  getFlagReasons(): Promise<FlagReasonData[]> {
    return this.core.requestJson<FlagReasonData[]>('internal/data/flagReasons');
  }

  getGlobalRoles(): Promise<RoleData[]> {
    return this.core.requestJson<RoleData[]>('internal/data/globalRoles');
  }

  getLicenses(): Promise<string[]> {
    return this.core.requestJson<string[]>('internal/data/licenses');
  }

  getLoggedActions(): Promise<string[]> {
    return this.core.requestJson<string[]>('internal/data/loggedActions');
  }

  getOrganizationRoles(): Promise<RoleData[]> {
    return this.core.requestJson<RoleData[]>('internal/data/orgRoles');
  }

  getPermissions(): Promise<PermissionData[]> {
    return this.core.requestJson<PermissionData[]>('internal/data/permissions');
  }

  getProjectRoles(): Promise<RoleData[]> {
    return this.core.requestJson<RoleData[]>('internal/data/projectRoles');
  }

  getPrompts(): Promise<PromptData[]> {
    return this.core.requestJson<PromptData[]>('internal/data/prompts');
  }

  getSecurity(): Promise<SecurityData> {
    return this.core.requestJson<SecurityData>('internal/data/security');
  }

  getValidations(): Promise<ValidationData> {
    return this.core.requestJson<ValidationData>('internal/data/validations');
  }

  getVersionInfo(): Promise<VersionInfoData> {
    return this.core.requestJson<VersionInfoData>('internal/data/version-info');
  }

  getVisibilities(): Promise<VisibilityData[]> {
    return this.core.requestJson<VisibilityData[]>('internal/data/visibilities');
  }
}
