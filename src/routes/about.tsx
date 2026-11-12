import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUp, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntakeSection } from "@/components/intake-section";
import headshot from "@/assets/kelsey-marshall.jpg";
import banquetTables from "@/assets/30_yr_banquet_2.jpg.asset.json";
import banquetHall from "@/assets/30yr_banquet.jpg.asset.json";
import staffMeetingArena from "@/assets/staff_meeting.jpg.asset.json";
import staffTeamPhoto from "@/assets/CSAGroupPic-6399.jpg.asset.json";
import recordFormation from "@/assets/SWN05646_point1.jpg.asset.json";
import recordExit from "@/assets/SWN05591.jpg.asset.json";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Kelsey Marshall | Near & Far Weddings" },
      {
        name: "description",
        content:
          "Meet Kelsey Marshall: lifelong organizer, wedding planner, and experienced coordinator of celebrations, corporate gatherings, and world records.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "About Kelsey Marshall | Near & Far Weddings" },
      {
        property: "og:description",
        content:
          "Meet Kelsey Marshall: lifelong organizer, wedding planner, and experienced coordinator of celebrations, corporate gatherings, and world records.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Star({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`celestial-star ${className}`}>✦</span>;
}

function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState('Not sure yet');

  return (
    <div id="top" className="wedding-site about-page">
      <header className="site-header">
        <Link to="/" className="wordmark" aria-label="Near & Far Weddings home">NEAR <span>&</span> FAR<small>W E D D I N G S</small></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/" hash="offerings">Offerings</Link>
          <Link to="/about" aria-current="page">About</Link>
          <Button asChild variant="outline" className="nav-cta"><a href="#inquire">Let’s begin <ArrowRight /></a></Button>
        </nav>
        <Button className="mobile-menu" variant="ghost" size="icon" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link to="/" hash="offerings" onClick={() => setMenuOpen(false)}>Offerings<ArrowRight size={16} /></Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About<ArrowRight size={16} /></Link>
          <a href="#inquire" onClick={() => setMenuOpen(false)}>Let’s begin<ArrowRight size={16} /></a>
        </nav>}
      </header>

      <main>
        <section className="about-intro section-space" aria-labelledby="about-page-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <h1 id="about-page-heading" className="about-page-title">Hello, I’m <em>Kelsey</em></h1>
          <div className="about-intro-grid">
            <div className="about-intro-copy">
              <p>I’ve spent more than a decade planning the kind of days where a lot of people need to be in the right place at the right time, from reunions and celebrations to record-setting weekends in the desert. Weddings are the next chapter, and the one I’m most excited about.</p>
              <p>What I love about this work is taking something that feels overwhelming and making it feel doable. Planning a wedding shouldn’t mean losing sleep over spreadsheets. It should feel like you’ve got someone in your corner who has it all handled.</p>
            </div>
            <div className="headshot-wrap about-headshot"><img src={headshot} alt="Kelsey Marshall among snow-covered evergreen trees" width={768} height={1152} loading="lazy" /><div className="headshot-caption" aria-hidden="true"><Star /></div></div>
          </div>
        </section>

        <section className="about-process section-space" aria-labelledby="process-heading">
          <div className="about-section-inner">
            <div className="ornament"><span /><Star /><span /></div>
            <div className="section-heading"><h2 id="process-heading">My <em>Process</em></h2></div>
            <div className="process-photo-grid" aria-label="Detail photo placeholders">
              <div className="about-photo-placeholder"><span>Workbook</span></div>
              <div className="about-photo-placeholder"><span>Checklist</span></div>
              <div className="about-photo-placeholder"><span>Budget sheet</span></div>
            </div>
            <div className="process-content">
              <p className="process-intro">We start by talking about you: what you’re dreaming of, the budget you’re working with, and who you want in the room. From there, everything becomes a month-by-month checklist with clear checkpoints, so you always know the next small step instead of staring at the whole mountain.</p>
              <ul className="process-list">
                <li><Star /><span>I work backward from your requirements to figure out what makes sense for <em>your</em> event. If something’s got to give, I’ll present you with options — so the decisions on priorities are yours, not mine.</span></li>
                <li><Star /><span>I keep many things moving at once and set date-based reminders for everything — so you don’t have to be the one tracking to-dos <em>(or worse, remembering them late at night when you wish you were sleeping!).</em></span></li>
                <li><Star /><span>I’ll track the details to preserve your vision <em>and</em> your wallet <em>(my years of experience have given me an eagle eye for budget “gotchas” — I manage these closely to avoid surprises for you).</em></span></li>
                <li><Star /><span>I keep you informed on progress, so you can feel confident as your dream day approaches.</span></li>
              </ul>
            </div>
            <p className="process-closing">By the time your day arrives, the vendors are confirmed, the timeline is in everyone’s hands, and you get to be a guest at your own celebration!</p>
          </div>
        </section>

        <section className="kind-words about-kind-words section-space" aria-labelledby="kind-words-heading">
          <div className="ornament"><span /><Star /><span /></div>
          <h2 id="kind-words-heading">Kind <em>Words</em></h2>
          <div className="testimonials-grid">
            <figure>
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>Working with Kelsey is great because your brain is free to focus on what you care about. You know the details and problem-solving are handled. She’s excellent at anticipating and solving small issues before they ever reach you.</blockquote>
              <figcaption>Alex Swindle <span aria-hidden="true">·</span> Event Photographer</figcaption>
            </figure>
            <figure>
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>[placeholder]</blockquote>
              <figcaption>Hannah Torres <span aria-hidden="true">·</span> Program Manager</figcaption>
            </figure>
            <figure>
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>[placeholder]</blockquote>
              <figcaption>Windee Frassetto <span aria-hidden="true">·</span> Operations Manager</figcaption>
            </figure>
          </div>
        </section>

        <section className="experience section-space" aria-labelledby="experience-heading">
          <div className="about-section-inner">
            <div className="ornament"><span /><Star /><span /></div>
            <div className="section-heading"><h2 id="experience-heading">Where I’ve Practiced <em>the Magic</em></h2></div>
            <div className="experience-list">
              <article className="experience-item">
                <div className="experience-copy">
                  <span className="experience-number" aria-hidden="true">01</span>
                  <h3>Reunion Banquet</h3>
                  <p>When Arizona Airspeed, a skydiving team with six world championships to its name, turned 30, they asked me to plan a banquet to bring alumni, sponsors, and friends back together. The guest list was over 200, with a firm $20,000 budget.</p>
                  <p>We made it feel special without overspending. We booked a lovely local banquet hall, and I built DIY tablescapes to tie the space together. Rather than hire a DJ, we featured a playlist of songs from 1994, the year the team was founded. A friend of the team emceed, so I made sure he had time to practice, that the AV was set up the way he liked, and that his cues landed on time. Then I greeted guests and kept the evening flowing from arrival to dinner to presentation, without anyone feeling rushed. It was the kind of night where nobody notices the planning, which is exactly the point.</p>
                </div>
                <div className="experience-photos">
                  <img src={banquetTables.url} alt="Guests seated at round dinner tables with gold runners and sunflower centerpieces at the reunion banquet" loading="lazy" />
                  <img src={banquetHall.url} alt="The full banquet room filled with guests seated at round tables, watching the program" loading="lazy" />
                </div>
              </article>

              <article className="experience-item">
                <div className="experience-copy">
                  <span className="experience-number" aria-hidden="true">02</span>
                  <h3>Corporate Gatherings</h3>
                  <p>For several years, I produced a monthly all-hands at a healthcare software company: two hours, in person, 10,000 employees, one auditorium. Every show involved both content development and creative direction, with milestone anniversaries, moving stories about patients helped, customer videos, and even live musical numbers.</p>
                  <p>I worked directly with the CEO on a four-week cycle, and handled run-of-show with a crew of projectionists, sound engineers, and camera operators. Printed cue sheets went to every person before the show, and I handled the unexpected in real-time with the crew — often without the audience noticing at all. The experience taught me how to make complicated things look effortless and stay calm under pressure (even with 10,000 people watching!).</p>
                </div>
                <div className="experience-photos">
                  <img src={staffMeetingArena.url} alt="A packed auditorium facing three large screens reading Welcome to Staff Meeting" loading="lazy" />
                  <img src={staffTeamPhoto.url} alt="The production team gathered on stage in front of a colorful illustrated backdrop for a group photo" loading="lazy" />
                </div>
              </article>

              <article className="experience-item">
                <div className="experience-copy">
                  <span className="experience-number" aria-hidden="true">03</span>
                  <h3>World Records</h3>
                  <p>Skydive Arizona, in Eloy, is where people come from around the world to try to set records, with dozens or even hundreds of skydivers building huge formations in the sky. I organized the 150-way record in 2024 from start to finish over 12 months, and coordinated the month-of details and on-site support for the 100-way record in 2026.</p>
                  <p>That meant recruiting participants and tracking payments and licenses, managing a six-figure budget, hiring about a dozen coaches and videographers, and getting everyone where they needed to be while the dropzone kept running around us. I also organized a participant dinner for 150, and solved every port-a-potty and hydration-station problem the week threw at me. In the end, both records were successfully achieved, and the participants left with one of the most memorable experiences of their skydiving careers.</p>
                </div>
                <div className="experience-photos">
                  <img src={recordFormation.url} alt="Dozens of skydivers in a giant diamond formation falling over the desert" loading="lazy" />
                  <img className="is-tall" src={recordExit.url} alt="Skydivers exiting two aircraft in a line over the desert during a record attempt" loading="lazy" />
                </div>
              </article>
            </div>
            <p className="about-closing"><em>You may have noticed a trend! I did about 1,300 jumps before hanging up my rig, and organizing events on the ground has been my way of staying close to the community I love. Now I’d love to bring that same energy to yours.</em></p>
          </div>
        </section>
        <IntakeSection service={service} onServiceChange={setService} />
      </main>

      <footer className="site-footer"><div className="footer-contact"><p className="footer-location">Arizona-rooted, travel bag ready.</p><Star /></div><div className="footer-bottom"><span>© 2026 Near & Far Weddings</span><Button asChild variant="ghost" size="icon"><a href="#top" aria-label="Back to top"><ArrowUp size={17} /></a></Button></div></footer>
    </div>
  );
}
