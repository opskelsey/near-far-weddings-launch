import { describe, it, expect } from 'vitest';
import { offerings, eligibleCoachCredit } from '@/lib/wedding-offerings';

describe('Wedding offering rules', () => {
  it('prices Wedding Plan Coach at $150', () => expect(offerings[0].price).toBe(150));
  it('starts Day-of Coordination at $900', () => expect(offerings[1].price).toBe(900));
  it('uses custom pricing for Full Service', () => expect(offerings[2].price).toBeNull());
  it('credits $150 toward Day-of within 30 days of follow-up', () => {
    expect(eligibleCoachCredit(30, 'Day-of Coordination')).toBe(150);
    expect(eligibleCoachCredit(31, 'Day-of Coordination')).toBe(0);
  });
  it('credits $150 toward Full Service within 30 days of follow-up', () => {
    expect(eligibleCoachCredit(30, 'Full Service')).toBe(150);
    expect(eligibleCoachCredit(31, 'Full Service')).toBe(0);
    expect(eligibleCoachCredit(10, 'Wedding Plan Coach')).toBe(0);
  });
});