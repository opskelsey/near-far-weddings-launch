export const offerings = [
  {
    id: 'coach', name: 'Kickstart Session', price: 150, originalPrice: 225, priceLabel: '$150',
    copy: ["If you're staring at a checklist wondering whether you're supposed to book the venue before the photographer—or how on earth you're going to make everything fit your budget—the Kickstart is designed for exactly that."],
    includes: ['Intake on your dream day, budget, and priorities', 'A customized workbook to help you plan your day', 'Expert advice from a seasoned event planner', 'Two calls: intake + follow-up'],
    service: 'Kickstart Session',
  },
  {
    id: 'day-of', name: 'Day-of Coordination', price: 1800, priceLabel: 'Starting at $1,800',
    copy: ["My job is to take the plans you’ve made and turn them into a smooth, well-run wedding day—so you’re not answering vendor texts, tracking down the caterer, or wondering whether the cake arrived while you’re getting married."],
    includes: ['Custom planning workbook: monthly checklist, personalized budget, and vendor recommendations', 'Master timeline, managed start to finish', 'Vendor outreach, final confirmations, and day-of point of contact', '10+ hours of on-site support', 'Setup and teardown oversight: florals, signage, décor, seating, and place cards', 'Getting-ready support', 'Ceremony cueing and reception flow, from processional to send-off', 'Gift, card, and personal item handling', 'Responsive support from the day you book, plus 2–3 final planning calls', 'Travel anywhere in the Greater Phoenix area included'],
    service: 'Day-of Coordination',
  },
  {
    id: 'full-service', name: 'Wedding Planning & Management', price: 3500, priceLabel: 'Starting at $3,500',
    copy: ["From “we just got engaged” to “the last guest just left,” I’ll keep the logistics moving—budget, vendors, contracts, timeline, communication—and make sure nothing falls through the cracks."],
    includes: ['Everything in Day-of Coordination', 'Vendor sourcing: shortlists matched to your style and budget, plus outreach and booking support', 'Budget management and payment tracking through your wedding date', 'Attendance at venue tours, vendor meetings, and tastings', 'Contract review support: what to look for, questions to ask, and deadlines to track', 'Guest logistics: invitation and RSVP timeline, seating chart, and signage plan', 'Arranging travel accommodations', 'Monthly planning check-ins'],
    service: 'Wedding Planning & Management',
  },
] as const;

export const COACH_CREDIT = 150;
export const COACH_CREDIT_WINDOW_DAYS = 30;
export const BOOKING_URL = 'https://calendly.com/marshall-kelseyrose/kickstart';
export const INSTAGRAM_URL = 'https://www.instagram.com/nearandfarweddings';

export function eligibleCoachCredit(daysSinceFollowUp: number, service: string) {
  return daysSinceFollowUp >= 0 && daysSinceFollowUp <= COACH_CREDIT_WINDOW_DAYS &&
    (service === 'Day-of Coordination' || service === 'Wedding Planning & Management') ? COACH_CREDIT : 0;
}
