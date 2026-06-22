import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse, errorResponse } from '../utils/http.js';
import { HangarError } from '../../src/errors.js';
import type { Project } from '../../src/types/index.js';

const MOCK_PROJECT: Project = {
  id: 1,
  name: 'TestPlugin',
  namespace: { owner: 'PaperMC', slug: 'TestPlugin' },
  description: 'A test plugin',
  category: 'misc',
  visibility: 'public',
  avatarUrl: 'https://example.com/avatar.png',
  createdAt: '2024-01-01T00:00:00Z',
  lastUpdated: '2024-06-01T00:00:00Z',
  mainPageContent: '# Welcome',
  memberNames: ['TestUser'],
  stats: { views: 100, downloads: 50, recentViews: 10, recentDownloads: 5, stars: 20, watchers: 15 },
  settings: {
    license: { name: 'MIT', type: 'MIT' },
    keywords: ['test'],
    sponsors: '',
    donation: { enable: false, subject: '' },
    links: [],
    tags: [],
  },
  userActions: { starred: false, watching: false, flagged: false },
  supportedPlatforms: { PAPER: ['1.20', '1.21'] },
};

describe('ProjectsApi', () => {
  it('fetches a project by author and slug', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_PROJECT)]);
    const project = await client.projects.get('PaperMC', 'TestPlugin');
    expect(project).toEqual(MOCK_PROJECT);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/projects/PaperMC/TestPlugin');
  });

  it('throws HangarError on 404', async () => {
    const { client } = createTestClient([errorResponse(404, { message: 'Not found' })]);
    await expect(client.projects.get('PaperMC', 'NonExistent')).rejects.toThrow(HangarError);
  });

  it('fetches a paginated project list', async () => {
    const paginated = { pagination: { offset: 0, limit: 10, count: 1 }, result: [MOCK_PROJECT] };
    const { client, mockFetch } = createTestClient([jsonResponse(paginated)]);
    const result = await client.projects.list({ limit: 10 });
    expect(result.result).toHaveLength(1);
    expect(mockFetch.lastCall()?.url).toContain('limit=10');
  });
});
