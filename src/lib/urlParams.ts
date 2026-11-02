import { clamp } from './tax';

export type OverlayConfig = {
  mode: 'estimated';
  bitrate: number;
  viewers: number;
  startedAt: number;
  format: 'compact' | 'vertical' | 'ticker';
  theme: 'dark' | 'light' | 'minimal';
  accent: 'yellow' | 'violet' | 'white';
};

const numberParam = (params: URLSearchParams, key: string, fallback: number, min: number, max: number) => {
  const raw = params.get(key);
  if (raw === null || raw.trim() === '') return fallback;
  const value = Number(raw);
  return Number.isFinite(value) ? clamp(value, min, max) : fallback;
};

export function parseOverlayParams(params: URLSearchParams, now = Date.now()): OverlayConfig {
  const rawStart = Number(params.get('start'));
  const earliest = now - 365 * 24 * 3600 * 1000;
  const startedAt = Number.isFinite(rawStart) && rawStart > 0 ? clamp(rawStart, earliest, now) : now;
  const format = params.get('format');
  const theme = params.get('theme');
  const accent = params.get('accent');
  return {
    mode: 'estimated',
    bitrate: numberParam(params, 'bitrate', 6, 0.001, 100),
    viewers: numberParam(params, 'viewers', 1, 0, 1_000_000),
    startedAt,
    format: format === 'vertical' || format === 'ticker' ? format : 'compact',
    theme: theme === 'light' || theme === 'minimal' ? theme : 'dark',
    accent: accent === 'violet' || accent === 'white' ? accent : 'yellow',
  };
}

export function overlayUrl(config: Omit<OverlayConfig, 'startedAt'> & { startedAt?: number }, baseUrl: string): string {
  const url = new URL('overlay.html', baseUrl);
  url.searchParams.set('mode', 'estimated');
  url.searchParams.set('bitrate', String(clamp(config.bitrate, 0.001, 100)));
  url.searchParams.set('viewers', String(clamp(config.viewers, 0, 1_000_000)));
  if (config.startedAt) url.searchParams.set('start', String(Math.floor(config.startedAt)));
  url.searchParams.set('format', config.format);
  url.searchParams.set('theme', config.theme);
  url.searchParams.set('accent', config.accent);
  return url.toString();
}
