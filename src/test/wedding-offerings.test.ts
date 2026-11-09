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
      'Custom planning workbook: monthly checklist, personalized budget, and vendor recommendations',
      'Master timeline, managed start to finish',
      'Vendor outreach, final confirmations, and day-of point of contact',
      '10+ hours of on-site support',
      'Setup and teardown oversight: florals, signage, décor, seating, and place cards',
      'Getting-ready support',
      'Ceremony cueing and reception flow, from processional to send-off',
      'Gift, card, and personal item handling',
      'Responsive support from the day you book, plus 2–3 final planning calls',
      'Travel anywhere in the Greater Phoenix area included',
    ]);
  });
  it('lists Full Planning includes in the requested order', () => {
    expect(offerings[2].includes).toEqual([
      'Everything in Day-of Coordination',
      'Vendor sourcing: shortlists matched to your style and budget, plus outreach and booking support',
      'Budget management and payment tracking through your wedding date',
      'Attendance at venue tours, vendor meetings, and tastings',
      'Contract review support: what to look for, questions to ask, and deadlines to track',
      'Guest logistics: invitation and RSVP timeline, seating chart, and signage plan',
      'Arranging travel accommodations',
      'Monthly planning check-ins',
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