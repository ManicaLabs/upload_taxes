import { describe, expect, it } from 'vitest';
import { eurosForGB, gigabytesFromBytes, liveEstimate, RATE_EUR_PER_GB, roundCurrency } from '../src/lib/tax';

describe('tax simulation math', () => {
  it('uses 5.5 euro cents per decimal gigabyte', () => {
    expect(RATE_EUR_PER_GB).toBe(0.055);
    expect(eurosForGB(100)).toBeCloseTo(5.5);
    expect(eurosForGB(15)).toBeCloseTo(0.825);
    expect(eurosForGB(1000)).toBeCloseTo(55);
    expect(roundCurrency(eurosForGB(15))).toBe(0.83);
  });
  it('converts decimal bytes and clamps invalid values safely', () => {
    expect(gigabytesFromBytes(1_000_000_000)).toBe(1);
    expect(gigabytesFromBytes(-1)).toBe(0);
    expect(eurosForGB(Number.NaN)).toBe(0);
    expect(eurosForGB(Infinity)).toBe(0);
  });
  it('estimates a constant-rate live scenario with average French viewers', () => {
    const result = liveEstimate(6, 3600, 100);
    expect(result.gbPerViewer).toBeCloseTo(2.7);
    expect(result.gigabytes).toBeCloseTo(270);
    expect(result.grossEur).toBeCloseTo(14.85);
  });
  it('bounds unreasonable live inputs', () => {
    expect(liveEstimate(1000, 1e20, 1e20).gigabytes).toBeLessThanOrEqual(100 * 31_536_000 / 8000 * 1_000_000);
    expect(liveEstimate(-10, -2, -3).grossEur).toBe(0);
  });
});
