import type { HangarClientCore } from '../core.js';

export interface CreateUserForm {
  username: string;
  email: string;
  password: string;
}

export class InternalOnboardingApi {
  constructor(private readonly core: HangarClientCore) {}

  createUser(form: CreateUserForm): Promise<void> {
    return this.core.requestVoid('internal/onboarding/createUser', {
      method: 'POST',
      body: form,
    });
  }

  generateE2EData(): Promise<void> {
    return this.core.requestVoid('internal/onboarding/generateE2EData');
  }

  generateFakeData(): Promise<void> {
    return this.core.requestVoid('internal/onboarding/generateFakeData');
  }
}
