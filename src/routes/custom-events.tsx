import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CONTACT_EMAIL = "marshall.kelseyrose@gmail.com";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Custom event inquiry")}`;

const scope = [
  { title: "Logistics & Planning", items: ["Custom timelines", "Full budget planning and management", "Vendor coordination (catering, bartending, rentals, venues, decor, etc.)"] },
  { title: "Design & Layout", items: ["Rental sourcing", "Venue layout", "Decor styling"] },
  { title: "Execution & Day-Of", items: ["Vendor coordination on site", "Guest relations and communication", "Setup and teardown"] },
];

export const Route = createFileRoute("/custom-events")({
  component: CustomEvents,
  head: () => ({
    meta: [
      { title: "Event Planning & Coordination | Near & Far Weddings" },
      { name: "description", content: "Banquets, private parties, and special events, custom-quoted to your event's scope." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Event Planning & Coordination | Near & Far Weddings" },
      { property: "og:description", content: "Banquets, private parties, and special events, custom-quoted to your event's scope." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Star() {
  return <span aria-hidden="true" className="celestial-star">✦</span>;
}

function CustomEvents() {
  return (
    <div className="wedding-site">
      <header className="site-header">
        <Link to="/" className="wordmark" aria-label="Near & Far Weddings home">NEAR <span>&</span> FAR<small>W E D D I N G S</small></Link>
      </header>
      <main>
        <section className="welcome section-space" aria-labelledby="events-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <h1 id="events-heading" className="events-title">Event Planning &amp; <em>Coordination</em></h1>
          <p className="events-subhead">Banquets, Private Parties, and Special Events</p>
          <div className="welcome-copy"><p>Whether you’re gathering 100 guests for a celebratory banquet or hosting a multi-day retreat, great events require clear direction and airtight logistical execution. I handle the budget, the vendors, and the day-of moving parts so that your event goes off without a hitch.</p></div>
        </section>

        <section className="offerings section-space" aria-labelledby="scope-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <div className="section-heading"><h2 id="scope-heading">What’s <em>Included</em></h2></div>
          <div className="offerings-grid">
            {scope.map(group => (
              <article key={group.title} className="offering"><div className="offering-body">
                <div className="offering-title"><h3>{group.title}</h3></div>
                <ul>{group.items.map(item => <li key={item}><Check size={13} /><span>{item}</span></li>)}</ul>
              </div></article>
            ))}
          </div>
        </section>

        <section className="welcome section-space" aria-labelledby="pricing-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <h2 id="pricing-heading">Tailored Proposals &amp; <em>Custom Pricing</em></h2>
          <div className="welcome-copy"><p>Every gathering has its own footprint, from guest counts and venue logistics to single-evening vs. multi-day timelines. All services are custom-quoted based on the scope, scale, and hands-on hours required for your event.</p></div>
        </section>

        <section className="welcome section-space" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Let’s <em>talk</em></h2>
          <div className="welcome-copy"><p>Reach out to me to inquire and schedule a free consult.</p></div>
          <Button asChild variant="link" className="hero-cta events-cta"><a href={MAILTO}><span className="hero-cta-label">Email me at {CONTACT_EMAIL}</span><ArrowRight size={16} /></a></Button>
        </section>
      </main>
      <footer className="site-footer"><div className="footer-contact"><p className="footer-location">Arizona-rooted, travel bag ready.</p><Star /></div><div className="footer-bottom"><span>© 2026 Near & Far Weddings</span></div></footer>
    </div>
  );
}
