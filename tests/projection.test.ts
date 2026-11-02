import { describe, expect, it } from 'vitest';
import { nationalProjection, REVENUE_TARGET_EUR_PER_YEAR, SIMULATED_EUR_PER_SECOND, SIMULATION_START_MS } from '../src/lib/nationalProjection';

describe('national satirical projection', () => {
  it('is deterministic for an injected clock and starts at zero', () => {
    expect(nationalProjection(SIMULATION_START_MS)).toEqual({ euros: 0, progress: 0, elapsedSeconds: 0 });
    expect(nationalProjection(SIMULATION_START_MS + 1000)).toEqual({ euros: SIMULATED_EUR_PER_SECOND, progress: SIMULATED_EUR_PER_SECOND / REVENUE_TARGET_EUR_PER_YEAR, elapsedSeconds: 1 });
  });
  it('never goes below zero and caps the target meter after one model year', () => {
    expect(nationalProjection(SIMULATION_START_MS - 1000).euros).toBe(0);
    const afterYear = nationalProjection(SIMULATION_START_MS + 2 * 365 * 24 * 3600 * 1000);
    expect(afterYear.euros).toBe(REVENUE_TARGET_EUR_PER_YEAR * 2);
    expect(afterYear.progress).toBe(1);
  });
  it('projects about 317.10 euros per second', () => {
    expect(SIMULATED_EUR_PER_SECOND).toBeCloseTo(317.0979198, 4);
  });
});
