import { describe, it, expect } from 'vitest';
import { offerings, eligibleCoachCredit } from '@/lib/wedding-offerings';

describe('Wedding offering rules', () => {
  it('prices Kickstart Session at $150', () => expect(offerings[0].price).toBe(150));
  it('sets the original Kickstart Session price to $225', () => expect(offerings[0].originalPrice).toBe(225));
  it('starts Day-of Coordination at $900', () => expect(offerings[1].price).toBe(900));
  it('prices Full Planning & Coordination at $3,000', () => expect(offerings[2].price).toBe(3000));
  it('credits $150 toward Day-of within 30 days of follow-up', () => {
    expect(eligibleCoachCredit(30, 'Day-of Coordination')).toBe(150);
    expect(eligibleCoachCredit(31, 'Day-of Coordination')).toBe(0);
  });
  it('credits $150 toward Full Planning & Coordination within 30 days of follow-up', () => {
    expect(eligibleCoachCredit(30, 'Full Planning & Coordination')).toBe(150);
    expect(eligibleCoachCredit(31, 'Full Planning & Coordination')).toBe(0);
    expect(eligibleCoachCredit(10, 'Kickstart Session')).toBe(0);
  });
});