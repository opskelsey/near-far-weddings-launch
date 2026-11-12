import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from 'react';
import { ArrowRight, ArrowUp, Check, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IntakeSection } from '@/components/intake-section';
import { offerings, BOOKING_URL, COACH_CREDIT, COACH_CREDIT_WINDOW_DAYS } from '@/lib/wedding-offerings';
import hero from '@/assets/hero-mountain.jpg';
import headshot from '@/assets/kelsey-marshall.jpg';
import { getRequestOrigin } from '@/lib/origin.functions';

const OG_IMAGE_ALT = 'A couple walking hand in hand across a dry grassy hilltop at golden hour, the bride in a white gown carrying a bouquet, hazy mountains behind them';

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => ({ meta: [
    ...(loaderData?.origin ? [
      { property: 'og:image', content: `${loaderData.origin}/og-image.jpg` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:alt', content: OG_IMAGE_ALT },
      { name: 'twitter:image', content: `${loaderData.origin}/og-image.jpg` },
      { name: 'twitter:image:alt', content: OG_IMAGE_ALT },
    ] : []),
    { title: 'Wedding Planner & Coordinator | Arizona & Beyond' },
    { name: 'description', content: 'Intimate, personalized wedding planning, from month-of coordination to full service packages.' },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: 'og:title', content: 'Wedding Planner & Coordinator | Arizona & Beyond' },
    { property: 'og:description', content: 'Intimate, personalized wedding planning, from month-of coordination to full service packages.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: "Near & Far Weddings" },
    { property: 'og:locale', content: "en_US" },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], scripts: loaderData?.origin ? [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${loaderData.origin}/#organization`,
          name: 'Near & Far Weddings',
          alternateName: 'Near and Far Weddings',
          url: `${loaderData.origin}/`,
          logo: `${loaderData.origin}/near-and-far-logo.png`,
          image: `${loaderData.origin}/og-image.jpg`,
          description: 'Intimate, personalized wedding planning, from month-of coordination to full service packages.',
          founder: { '@type': 'Person', name: 'Kelsey Marshall' },
          areaServed: ['Arizona', 'Worldwide'],
        },
        {
          '@type': 'WebSite',
          '@id': `${loaderData.origin}/#website`,
          url: `${loaderData.origin}/`,
          name: 'Near & Far Weddings',
          publisher: { '@id': `${loaderData.origin}/#organization` },
          inLanguage: 'en-US',
        },
      ],
    }),
  }] : [],
  }),
});

function Star({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`celestial-star ${className}`}>✦</span>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState('Not sure yet');

  const nav = [['Offerings', '#offerings']] as const;

  function inquire(selectedService: string) {
    setService(selectedService);
    document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div id="top" className="wedding-site">
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Near & Far Weddings home">NEAR <span>&</span> FAR<small>W E D D I N G S</small></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <Link to="/about">About</Link>
          <Button asChild variant="outline" className="nav-cta"><a href="#inquire">Let’s begin <ArrowRight /></a></Button>
        </nav>
        <Button className="mobile-menu" variant="ghost" size="icon" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={16} /></a>)}
          <Link to="/about" onClick={() => setMenuOpen(false)}>About<ArrowRight size={16} /></Link>
          <a href="#inquire" onClick={() => setMenuOpen(false)}>Let’s begin<ArrowRight size={16} /></a>
        </nav>}
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-media">
            <img src={hero} alt="A couple embracing on a granite overlook, a towering granite dome rising behind them across a mountain valley" className="hero-image" width={1920} height={1280} fetchPriority="high" />
          </div>
          <div className="hero-inner">
            <h1 id="hero-heading">Wedding Planning<br />& Month-Of Coordination</h1>
            <p className="hero-copy">Whether you’re marrying close to home or a world away, let’s make it unforgettable.</p>
            <Button asChild variant="link" className="hero-cta"><a href="#inquire"><span className="hero-cta-label">Send Me a Note</span><ArrowRight size={16} /></a></Button>
          </div>
        </section>

        <section className="welcome section-space" aria-labelledby="welcome-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <h2 id="welcome-heading">Hello, and <em>congratulations!</em></h2>
          <div className="welcome-copy"><p>Planning a wedding should feel magical, deeply personal, and full of good things to come. If it feels more like a pile of Post-Its, spreadsheets, and opinions, I’m here to help.</p></div>

        </section>

        <section className="fit section-space" aria-labelledby="fit-heading">
          <div className="fit-inner"><h2 id="fit-heading"><em>This might be for you if…</em></h2><ul><li><span className="fit-star" aria-hidden="true">✦</span><span>You want to focus on the things <em>you</em> care about rather than follow every wedding tradition.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You want to celebrate with the people you love.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You want your wedding to feel personal, intimate, and a little unconventional.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You have a Pinterest board, 47 browser tabs, and approximately zero idea what comes next.</span></li><li><span className="fit-star" aria-hidden="true">✦</span><span>You want an experienced planner in your corner taking the logistical weight off your shoulders.</span></li></ul><p className="fit-close">If that sounds like you, you’re in the right place.</p></div>
        </section>

        <section id="about" className="about section-space" aria-labelledby="about-heading">
          <div className="about-inner"><div className="headshot-wrap"><img src={headshot} alt="Kelsey Marshall among snow-covered evergreen trees" width={768} height={1152} loading="lazy" /><div className="headshot-caption" aria-hidden="true"><Star /></div></div>
          <div className="about-copy"><h2 id="about-heading">Nice to meet you,<br />I’m <em>Kelsey.</em></h2><p>I’m a <strong>lifelong organizer, wanderlusty traveler, and believer that the little details are what make people feel cared for.</strong> I've spent more than a decade managing complex events, projects, creative teams, and budgets. Now I use that experience to make wedding planning feel less overwhelming.</p><p>My own intimate wedding in 2024 reminded me just how much the right celebration can be about the people, the place, and the little things.</p><p>I believe in warm welcomes, magical connections, and handwritten thank-you notes. I’ll be straight with you, cheer you on, and never let you feel like just another booking.</p><Button asChild variant="outline" className="about-more-link"><Link to="/about">Get to know me <ArrowRight /></Link></Button></div></div>
        </section>

        <section id="offerings" className="offerings section-space" aria-labelledby="offerings-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <div className="section-heading"><h2 id="offerings-heading">Ways We Can <em>Work Together</em></h2></div>
          <div className="offerings-grid">
            {offerings.map((offering, index) => <article key={offering.id} className="offering"><span className="offering-number" aria-hidden="true">0{index + 1}</span><div className="offering-body">
              <div className="offering-title"><h3>{offering.name}</h3><p className="offering-price">{offering.priceLabel}{'originalPrice' in offering && <del className="original-price" aria-label={`Original price $${offering.originalPrice}`}>${offering.originalPrice}</del>}</p></div>
              <div className="offering-copy">{offering.copy.map(p => <p key={p}>{p}</p>)}</div>
              <p className="includes-label">Includes:</p>
              <ul>{offering.includes.map(item => <li key={item}><Check size={13} /><span>{item}</span></li>)}</ul>
              {index === 0 && <p className="offering-note">Decide you’d like ongoing support? Your ${COACH_CREDIT} is credited toward a Month-Of or Wedding Planning & Management package if you book within {COACH_CREDIT_WINDOW_DAYS} days of your follow-up call.</p>}
              <div className="offering-action">{index === 0 ? <Button asChild variant="link"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Your Session <ArrowRight /></a></Button> : <Button variant="link" onClick={() => inquire(offering.service)}>Inquire <ArrowRight /></Button>}</div>
            </div></article>)}
          </div>
        </section>


        {/* <section id="kind-words" className="kind-words section-space" aria-labelledby="kind-heading"><div className="ornament"><span /><Star /><span /></div><h2 id="kind-heading">Kind <em>Words</em></h2><div className="testimonials-grid">{[{ quote: 'Kelsey kept our timeline on track when nothing was going to plan, and we never once felt rushed or forgotten. The day felt like ours from start to finish.', name: 'Jenna R.', state: 'WI' }, { quote: 'She handled every vendor detail we would have fumbled and arrived with a plan for things we never thought to ask about. We actually got to be guests at our own wedding.', name: 'Marcus T.', state: 'AZ' }, { quote: 'Every question I had got an answer, and nothing fell through the cracks, not even the small stuff. Our families still talk about how smoothly the day ran.', name: 'Priya S.', state: 'MI' }].map(({ quote, name, state }) => <figure key={name}><span className="quote-mark" aria-hidden="true">“</span><blockquote>{quote}</blockquote><figcaption>{name} <span aria-hidden="true">·</span> {state}</figcaption></figure>)}</div></section> */}

        <IntakeSection service={service} onServiceChange={setService} />
      </main>

      <footer className="site-footer"><div className="footer-contact"><p className="footer-location">Arizona-rooted, travel bag ready.</p><Star /></div><div className="footer-bottom"><span>© 2026 Near & Far Weddings</span><Button asChild variant="ghost" size="icon"><a href="#top" aria-label="Back to top"><ArrowUp size={17} /></a></Button></div></footer>
    </div>
  );
}
