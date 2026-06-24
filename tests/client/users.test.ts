import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { User } from '../../src/types/index.js';

const MOCK_USER: User = {
  id: 42,
  name: 'TestUser',
  tagline: 'A test user',
  createdAt: '2024-01-01T00:00:00Z',
  projectCount: 3,
  roles: [1, 2],
  isOrganization: false,
  locked: false,
  avatarUrl: 'https://example.com/avatar.png',
  nameHistory: [],
  socials: {},
};

const PAGINATED = { pagination: { offset: 0, limit: 10, count: 1 }, result: [MOCK_USER] };

describe('UsersApi', () => {
  it('fetches a single user by name', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_USER)]);
    const user = await client.users.get('TestUser');
    expect(user).toEqual(MOCK_USER);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/users/TestUser');
  });

  it('encodes the username in the URL', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_USER)]);
    await client.users.get('Test User');
    expect(mockFetch.lastCall()?.url).toContain('Test%20User');
  });

  it('lists all users with pagination', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(PAGINATED)]);
    const result = await client.users.list({ limit: 10, offset: 0 });
    expect(result.result).toHaveLength(1);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/users');
    expect(mockFetch.lastCall()?.url).toContain('limit=10');
  });

  it('lists authors without options', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(PAGINATED)]);
    await client.users.listAuthors();
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/authors');
  });

  it('lists authors with sort option', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(PAGINATED)]);
    await client.users.listAuthors({ sort: 'projectCount' });
    expect(mockFetch.lastCall()?.url).toContain('sort=projectCount');
  });

  it('lists staff members', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(PAGINATED)]);
    await client.users.listStaff({ sort: 'roles' });
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/staff');
    expect(mockFetch.lastCall()?.url).toContain('sort=roles');
  });

  it('does not require authentication', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_USER)]);
    await client.users.get('TestUser');
    expect(mockFetch.callCount()).toBe(1);
    expect(mockFetch.lastCall()?.headers.get('Authorization')).toBeNull();
  });
});
