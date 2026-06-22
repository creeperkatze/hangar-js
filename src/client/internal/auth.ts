import type { HangarClientCore } from '../core.js';

export interface SignupForm {
  username: string;
  email: string;
  password: string;
}

export interface AccountForm {
  username?: string;
  email?: string;
  currentPassword: string;
}

export interface SettingsForm {
  [key: string]: unknown;
}

export interface SetupTotpResponse {
  secret: string;
  qrCode: string;
}

export interface TotpForm {
  code: string;
  password?: string;
}

export interface ResetForm {
  email: string;
}

export interface SetPasswordForm {
  code: string;
  password: string;
}

export interface VerifyCodeForm {
  code: string;
}

export interface LoginPasswordForm {
  username: string;
  password: string;
}

export interface LoginTotpForm {
  code: string;
}

export interface LoginBackupForm {
  code: string;
}

export interface LoginWebAuthnForm {
  credential: unknown;
}

export interface LoginSudoForm {
  password: string;
}

export interface WebAuthnSetupResponse {
  publicKey: unknown;
}

export interface WebAuthnRegisterForm {
  credential: unknown;
  name?: string;
}

export interface WebAuthnRenameForm {
  id: string;
  name: string;
}

export interface WebAuthnUnregisterForm {
  id: string;
  password: string;
}

export class InternalAuthApi {
  constructor(private readonly core: HangarClientCore) {}

  // Session / account management
  saveAccount(form: AccountForm): Promise<void> {
    return this.core.requestVoid('internal/auth/account', { method: 'POST', body: form });
  }

  invalidateRefreshToken(): Promise<void> {
    return this.core.requestVoid('internal/auth/invalidate');
  }

  loggedOut(): Promise<void> {
    return this.core.requestVoid('internal/auth/logout');
  }

  refreshAccessToken(): Promise<void> {
    return this.core.requestVoid('internal/auth/refresh');
  }

  saveSettings(form: SettingsForm): Promise<void> {
    return this.core.requestVoid('internal/auth/settings', { method: 'POST', body: form });
  }

  signup(form: SignupForm): Promise<void> {
    return this.core.requestVoid('internal/auth/signup', { method: 'POST', body: form });
  }

  // Backup codes
  regenerateBackupCodes(password: string): Promise<string[]> {
    return this.core.requestJson<string[]>('internal/auth/codes/regenerate', {
      method: 'POST',
      body: { content: password },
    });
  }

  showBackupCodes(password: string): Promise<string[]> {
    return this.core.requestJson<string[]>('internal/auth/codes/show', {
      method: 'POST',
      body: { content: password },
    });
  }

  // Email verification
  sendEmailCode(): Promise<void> {
    return this.core.requestVoid('internal/auth/email/send', { method: 'POST', body: {} });
  }

  verifyEmail(form: VerifyCodeForm): Promise<void> {
    return this.core.requestVoid('internal/auth/email/verify', { method: 'POST', body: form });
  }

  // Password reset
  sendResetMail(form: ResetForm): Promise<void> {
    return this.core.requestVoid('internal/auth/reset/send', { method: 'POST', body: form });
  }

  setNewPassword(form: SetPasswordForm): Promise<void> {
    return this.core.requestVoid('internal/auth/reset/set', { method: 'POST', body: form });
  }

  verifyResetCode(form: VerifyCodeForm): Promise<void> {
    return this.core.requestVoid('internal/auth/reset/verify', { method: 'POST', body: form });
  }

  // TOTP
  setupTotp(): Promise<SetupTotpResponse> {
    return this.core.requestJson<SetupTotpResponse>('internal/auth/totp/setup', { method: 'POST', body: {} });
  }

  registerTotp(form: TotpForm): Promise<void> {
    return this.core.requestVoid('internal/auth/totp/register', { method: 'POST', body: form });
  }

  removeTotp(form: TotpForm): Promise<void> {
    return this.core.requestVoid('internal/auth/totp/remove', { method: 'POST', body: form });
  }

  verifyTotp(form: TotpForm): Promise<void> {
    return this.core.requestVoid('internal/auth/totp/verify', { method: 'POST', body: form });
  }

  // WebAuthn
  setupWebauthn(): Promise<WebAuthnSetupResponse> {
    return this.core.requestJson<WebAuthnSetupResponse>('internal/auth/webauthn/setup', { method: 'POST', body: {} });
  }

  registerWebauthn(form: WebAuthnRegisterForm): Promise<void> {
    return this.core.requestVoid('internal/auth/webauthn/register', { method: 'POST', body: form });
  }

  renameWebauthn(form: WebAuthnRenameForm): Promise<void> {
    return this.core.requestVoid('internal/auth/webauthn/rename', { method: 'POST', body: form });
  }

  unregisterWebauthn(form: WebAuthnUnregisterForm): Promise<void> {
    return this.core.requestVoid('internal/auth/webauthn/unregister', { method: 'POST', body: form });
  }

  prepareWebauthnLogin(): Promise<WebAuthnSetupResponse> {
    return this.core.requestJson<WebAuthnSetupResponse>('internal/auth/webauthn/assert', { method: 'POST', body: {} });
  }

  // Login
  loginPassword(form: LoginPasswordForm): Promise<void> {
    return this.core.requestVoid('internal/auth/login/password', { method: 'POST', body: form });
  }

  loginTotp(form: LoginTotpForm): Promise<void> {
    return this.core.requestVoid('internal/auth/login/totp', { method: 'POST', body: form });
  }

  loginBackup(form: LoginBackupForm): Promise<void> {
    return this.core.requestVoid('internal/auth/login/backup', { method: 'POST', body: form });
  }

  loginWebAuthn(form: LoginWebAuthnForm): Promise<void> {
    return this.core.requestVoid('internal/auth/login/webauthn', { method: 'POST', body: form });
  }

  loginSudo(form: LoginSudoForm): Promise<void> {
    return this.core.requestVoid('internal/auth/login/sudo', { method: 'POST', body: form });
  }
}
