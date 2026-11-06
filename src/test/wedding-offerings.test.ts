import { describe, it, expect } from 'vitest';
import { offerings, eligibleCoachCredit, BOOKING_URL, INSTAGRAM_URL } from '@/lib/wedding-offerings';

describe('Wedding offering rules', () => {
  it('prices Kickstart Session at $150', () => expect(offerings[0].price).toBe(150));
  it('books Kickstart Session through Kelsey’s Calendly', () => expect(BOOKING_URL).toBe('https://calendly.com/marshall-kelseyrose/kickstart'));
  it('links Instagram to the Near & Far account', () => expect(INSTAGRAM_URL).toBe('https://www.instagram.com/nearandfarweddings'));
  it('sets the original Kickstart Session price to $225', () => expect(offerings[0].originalPrice).toBe(225));
  it('prices Day-of Coordination at $1,800', () => expect(offerings[1].price).toBe(1800));
  it('shows the Day-of Coordination price as starting at $1,800', () => expect(offerings[1].priceLabel).toBe('Starting at $1,800'));
  it('shows no tagline on any offering', () => expect(offerings.every(o => !('tagline' in o))).toBe(true));
  it('opens the Day-of Coordination copy with the job description, not the removed sentence', () => {
    expect(offerings[1].copy[0]).toMatch(/^My job is to take the plans you’ve made/);
    expect(offerings[1].copy.join(' ')).not.toMatch(/you don’t need to spend more/i);
  });
  it('lists Day-of Coordination includes in the requested order', () => {
    expect(offerings[1].includes).toEqual([
      'On-site vendor coordination, with me as point of contact on your day',
      'Timeline management and execution',
      'Final vendor confirmations, payments, and logistics checks',
      'Overseeing decor setup and teardown, bringing your vision to life',
      '6+ hours on-site',
      '2–3 planning calls',
      'Responsive support from the day you book',
      'Personalized vendor recommendations',
    ]);
  });
  it('prices Full Planning & Coordination at $3,000', () => expect(offerings[2].price).toBe(3000));
  it('shows the Full Planning price as starting at $3,000', () => expect(offerings[2].priceLabel).toBe('Starting at $3,000'));
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