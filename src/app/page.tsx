import { Arrow, BrandMark } from "@/components/brand-mark";
import { DigitalTwin } from "@/components/digital-twin";
import { PilotForm } from "@/components/pilot-form";
import { SiteHeader } from "@/components/site-header";
import { siteConfig, pilotWhatsAppUrl } from "@/config/site";
import { capabilities, customerGroups, lifecycle, pipeline, useCases } from "@/data/content";
import { mockSpatialService } from "@/services/mock-spatial-service";

function SectionLead({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-lead">
      <span>{index}</span>
      <p>{children}</p>
    </div>
  );
}

export default async function Home() {
  const scenarios = await mockSpatialService.getScenarios();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="hero-kicker"><span>Event-to-city</span><span>Spatial intelligence</span></div>
            <h1>From crowd flow<br />to city flow.</h1>
            <p className="hero-intro">Privacy-first spatial intelligence for safer, smoother, and more connected city-scale events.</p>
            <div className="hero-actions">
              <a className="button button-signal" href="#simulation">Explore the platform <Arrow /></a>
              <a className="text-link" href="#contact">Discuss a pilot <Arrow diagonal /></a>
            </div>
          </div>
          <div className="hero-side" aria-hidden="true">
            <span>Built from Jakarta</span>
            <span>Designed for cities worldwide</span>
          </div>
          <div className="hero-index" aria-hidden="true">JS / 001</div>
        </section>

        <section className="pressure-section section-pad" id="platform">
          <SectionLead index="01">The urban problem</SectionLead>
          <div className="pressure-grid">
            <h2>An event does not end at the venue gate.</h2>
            <div className="pressure-copy">
              <p>When thousands move at once, pressure travels into sidewalks, crossings, stations, curb space, and city operations.</p>
              <p>Yet each part of that journey is often planned and monitored in isolation. The result is a fragmented picture at the exact moment teams need shared context.</p>
            </div>
          </div>
          <div className="system-chain" aria-label="Connected operating system">
            {[
              ["Event", "Crowd release"], ["Public space", "Pedestrian flow"],
              ["Transit", "Demand surge"], ["City operations", "Coordinated action"],
            ].map(([name, detail], index) => (
              <div key={name} className="chain-node">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{name}</strong><small>{detail}</small>
                {index < 3 && <i aria-hidden="true">→</i>}
              </div>
            ))}
          </div>
        </section>

        <section className="platform-section section-pad">
          <SectionLead index="02">One spatial operating picture</SectionLead>
          <div className="platform-heading">
            <h2>See the event.<br />Read the city.</h2>
            <p>JakSambung connects fragmented signals into an operational model of where people are, where they are moving, what happens next, and what teams can do about it.</p>
          </div>
          <div className="capability-index">
            {capabilities.map(([name, description], index) => (
              <article key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{name}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="simulation-section section-pad" id="simulation">
          <SectionLead index="03">Interactive product simulation</SectionLead>
          <div className="simulation-heading">
            <div><span className="live-chip"><i /> System demonstration</span><h2>A city-scale event,<br />as a living system.</h2></div>
            <p>Change the operating scenario. Watch movement, pressure, prediction, and action update together.</p>
          </div>
          <DigitalTwin scenarios={scenarios} />
        </section>

        <section className="pipeline-section section-pad">
          <SectionLead index="04">The intelligence loop</SectionLead>
          <div className="pipeline-intro">
            <h2>Signals become decisions.</h2>
            <p>JakSambung is designed to move teams beyond passive monitoring toward coordinated action.</p>
          </div>
          <ol className="pipeline-list">
            {pipeline.map((step, index) => (
              <li key={step.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.name}</h3><p>{step.detail}</p>
                {index < pipeline.length - 1 && <i aria-hidden="true">↓</i>}
              </li>
            ))}
          </ol>
        </section>

        <section className="lifecycle-section section-pad">
          <SectionLead index="05">Across the event lifecycle</SectionLead>
          <div className="lifecycle-list">
            {lifecycle.map((item, index) => (
              <article key={item.phase}>
                <span className="phase-index">0{index + 1}</span>
                <div><small>{item.phase}</small><h3>{item.title}</h3></div>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="scenarios-section section-pad">
          <SectionLead index="06">Scenario studies</SectionLead>
          <div className="scenario-heading"><h2>Built for density<br />in motion.</h2><p>Illustrative operating contexts, not customer deployments.</p></div>
          <div className="scenario-studies">
            {useCases.map(([number, title, description], index) => (
              <article key={title}>
                <div className={`scenario-graphic graphic-${index + 1}`} aria-hidden="true"><span>{number}</span><i /><i /><i /></div>
                <div className="scenario-meta"><span>Simulated scenario</span><span>{number} / 04</span></div>
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
          <p className="use-case-line">Running events / Concerts / Music festivals / Stadiums / Exhibitions / Cultural events / Public celebrations / Tourism districts</p>
        </section>

        <section className="privacy-section section-pad" id="privacy">
          <SectionLead index="07">Privacy by design</SectionLead>
          <div className="privacy-grid">
            <div className="privacy-statement">
              <div className="privacy-symbol" aria-hidden="true"><span /><i /></div>
              <h2>Understand movement.<br />Not identities.</h2>
              <p>Designed with privacy-by-design principles. JakSambung can operate on aggregated and anonymous spatial signals. No facial recognition required.</p>
              <a className="text-link" href="/privacy">Read our website privacy notice <Arrow /></a>
            </div>
            <div className="privacy-principles">
              {[
                ["Data minimization", "Use the spatial signals required for an operational purpose, not identity profiles."],
                ["Edge processing", "Create a path for processing near data sources when the architecture requires it."],
                ["Configurable retention", "Align retention with operational need rather than storing signals indefinitely."],
                ["Anonymous telemetry", "Measure system behavior without turning people into persistent identifiers."],
              ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="origin-section section-pad" id="origin">
          <SectionLead index="08">Jakarta to the world</SectionLead>
          <div className="origin-grid">
            <div className="origin-manifesto"><h2>Learn in Jakarta.<br />Validate in Berlin.<br /><span>Scale globally.</span></h2></div>
            <div className="origin-map" aria-hidden="true">
              <span className="origin-city jakarta">JKT<i /></span><span className="origin-city berlin">BER<i /></span>
              <svg viewBox="0 0 500 180"><path d="M40 135 C170 190 280 -20 460 54" /><circle cx="40" cy="135" r="4"/><circle cx="460" cy="54" r="4"/></svg>
            </div>
          </div>
          <div className="origin-notes">
            <article><span>Jakarta / learn</span><p>A potential living laboratory for dense, multimodal urban movement and mass-event operations.</p></article>
            <article><span>Berlin / validate</span><p>An opportunity for cross-border validation, smart-city collaboration, applied AI, and mobility ecosystem exploration.</p></article>
            <article><span>Global / scale</span><p>A city-agnostic operating model for temporary density wherever events meet urban infrastructure.</p></article>
          </div>
          <p className="disclaimer">Exploration narrative only. No institutional partnerships are implied.</p>
        </section>

        <section className="customers-section section-pad">
          <SectionLead index="09">Who it is for</SectionLead>
          <div className="customers-grid">
            <h2>One system.<br />Many operators.</h2>
            <div>{customerGroups.map(([name, value], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{value}</p></article>)}</div>
          </div>
        </section>

        <section className="team-section section-pad">
          <SectionLead index="10">Founding team</SectionLead>
          <div className="team-heading"><h2>Building from the city<br />we know firsthand.</h2><p>JakSambung is being shaped by a founding team in Jakarta, connecting technology with real urban operating challenges.</p></div>
          <div className="team-list">
            {siteConfig.foundingTeam.map((person, index) => (
              <a key={person.name} href={person.linkedIn} target="_blank" rel="noreferrer">
                <span>0{index + 1}</span><strong>{person.name}</strong><small>Founding team</small><i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <SectionLead index="11">Pilot with JakSambung</SectionLead>
          <div className="contact-grid">
            <div className="contact-copy">
              <h2>Bring your event.<br />Map the movement.</h2>
              <p>We are looking for pilot contexts where event operations, public space, and urban mobility need a shared spatial picture.</p>
              <a className="whatsapp-link" href={pilotWhatsAppUrl} target="_blank" rel="noreferrer">
                <span>Direct founder contact via WhatsApp</span><strong>{siteConfig.founderWhatsAppDisplay}</strong><i aria-hidden="true">↗</i>
              </a>
            </div>
            <PilotForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><BrandMark /><p>Spatial intelligence for city-scale events.</p></div>
        <div className="footer-links"><a href="#platform">Platform</a><a href="#simulation">Simulation</a><a href="#privacy">Privacy</a><a href="#origin">Origin</a></div>
        <div className="footer-links"><a href="/privacy">Privacy notice</a><a href={pilotWhatsAppUrl} target="_blank" rel="noreferrer">WhatsApp</a><a href="#contact">Discuss a pilot</a></div>
        <div className="footer-bottom"><span>Jakarta, Indonesia / Cities worldwide</span><span>Early-stage product prototype</span><span>© {new Date().getFullYear()} JakSambung</span></div>
      </footer>
    </>
  );
}
