import { SECONDS_PER_MODEL_YEAR } from './tax';

export const REVENUE_TARGET_EUR_PER_YEAR = 10_000_000_000;
export const SIMULATION_START_ISO = '2026-11-02T00:00:00+01:00';
export const SIMULATION_START_MS = Date.parse(SIMULATION_START_ISO);
export const SIMULATED_EUR_PER_SECOND = REVENUE_TARGET_EUR_PER_YEAR / SECONDS_PER_MODEL_YEAR;

export function nationalProjection(nowMs: number): { euros: number; progress: number; elapsedSeconds: number } {
  const elapsedSeconds = Math.max(0, (nowMs - SIMULATION_START_MS) / 1000);
  const euros = elapsedSeconds * SIMULATED_EUR_PER_SECOND;
  return { euros, progress: Math.min(1, euros / REVENUE_TARGET_EUR_PER_YEAR), elapsedSeconds };
}
