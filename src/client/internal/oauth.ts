import type { HangarClientCore } from '../core.js';

export interface OAuthRegisterForm {
  appName: string;
  redirectUris: string[];
}

export interface OAuthApp {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
}

export class InternalOAuthApi {
  constructor(private readonly core: HangarClientCore) {}

  register(form: OAuthRegisterForm): Promise<OAuthApp> {
    return this.core.requestJson<OAuthApp>('internal/oauth/register', {
      method: 'POST',
      body: form,
    });
  }

  getLoginUrl(provider: string, returnUrl?: string): string {
    const params = returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : '';
    return `internal/oauth/${encodeURIComponent(provider)}/login${params}`;
  }

  unlink(provider: string, id: string): Promise<void> {
    return this.core.requestVoid(
      `internal/oauth/${encodeURIComponent(provider)}/unlink/${encodeURIComponent(id)}`,
      { method: 'POST', body: {} },
    );
  }
}
