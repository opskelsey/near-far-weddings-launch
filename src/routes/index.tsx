import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUp, Check, Menu, X, Instagram, Mail, CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { offerings, BOOKING_PLACEHOLDER, COACH_CREDIT, COACH_CREDIT_WINDOW_DAYS } from '@/lib/wedding-offerings';
import hero from '@/assets/hero-couple-field.jpg';
import headshot from '@/assets/kelsey-marshall.jpg';

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({ meta: [
    { title: 'Near & Far Weddings | Your Wedding, Wrapped Up With Care' },
    { name: 'description', content: 'Thoughtful wedding planning with Kelsey Marshall. Kickstart Session, Day-of Coordination, and Full Service. Arizona-rooted, travel bag ready.' },
    { property: 'og:title', content: 'Near & Far Weddings | Your Wedding, Wrapped Up With Care' },
    { property: 'og:description', content: 'Thoughtful planning for couples who want to be fully present at their own celebration.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
});

function Star({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`celestial-star ${className}`}>✦</span>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState('Not sure yet');
  const [date, setDate] = useState<Date>();
  const [dateOpen, setDateOpen] = useState(false);

  const nav = [['Offerings', '#offerings'], ['About', '#about']] as const;

  function inquire(selectedService: string) {
    setService(selectedService);
    document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast("Thank you!");
  }

  return (
    <div id="top" className="wedding-site">
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Near & Far Weddings home">NEAR <span>&</span> FAR<small>W E D D I N G S</small></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <Button asChild variant="outline" className="nav-cta"><a href="#inquire">Let’s begin <ArrowRight /></a></Button>
        </nav>
        <Button className="mobile-menu" variant="ghost" size="icon" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{[...nav, ['Let’s begin', '#inquire']].map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={16} /></a>)}</nav>}
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <img src={hero} alt="A couple at their outdoor ceremony, the bride holding a bouquet of dried roses, wheat and eucalyptus in warm evening light" className="hero-image" width={5040} height={3360} fetchPriority="high" />
          <div className="hero-wash" />
          <div className="hero-inner">
            <h1 id="hero-heading">Your wedding,<br />tied with a <em>bow</em>.</h1>
            <p className="hero-copy">Intimate, unconventional weddings—with practical planning for real-world budgets.</p>
            <Button asChild className="primary-cta"><a href="#inquire">Send Me a Note <ArrowRight size={17} /></a></Button>
          </div>
        </section>

        <section className="welcome section-space" aria-labelledby="welcome-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <h2 id="welcome-heading">Hello, and <em>congratulations!</em></h2>
          <div className="welcome-copy"><p>Planning a wedding should feel a bit like opening a well-loved recipe box: familiar, joyful, and full of good things to come. If it feels more like a pile of tabs, spreadsheets, and opinions, I’m here to help.</p><p>I’ll guide you on a path toward your vision, without the vendor pressure and cookie-cutter templates, so you can spend your day on what <em>you</em> care about and let the rest go.</p></div>

        </section>

        <section className="fit section-space" aria-labelledby="fit-heading">
          <div className="fit-inner"><h2 id="fit-heading"><em>This might be for you if…</em></h2><ul><li><span className="fit-star" aria-hidden="true">✦</span><span>You’re planning your first wedding and have no idea where to start.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You’d rather spend money on the things you care about than follow every wedding tradition.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You want to celebrate with the people you love—not your friend's neighbor's cousin.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You want your wedding to feel personal, relaxed, and a little unconventional.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You have a budget you actually need to stick to.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You have a Pinterest board, 47 browser tabs, and approximately zero idea what comes next.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You want an experienced planner in your corner without handing over the entire thing.</span></li></ul><p className="fit-close">If that sounds like you, we’ll probably get along.</p></div>
        </section>

        <section id="about" className="about section-space" aria-labelledby="about-heading">
          <div className="about-inner"><div className="headshot-wrap"><img src={headshot} alt="Kelsey Marshall among snow-covered evergreen trees" width={768} height={1152} loading="lazy" /><div className="headshot-caption" aria-hidden="true"><Star /></div></div>
          <div className="about-copy"><h2 id="about-heading">Nice to meet you,<br />I’m <em>Kelsey.</em></h2><p>I’m a <strong>lifelong organizer, wanderlusty traveler, and believer that the little details are what make people feel cared for.</strong> I've spent more than a decade managing complex events, projects, creative teams, budgets. Now I use that experience to make wedding planning feel less overwhelming.</p><p>My own intimate wedding in 2024 reminded me just how much the right celebration can be about the people, the place, and the little things.</p><p>I believe in warm welcomes, magical connections, and hand-written thank-you notes. I’ll be straight with you, cheer you on, and never let you feel like just another booking.</p></div></div>
        </section>

        <section id="offerings" className="offerings section-space" aria-labelledby="offerings-heading">
          <div className="section-heading"><h2 id="offerings-heading">Ways We Can <em>Work Together</em></h2><p>Choose the amount of help that suits you.</p></div>
          <div className="offerings-grid">
            {offerings.map((offering, index) => <article key={offering.id} className="offering"><span className="offering-number" aria-hidden="true">0{index + 1}</span><div className="offering-body">
              <div className="offering-title"><h3>{offering.name}</h3><p className="offering-price">{offering.priceLabel}{'originalPrice' in offering && <del className="original-price" aria-label={`Original price $${offering.originalPrice}`}>${offering.originalPrice}</del>}</p></div>
              <p className="offering-tagline">{offering.tagline}</p>
              <div className="offering-copy">{offering.copy.map(p => <p key={p}>{p}</p>)}</div>
              <p className="includes-label">Includes:</p>
              <ul>{offering.includes.map(item => <li key={item}><Check size={13} /><span>{item}</span></li>)}</ul>
              {index === 0 && <p className="offering-note">Decide you’d like ongoing support? Your ${COACH_CREDIT} is credited toward a Day-of or Full Planning package if you book within {COACH_CREDIT_WINDOW_DAYS} days of your follow-up call.</p>}
              <div className="offering-action">{index === 0 ? <Button asChild variant="link"><a href={BOOKING_PLACEHOLDER} target="_blank" rel="noopener noreferrer">Book Your Session <ArrowRight /></a></Button> : <Button variant="link" onClick={() => inquire(offering.service)}>Inquire <ArrowRight /></Button>}</div>
            </div></article>)}
          </div>
        </section>


        <section id="kind-words" className="kind-words section-space" aria-labelledby="kind-heading"><div className="ornament"><span /><Star /><span /></div><h2 id="kind-heading">Kind <em>Words</em></h2><div className="testimonials-grid">{["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."].map((quote, index) => <figure key={index}><span className="quote-mark" aria-hidden="true">“</span><blockquote>{quote}</blockquote></figure>)}</div></section>

        <section id="inquire" className="intake section-space" aria-labelledby="intake-heading"><div className="intake-inner"><div className="intake-intro"><Star /><h2 id="intake-heading">Let’s begin,<br /><em>shall we?</em></h2><p>Tell me about your day and I’ll reply within 1–2 business days.</p></div>
          <form onSubmit={submitNote} className="intake-form">
            <div className="form-row form-names"><label>Your names <span>*</span><input name="names" autoComplete="name" required /></label><label htmlFor="wedding-date">Wedding date
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" id="wedding-date" variant="outline" className={cn('date-trigger', !date && 'date-empty')}>
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Still deciding</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 date-pop" align="start">
                  <Calendar mode="single" selected={date} captionLayout="dropdown" className="pointer-events-auto" onSelect={day => { setDate(day); setDateOpen(false); }} />
                </PopoverContent>
              </Popover>
            </label></div>
            <div className="form-row form-single"><label>Email <span>*</span><input type="email" name="email" autoComplete="email" required /></label></div>
            <div className="form-row form-service"><label htmlFor="service">Which service interests you? <span className="optional">(optional)</span><select id="service" name="service" value={service} onChange={event => setService(event.target.value)}><option>Not sure yet</option>{offerings.map(item => <option key={item.id}>{item.service}</option>)}</select></label><Button type="submit" className="primary-cta">Send it my way <ArrowRight /></Button></div>

          </form>
        </div></section>
      </main>

      <footer className="site-footer"><div className="footer-contact"><Button variant="link" disabled><Mail size={15} /> Email</Button><Star /><Button variant="link" disabled><Instagram size={15} /> Instagram</Button></div><p className="footer-location">Arizona-rooted, travel bag ready.</p><div className="footer-bottom"><span>© 2026 Near & Far Weddings</span><Button asChild variant="ghost" size="icon"><a href="#top" aria-label="Back to top"><ArrowUp size={17} /></a></Button></div></footer>
    </div>
  );
}
