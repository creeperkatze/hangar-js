import { describe, it, expect } from 'vitest';
import { normalizeBaseUrl, appendQuery, buildApiUrl } from '../../src/utils/request.js';

describe('normalizeBaseUrl', () => {
  it('strips trailing slashes', () => {
    expect(normalizeBaseUrl('https://hangar.papermc.io/')).toBe('https://hangar.papermc.io');
  });

  it('strips trailing /api suffix', () => {
    expect(normalizeBaseUrl('https://hangar.papermc.io/api')).toBe('https://hangar.papermc.io');
  });

  it('leaves plain base URL unchanged', () => {
    expect(normalizeBaseUrl('https://hangar.papermc.io')).toBe('https://hangar.papermc.io');
  });

  it('throws on empty string', () => {
    expect(() => normalizeBaseUrl('')).toThrow(TypeError);
  });
});

describe('buildApiUrl', () => {
  it('constructs a URL for a v1 path', () => {
    const url = buildApiUrl('https://hangar.papermc.io', 'v1/projects');
    expect(url).toBe('https://hangar.papermc.io/api/v1/projects');
  });

  it('constructs a URL for an internal path', () => {
    const url = buildApiUrl('https://hangar.papermc.io', 'internal/health/');
    expect(url).toBe('https://hangar.papermc.io/api/internal/health/');
  });

  it('appends query parameters', () => {
    const url = buildApiUrl('https://hangar.papermc.io', 'v1/projects', { limit: 10, offset: 0 });
    expect(url).toContain('limit=10');
    expect(url).toContain('offset=0');
  });

  it('skips null and undefined query values', () => {
    const url = buildApiUrl('https://hangar.papermc.io', 'v1/projects', { limit: null, offset: undefined });
    expect(url).not.toContain('limit');
    expect(url).not.toContain('offset');
  });
});

describe('appendQuery', () => {
  it('handles array values', () => {
    const url = new URL('https://example.com/test');
    appendQuery(url, { tags: ['a', 'b'] });
    expect(url.searchParams.getAll('tags')).toEqual(['a', 'b']);
  });
});
