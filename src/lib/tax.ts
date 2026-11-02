export const RATE_EUR_PER_GB = 0.055;
export const BYTES_PER_GB = 1_000_000_000;
export const SECONDS_PER_MODEL_YEAR = 365 * 24 * 3600;

export type Scenario = 'video' | 'game' | 'cloud' | 'live' | 'custom';

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function eurosForGB(gigabytes: number): number {
  return Math.max(0, Number.isFinite(gigabytes) ? gigabytes : 0) * RATE_EUR_PER_GB;
}

export function gigabytesFromBytes(bytes: number): number {
  return Math.max(0, Number.isFinite(bytes) ? bytes : 0) / BYTES_PER_GB;
}

export function liveEstimate(bitrateMbps: number, durationSeconds: number, frenchAverageViewers: number) {
  const bitrate = clamp(bitrateMbps, 0, 100);
  const duration = clamp(durationSeconds, 0, 31_536_000);
  const viewers = clamp(frenchAverageViewers, 0, 1_000_000);
  const gbPerViewer = bitrate * duration / 8000;
  const gigabytes = gbPerViewer * viewers;
  return { gbPerViewer, gigabytes, grossEur: eurosForGB(gigabytes) };
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
