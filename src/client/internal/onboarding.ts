import type { HangarClientCore } from '../core.js';

/** Form for creating a user during onboarding. */
export interface CreateUserForm {
  username: string;
  email: string;
  password: string;
}

/** Internal API namespace for onboarding and test data generation. */
export class InternalOnboardingApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Creates a user account during onboarding. */
  createUser(form: CreateUserForm): Promise<void> {
    return this.core.requestVoid('internal/onboarding/createUser', {
      method: 'POST',
      body: form,
    });
  }

  /** Generates end-to-end test data. */
  generateE2EData(): Promise<void> {
    return this.core.requestVoid('internal/onboarding/generateE2EData');
  }

  /** Generates fake data for development. */
  generateFakeData(): Promise<void> {
    return this.core.requestVoid('internal/onboarding/generateFakeData');
  }
}
