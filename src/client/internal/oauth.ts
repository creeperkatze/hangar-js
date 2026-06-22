import type { HangarClientCore } from '../core.js';

/** Form for registering an OAuth application. */
export interface OAuthRegisterForm {
  appName: string;
  redirectUris: string[];
}

/** A registered OAuth application. */
export interface OAuthApp {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
}

/** Internal API namespace for OAuth application management. */
export class InternalOAuthApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Registers a new OAuth application. */
  register(form: OAuthRegisterForm): Promise<OAuthApp> {
    return this.core.requestJson<OAuthApp>('internal/oauth/register', {
      method: 'POST',
      body: form,
    });
  }

  /** Returns the login URL for an OAuth provider. */
  getLoginUrl(provider: string, returnUrl?: string): string {
    const params = returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : '';
    return `internal/oauth/${encodeURIComponent(provider)}/login${params}`;
  }

  /** Unlinks an OAuth provider from the current user's account. */
  unlink(provider: string, id: string): Promise<void> {
    return this.core.requestVoid(
      `internal/oauth/${encodeURIComponent(provider)}/unlink/${encodeURIComponent(id)}`,
      { method: 'POST', body: {} },
    );
  }
}
