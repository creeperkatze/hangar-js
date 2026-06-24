import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse, textResponse } from '../utils/http.js';
import type { Version, DayProjectStats } from '../../src/types/index.js';

const MOCK_JWT = { token: 'test-jwt', expiresIn: 3_600_000 };

const MOCK_VERSION: Version = {
  id: 1,
  name: '1.0.0',
  description: 'Initial release',
  author: 'TestUser',
  projectId: 42,
  createdAt: '2024-01-01T00:00:00Z',
  channel: { name: 'Release', description: '', color: '#22c55e', flags: [], createdAt: '2024-01-01T00:00:00Z' },
  visibility: 'public',
  reviewState: 'reviewed',
  pinnedStatus: 'NONE',
  memberNames: ['TestUser'],
  stats: { totalDownloads: 100, platformDownloads: { PAPER: 100 } },
  downloads: {},
  platformDependencies: {},
  platformDependenciesFormatted: {},
  pluginDependencies: {},
};

const PAGINATED = { pagination: { offset: 0, limit: 10, count: 1 }, result: [MOCK_VERSION] };

describe('VersionsApi', () => {
  it('lists versions for a project', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(PAGINATED)]);
    const result = await client.versions.list('PaperMC', 'TestPlugin');
    expect(result.result).toHaveLength(1);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/projects/PaperMC/TestPlugin/versions');
  });

  it('passes list options as query parameters', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(PAGINATED)]);
    await client.versions.list('PaperMC', 'TestPlugin', { platform: 'PAPER', limit: 5 });
    expect(mockFetch.lastCall()?.url).toContain('platform=PAPER');
    expect(mockFetch.lastCall()?.url).toContain('limit=5');
  });

  it('fetches a single version by name', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_VERSION)]);
    const version = await client.versions.get('PaperMC', 'TestPlugin', '1.0.0');
    expect(version).toEqual(MOCK_VERSION);
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/projects/PaperMC/TestPlugin/versions/1.0.0');
  });

  it('creates a version with FormData and requires auth', async () => {
    const { client, mockFetch } = createTestClient([
      jsonResponse(MOCK_JWT),
      new Response(null, { status: 201 }),
    ]);
    await expect(
      client.versions.create('PaperMC', 'TestPlugin', {
        channel: { name: 'Release', color: '#22c55e' },
        platformDependencies: { PAPER: ['1.21'] },
        pluginDependencies: {},
      }),
    ).resolves.toBeUndefined();
    expect(mockFetch.lastCall()?.method).toBe('POST');
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/projects/PaperMC/TestPlugin/versions');
    expect(mockFetch.lastCall()?.headers.get('Authorization')).toBe('HangarAuth test-jwt');
  });

  it('deletes a version with DELETE and requires auth', async () => {
    const { client, mockFetch } = createTestClient([
      jsonResponse(MOCK_JWT),
      new Response(null, { status: 204 }),
    ]);
    await expect(client.versions.delete('PaperMC', 'TestPlugin', '1.0.0')).resolves.toBeUndefined();
    expect(mockFetch.lastCall()?.method).toBe('DELETE');
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/projects/PaperMC/TestPlugin/versions/1.0.0');
  });

  it('restores a version with POST and requires auth', async () => {
    const { client, mockFetch } = createTestClient([
      jsonResponse(MOCK_JWT),
      new Response(null, { status: 200 }),
    ]);
    await expect(client.versions.restore('PaperMC', 'TestPlugin', '1.0.0')).resolves.toBeUndefined();
    expect(mockFetch.lastCall()?.method).toBe('POST');
    expect(mockFetch.lastCall()?.url).toContain('/api/v1/projects/PaperMC/TestPlugin/versions/1.0.0/restore');
  });

  it('fetches daily stats for a version', async () => {
    const stats: Record<string, DayProjectStats> = {
      '2024-01-01': { views: 10, downloads: 5 },
    };
    const { client, mockFetch } = createTestClient([jsonResponse(stats)]);
    const result = await client.versions.getStats('PaperMC', 'TestPlugin', '1.0.0', {
      fromDate: '2024-01-01',
      toDate: '2024-01-31',
    });
    expect(result).toEqual(stats);
    expect(mockFetch.lastCall()?.url).toContain('fromDate=2024-01-01');
    expect(mockFetch.lastCall()?.url).toContain('toDate=2024-01-31');
  });

  it('fetches the download URL as text', async () => {
    const { client, mockFetch } = createTestClient([
      textResponse('https://cdn.hangar.papermc.io/download/file.jar'),
    ]);
    const url = await client.versions.getDownloadUrl('PaperMC', 'TestPlugin', '1.0.0', 'PAPER');
    expect(url).toBe('https://cdn.hangar.papermc.io/download/file.jar');
    expect(mockFetch.lastCall()?.url).toContain(
      '/api/v1/projects/PaperMC/TestPlugin/versions/1.0.0/PAPER/download',
    );
  });

  it('downloads a version file as an ArrayBuffer', async () => {
    const bytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);
    const { client } = createTestClient([new Response(bytes.buffer)]);
    const buffer = await client.versions.download('PaperMC', 'TestPlugin', '1.0.0', 'PAPER');
    expect(buffer).toBeInstanceOf(ArrayBuffer);
    expect(new Uint8Array(buffer)[0]).toBe(0x50);
  });

  it('does not require authentication for read operations', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse(MOCK_VERSION)]);
    await client.versions.get('PaperMC', 'TestPlugin', '1.0.0');
    expect(mockFetch.callCount()).toBe(1);
    expect(mockFetch.lastCall()?.headers.get('Authorization')).toBeNull();
  });
});
