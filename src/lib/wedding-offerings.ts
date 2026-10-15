export const offerings = [
  {
    id: 'coach', name: 'Wedding Plan Coach', price: 150, priceLabel: '$150',
    tagline: 'For couples who want a clear starting point.',
    copy: "Tell me your vision, and I'll turn it into a plan that fits your budget. Two no-pressure calls and a workbook made just for you.",
    includes: ['Intake on your dream day, budget, and priorities', 'A custom planning workbook: month-by-month checklist, personalized budget, guest list tracker, and sample timeline', "An honest look at what's possible, and help focusing on what you care about most", "Two calls: intake, then a follow-up once you've had time to digest"],
    service: 'Wedding Plan Coach',
  },
  {
    id: 'day-of', name: 'Day-of Coordination', price: 900, priceLabel: 'Starting at $900',
    tagline: 'So you can be fully present at your own wedding.',
    copy: "I build the final timeline, coordinate your vendors, and hold the whole day together, so you aren't fielding questions during your first look.",
    includes: ['Final timeline and day-of schedule, created and executed', 'Vendor coordination, with me as point of contact on the day', 'Decor setup and teardown', 'Responsive support from the day you book', '2–3 planning calls', '12 hours on-site, plus rehearsal attendance', 'Personalized vendor recommendations'],
    service: 'Day-of Coordination',
  },
  {
    id: 'full-service', name: 'Full Service', price: null, priceLabel: 'Custom pricing',
    tagline: 'A partner from “we’re engaged!” to the last dance.',
    copy: 'I handle the details and you stay in the loop, making the decisions that matter while I manage the fine print.',
    includes: ['Everything in Day-of Coordination', 'Vendor sourcing, with me directly supporting every step of the way', 'Design and vision development: mood boards, layout, and decor planning', 'Full budget management', 'Contract review, deadline and payment tracking', 'Regular check-ins and responsive support throughout'],
    service: 'Full Service',
  },
] as const;

export const COACH_CREDIT = 150;
export const COACH_CREDIT_WINDOW_DAYS = 30;
export const BOOKING_PLACEHOLDER = 'https://example.com/book-wedding-plan-coach';

export function eligibleCoachCredit(daysSinceFollowUp: number, service: string) {
  return daysSinceFollowUp >= 0 && daysSinceFollowUp <= COACH_CREDIT_WINDOW_DAYS &&
    (service === 'Day-of Coordination' || service === 'Full Service') ? COACH_CREDIT : 0;
}