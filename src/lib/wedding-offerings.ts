export const offerings = [
  {
    id: 'coach', name: 'Kickstart Session', price: 150, originalPrice: 225, priceLabel: '$150',
    tagline: 'Not ready to hire a planner? Start here.',
    copy: ["You don't need to know what kind of help you need yet. If you're staring at a spreadsheet wondering whether you're supposed to book the venue before the photographer—or how on earth you're going to make everything fit your budget—the Kickstart is designed for exactly that.", "In one focused session, we'll get you unstuck, identify your biggest priorities, and give you a clearer path forward."],
    includes: ['Intake on your dream day, budget, and priorities', 'A customized workbook to help you plan your day', 'Expert advice from a seasoned event planner', 'Two calls: intake + follow-up'],
    service: 'Kickstart Session',
  },
  {
    id: 'day-of', name: 'Day-of Coordination', price: 900, priceLabel: '$900',
    tagline: 'You’ve made the decisions. I’ll make sure they happen.',
    copy: ["You don’t need to spend more to make your wedding meaningful. My job is to take the plans you’ve made and turn them into a smooth, well-run wedding day—so you’re not answering vendor texts, tracking down the caterer, or wondering whether the cake arrived while you’re getting married."],
    includes: ['Vendor coordination, with me as point of contact on your big day', 'Timeline management', 'Final vendor confirmations and logistics checks', 'Decor setup and teardown', '12 hours on-site, plus rehearsal attendance', '2–3 planning calls', 'Responsive support from the day you book', 'Personalized vendor recommendations'],
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
export const BOOKING_URL = 'https://calendly.com/marshall-kelseyrose/kickstart';
export const INSTAGRAM_URL = 'https://www.instagram.com/nearandfarweddings';

export function eligibleCoachCredit(daysSinceFollowUp: number, service: string) {
  return daysSinceFollowUp >= 0 && daysSinceFollowUp <= COACH_CREDIT_WINDOW_DAYS &&
    (service === 'Day-of Coordination' || service === 'Full Planning & Coordination') ? COACH_CREDIT : 0;
}