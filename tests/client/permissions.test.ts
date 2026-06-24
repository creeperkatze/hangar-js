import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { UserPermissions, PermissionCheck } from '../../src/types/index.js';

const MOCK_JWT = { token: 'test-jwt', expiresIn: 3_600_000 };
const MOCK_PERMISSIONS: UserPermissions = {
  type: 'global',
  permissions: ['view_public_info', 'create_project'],
  permissionBinString: '0b11',
};
const MOCK_CHECK: PermissionCheck = { type: 'global', result: true };

describe('PermissionsApi', () => {
  it('fetches global permissions for the current user', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_JWT), jsonResponse(MOCK_PERMISSIONS)]);
    const perms = await client.permissions.get();
    expect(perms).toEqual(MOCK_PERMISSIONS);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/permissions');
    expect(mockFetch.lastCall()?.headers.get('Authorization')).toBe('HangarAuth test-jwt');
  });

  it('passes project context as a query parameter', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_JWT), jsonResponse(MOCK_PERMISSIONS)]);
    await client.permissions.get({ project: 'TestPlugin' });
    expect(mockFetch.lastCall()?.url).toContain('project=TestPlugin');
  });

  it('passes organization context as a query parameter', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_JWT), jsonResponse(MOCK_PERMISSIONS)]);
    await client.permissions.get({ organization: 'PaperMC' });
    expect(mockFetch.lastCall()?.url).toContain('organization=PaperMC');
  });

  it('checks whether the user has all given permissions', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_JWT), jsonResponse(MOCK_CHECK)]);
    const check = await client.permissions.hasAll({ permissions: ['view_public_info', 'create_project'] });
    expect(check).toEqual(MOCK_CHECK);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/permissions/hasAll');
  });

  it('checks whether the user has any of the given permissions', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_JWT), jsonResponse(MOCK_CHECK)]);
    const check = await client.permissions.hasAny({ permissions: ['delete_project', 'create_project'] });
    expect(check).toEqual(MOCK_CHECK);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/permissions/hasAny');
  });
});
