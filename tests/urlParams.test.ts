import { describe, expect, it } from 'vitest';
import { overlayUrl, parseOverlayParams } from '../src/lib/urlParams';

describe('public overlay URLs', () => {
  const now = Date.parse('2026-11-02T12:00:00Z');
  it('uses safe defaults and the estimated mode only', () => {
    expect(parseOverlayParams(new URLSearchParams('mode=upload&bitrate=nope'), now)).toEqual({ mode: 'estimated', bitrate: 6, viewers: 1, startedAt: now, format: 'compact', theme: 'dark', accent: 'yellow' });
  });
  it('bounds numbers and validates visual options', () => {
    const config = parseOverlayParams(new URLSearchParams('bitrate=999&viewers=99999999&format=script&theme=bad&accent=bad&start=9999999999999'), now);
    expect(config.bitrate).toBe(100);
    expect(config.viewers).toBe(1_000_000);
    expect(config.format).toBe('compact');
    expect(config.theme).toBe('dark');
    expect(config.startedAt).toBe(now);
  });
  it('builds a base-path-safe URL without credentials', () => {
    const url = overlayUrl({ mode: 'estimated', bitrate: 6, viewers: 100, format: 'ticker', theme: 'light', accent: 'violet' }, 'https://manicalabs.github.io/upload_taxes/');
    expect(url).toContain('https://manicalabs.github.io/upload_taxes/overlay.html?');
    expect(url).toContain('mode=estimated');
    expect(url).not.toContain('password');
  });
});
