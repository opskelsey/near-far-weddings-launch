import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUp, Check, Menu, X, Sparkles, Instagram, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { offerings, BOOKING_PLACEHOLDER, COACH_CREDIT, COACH_CREDIT_WINDOW_DAYS } from '@/lib/wedding-offerings';
import hero from '@/assets/wedding-hero.jpg';
import lace from '@/assets/wedding-lace.jpg';
import flowers from '@/assets/wedding-flowers.jpg';
import table from '@/assets/wedding-table.jpg';
import headshot from '@/assets/kelsey-marshall.jpg.asset.json';
import logo from '@/assets/near-and-far-logo.png.asset.json';

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({ meta: [
    { title: 'Near & Far Weddings | Your Wedding, Wrapped Up With Care' },
    { name: 'description', content: 'Thoughtful wedding planning with Kelsey Marshall. Wedding Plan Coach, Day-of Coordination, and Full Service. Arizona-rooted, travel bag ready.' },
    { property: 'og:title', content: 'Near & Far Weddings | Weddings, Tied Up With a Bow' },
    { property: 'og:description', content: 'Romantic celebrations and thoughtful planning, with a little warmth and a lot of care for the details.' },
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
  const [submitted, setSubmitted] = useState(false);
  const images = [lace, flowers, table];
  const nav = [['Our offerings', '#offerings'], ['Meet Kelsey', '#about'], ['Kind words', '#kind-words']] as const;

  function inquire(selectedService: string) {
    setService(selectedService);
    document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! Your note is in good hands.", {
      description: "I'll be in touch within 1–2 business days. Preview only: this note has not been sent.",
      duration: 9000,
    });
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
          <img src={hero} alt="An intimate wedding table with ivory flowers and candlelight overlooking the Arizona desert" className="hero-image" width={1920} height={1024} fetchPriority="high" />
          <div className="hero-wash" />
          <div className="hero-inner">
            <div className="eyebrow hero-eyebrow"><span /> ARIZONA-ROOTED. LOVE WITHOUT BORDERS.</div>
            <p className="hero-brand">Near & Far Weddings</p>
            <h1 id="hero-heading">Your wedding,<br />wrapped up<br />with <em>care.</em></h1>
            <p className="hero-copy">Thoughtful planning for couples who want to be fully present at their own celebration, with a little warmth and a lot of care for the details.</p>
            <Button asChild className="primary-cta"><a href="#inquire">Send Me a Note <ArrowRight size={17} /></a></Button>
          </div>
          <div className="hero-bottom"><span>FOR THE MOMENTS THAT MATTER.</span><Star /><span>AND ALL THE LITTLE THINGS IN BETWEEN.</span></div>
        </section>

        <section className="welcome section-space" aria-labelledby="welcome-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <p className="eyebrow">A WARM WELCOME</p>
          <h2 id="welcome-heading">Hello, and <em>congratulations!</em></h2>
          <div className="welcome-copy"><p>Planning a wedding should feel a bit like opening a well-loved recipe box: familiar, joyful, and full of good things to come. If it feels more like a pile of tabs, spreadsheets, and opinions, I’m here to help.</p><p>I’ll guide you on a path toward your vision, without the vendor pressure and cookie-cutter templates, so you can spend your day on what <em>you</em> care about and let the rest go.</p></div>
          <p className="signature">With warmth, Kelsey</p>
        </section>

        <section id="offerings" className="offerings section-space" aria-labelledby="offerings-heading">
          <div className="section-heading"><p className="eyebrow">A LITTLE GUIDANCE. A LOT OF HEART.</p><h2 id="offerings-heading">Ways we can <em>work together.</em></h2><p>Choose the amount of help that suits you. Every path starts with a conversation.</p></div>
          <div className="offerings-grid">
            {offerings.map((offering, index) => <article key={offering.id} className="offering">
              <div className="offering-image"><img src={images[index]} alt={['Vintage bridal lace, silk ribbon, and wedding rings', 'Ivory and dusty peach wedding flowers in an antique vase', 'Candlelight and crystal glasses at a wedding reception'][index]} width={768} height={1024} loading="lazy" /><span className="offering-number">0{index + 1}</span></div>
              <div className="offering-title"><h3>{offering.name}</h3><p className="offering-price">{offering.priceLabel}</p></div>
              <p className="offering-tagline">{offering.tagline}</p><p className="offering-copy">{offering.copy}</p>
              <p className="includes-label">THE DETAILS, TAKEN CARE OF</p>
              <ul>{offering.includes.map(item => <li key={item}><Check size={13} /><span>{item}</span></li>)}</ul>
              {index === 0 && <p className="offering-note">A little something to carry forward: your ${COACH_CREDIT} is credited toward Day-of Coordination or Full Service if you book within {COACH_CREDIT_WINDOW_DAYS} days of your follow-up call.</p>}
              {index === 2 && <p className="offering-note">Pricing depends on guest count, scope, and level of support.</p>}
              <div className="offering-action">{index === 0 ? <Button asChild variant="link"><a href={BOOKING_PLACEHOLDER} target="_blank" rel="noopener noreferrer">Book Your Session <ArrowRight /></a></Button> : <Button variant="link" onClick={() => inquire(offering.service)}>Inquire <ArrowRight /></Button>}</div>
            </article>)}
          </div>
        </section>

        <section id="about" className="about section-space" aria-labelledby="about-heading">
          <div className="about-inner"><div className="headshot-wrap"><img src={headshot.url} alt="Kelsey Marshall among snow-covered evergreen trees" width={768} height={1152} loading="lazy" /><div className="headshot-caption"><Star /><span>YOUR PLANNER. YOUR PARTNER.</span></div></div>
          <div className="about-copy"><p className="eyebrow">THE HEART BEHIND NEAR & FAR</p><h2 id="about-heading">Nice to meet you,<br />I’m <em>Kelsey.</em></h2><p>I’m a <strong>designer, lifelong organizer, and believer that the little details are what make people feel cared for.</strong> Before planning weddings, I spent more than a decade leading corporate event and design operations teams, where I learned to anticipate the details, solve problems calmly, and turn a lot of moving pieces into something that feels effortless.</p><p>Planning my own intimate wedding in 2024 reminded me just how much the right celebration can be about the people, the place, and the little things.</p><p>I believe in warm welcomes, honest budgets, and hand-written thank-you notes. I’ll be straight with you, cheer you on, and never let you feel like just another booking.</p><p className="signature">Here for you, near & far.</p></div></div>
        </section>

        <section id="kind-words" className="kind-words section-space" aria-labelledby="kind-heading"><div className="ornament"><span /><Star /><span /></div><p className="eyebrow">GOOD THINGS, FROM GOOD PEOPLE</p><h2 id="kind-heading">A few <em>kind words.</em></h2><span className="quote-mark" aria-hidden="true">“</span><blockquote>[Your first testimonial will live here.]</blockquote><p className="testimonial-note">I’d love to be your first success story.</p><Button asChild variant="link"><a href="#inquire">Let’s make something lovely <ArrowRight /></a></Button></section>

        <section id="inquire" className="intake section-space" aria-labelledby="intake-heading"><div className="intake-inner"><div className="intake-intro"><Star /><p className="eyebrow">EVERY GOOD THING STARTS WITH HELLO.</p><h2 id="intake-heading">Let’s begin,<br /><em>shall we?</em></h2><p>Tell me about your day and I’ll reply within 1–2 business days.</p><div className="intake-photo"><img src={flowers} alt="Soft garden roses and delicate white flowers" width={768} height={1024} loading="lazy" /></div><p className="little-note">Big plans, little details, or no idea where to start.<br />You’re in the right place.</p></div>
          <form onSubmit={submitNote} className="intake-form">
            <div className="form-row"><label>Your names <span>*</span><input name="names" placeholder="The two of you" autoComplete="name" required /></label><label>Email <span>*</span><input type="email" name="email" placeholder="Where I can reach you" autoComplete="email" required /></label></div>
            <div className="form-row"><label>Wedding date<input name="date" placeholder="A date, or still deciding" /></label><label>Venue / location<input name="venue" placeholder="A place, or not yet chosen" /></label></div>
            <fieldset><legend>Guest count & budget range</legend><div className="form-row"><label className="sr-only" htmlFor="guests">Guest count</label><select id="guests" name="guests" defaultValue=""><option value="" disabled>Estimated guest count</option><option>Under 30</option><option>30–75</option><option>76–150</option><option>151–250</option><option>250+</option><option>Still deciding</option></select><label className="sr-only" htmlFor="budget">Budget range</label><select id="budget" name="budget" defaultValue=""><option value="" disabled>Wedding budget</option><option>Under $10,000</option><option>$10,000–$20,000</option><option>$20,000–$35,000</option><option>$35,000–$50,000</option><option>$50,000+</option><option>Still deciding</option></select></div></fieldset>
            <label>What are you most hoping for, or most overwhelmed by?<textarea name="message" rows={4} placeholder="Tell me a little about your vision, your worries, or what matters most to you…" /></label>
            <label htmlFor="service">Which service interests you? <span className="optional">(optional)</span></label><select id="service" name="service" value={service} onChange={event => setService(event.target.value)}><option>Not sure yet</option>{offerings.map(item => <option key={item.id}>{item.service}</option>)}</select>
            <div className="form-bottom"><span>A little note. A lovely beginning.</span><Button type="submit" className="primary-cta">Send it my way <ArrowRight /></Button></div>
            {submitted && <p className="form-status" role="status"><Check size={16} /> Thank you for trying the form. This preview does not send notes yet.</p>}
          </form>
        </div></section>
      </main>

      <footer className="site-footer"><img src={logo.url} alt="Near & Far Weddings logomark" className="footer-logo" width={768} height={768} loading="lazy" /><p className="footer-tagline">Weddings, tied up with a bow.</p><div className="footer-contact"><Button variant="link" onClick={() => toast('Email address coming soon. Please use the inquiry form once connected.')}><Mail size={15} /> Email</Button><Star /><Button variant="link" onClick={() => toast('Instagram link coming soon.')}><Instagram size={15} /> Instagram</Button></div><p className="footer-location">Arizona-rooted, travel bag ready.</p><div className="footer-bottom"><span>© 2026 Near & Far Weddings</span><span>WITH WARMTH & A LITTLE STARDUST</span><Button asChild variant="ghost" size="icon"><a href="#top" aria-label="Back to top"><ArrowUp size={17} /></a></Button></div></footer>
    </div>
  );
}
