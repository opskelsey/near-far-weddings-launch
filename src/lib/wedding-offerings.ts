export const offerings = [
  {
    id: 'coach', name: 'Kickstart Session', price: 150, originalPrice: 225, priceLabel: '$150',
    tagline: 'Not ready to hire a planner? Start here.',
    copy: ["You don't need to know what kind of help you need yet. If you're staring at a spreadsheet wondering whether you're supposed to book the venue before the photographer—or how on earth you're going to make everything fit your budget—the Kickstart is designed for exactly that.", "In one focused session, we'll get you unstuck, identify your biggest priorities, and give you a clearer path forward."],
    includes: ['Intake on your dream day, budget, and priorities', 'A customized workbook to help you plan your day', 'Expert advice from a seasoned event planner', 'Two calls: intake + follow-up'],
    service: 'Kickstart Session',
  },
  {
    id: 'day-of', name: 'Day-of Coordination', price: 900, priceLabel: '$900 flat',
    tagline: "You don't need to spend more to make it meaningful.",
    copy: ["I’m not here to convince you that you need the upgraded linen, the bigger floral package, or a wedding tradition you never cared about in the first place.", "I’ll help you understand your options, prioritize what matters, and make informed decisions about where your budget goes."],
    includes: ['Final timeline and day-of schedule, created and executed', 'Vendor coordination, with me as point of contact on the day', 'Decor setup and teardown', 'Responsive support from the day you book', '2–3 planning calls', '12 hours on-site, plus rehearsal attendance', 'Personalized vendor recommendations'],
    service: 'Day-of Coordination',
  },
  {
    id: 'full-service', name: 'Full Planning & Coordination', price: 3000, priceLabel: '$3,000',
    tagline: 'You bring the ideas. I help you bring it to life.',
    copy: ["Bring me your Pinterest board, your wild ideas, your budget, and your scratchpad of questions. I'll figure out how to make the machine work.", "From “we just got engaged” to “the last guest just left,” I’ll keep the logistics moving—budget, vendors, contracts, timeline, communication—and make sure nothing falls through the cracks."],
    includes: ['Everything in Day-of Coordination', 'Vendor sourcing, with me directly supporting every step of the way', 'Full budget management', 'Contract review, deadline and payment tracking', 'Arranging travel accommodations', 'Regular check-ins and responsive support throughout'],
    service: 'Full Planning & Coordination',
  },
] as const;

export const COACH_CREDIT = 150;
export const COACH_CREDIT_WINDOW_DAYS = 30;
export const BOOKING_PLACEHOLDER = 'https://example.com/book-wedding-plan-coach';

export function eligibleCoachCredit(daysSinceFollowUp: number, service: string) {
  return daysSinceFollowUp >= 0 && daysSinceFollowUp <= COACH_CREDIT_WINDOW_DAYS &&
    (service === 'Day-of Coordination' || service === 'Full Planning & Coordination') ? COACH_CREDIT : 0;
}