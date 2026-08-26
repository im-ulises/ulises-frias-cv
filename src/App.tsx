import { useEffect } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Download, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { experience, profile, signals, skills } from './data/profile';
import { useState } from 'react';

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const links = onHome ? [['#work', 'Work'], ['#experience', 'Experience'], ['#about', 'About']] : [['/', 'Home'], ['/#work', 'Work'], ['/#experience', 'Experience']];
  return <header className="site-header">
    <Link className="wordmark" to="/" onClick={() => setOpen(false)}>ULISES FRÍAS<span className="dot">.</span></Link>
    <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
    <nav className={open ? 'nav open' : 'nav'}>
      {links.map(([href, label]) => href.startsWith('#') ? <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a> : <Link key={href} to={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12}/></a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12}/></a>
      <Link className="nav-cv" to="/resume" onClick={() => setOpen(false)}>Download CV <Download size={13}/></Link>
      <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>Contact <ArrowUpRight size={12}/></a>
    </nav>
  </header>;
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span className="eyebrow-line" />{children}</p>; }
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <div className={`reveal ${className}`}>{children}</div>; }

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <>
    <Header />
    <main>
      <section className="hero section-pad" aria-labelledby="hero-title">
        <div className="hero-meta"><Eyebrow>AI BUILDER & FOUNDER</Eyebrow><span className="hero-index">01 / 11</span></div>
        <div className="hero-grid">
          <h1 id="hero-title">I build AI systems that turn <em>business problems</em> into deployed workflows.</h1>
          <div className="hero-aside"><p className="hero-kicker">Agentic Systems<br/>Product · Customer Deployment</p><p className="hero-copy">Ulises Frías is a Mexico-based AI builder and founder working at the intersection of autonomous agents, product, customer deployment and generative AI.</p><p className="hero-copy">He builds technical systems while working directly with businesses to discover problems, design solutions, communicate them clearly and take them into production.</p></div>
        </div>
        <div className="hero-footer"><p>{profile.location}<br/>{profile.status}</p><div className="hero-actions"><a className="button button-dark" href="#work">View selected work <ArrowDownRight size={16}/></a><Link className="button button-light" to="/resume">Download résumé <Download size={15}/></Link></div></div>
      </section>

      <section id="work" className="signals section-pad section-rule" aria-labelledby="signals-title">
        <div className="section-heading"><Eyebrow>SELECTED SIGNALS</Eyebrow><span className="section-number">02 / 11</span></div>
        <div className="signals-intro"><h2 id="signals-title">Builder.<br/><span>Operator.</span><br/>Customer-facing.</h2><p>A combination that is useful when the problem is still unclear, the system is still evolving, and someone has to take ownership of getting it into the world.</p></div>
        <div className="signal-list">{signals.map(signal => <Reveal className="signal" key={signal.name}><span className="signal-number">{signal.number}</span><div className="signal-name">{signal.name}<small>{signal.label}</small></div><h3>{signal.title}</h3><p>{signal.body}</p><ArrowUpRight className="signal-arrow" size={20}/></Reveal>)}</div>
      </section>

      <section className="case-study section-pad section-rule" aria-labelledby="crobi-title">
        <div className="section-heading"><Eyebrow>FEATURED CASE STUDY / 01</Eyebrow><span className="section-number">03 / 11</span></div>
        <div className="case-header"><h2 id="crobi-title">Crobi<span className="dot">.</span></h2><p>Run an AI workforce without managing the infrastructure underneath it.</p></div>
        <div className="case-layout"><div className="case-statement"><Eyebrow>THE PROBLEM</Eyebrow><p>Companies want autonomous agents, but production deployment introduces permissions, memory, tools, failures, approvals, audit and infrastructure complexity.</p><div className="case-role"><span>MY ROLE</span><strong>Founder / AI Systems Builder</strong></div></div><div className="architecture"><Eyebrow>CONTROL PLANE / ARCHITECTURE</Eyebrow><div className="arch-stack">{['User / Chief', 'Control Plane', 'Agents · Workflows · Policies', 'Workers', 'Tools · MCP · APIs', 'Evidence · Memory · Audit', 'Approvals / Results'].map((item, i) => <div key={item} className={`arch-node node-${i}`}><span>0{i + 1}</span>{item}</div>)}</div></div></div>
        <div className="case-bottom"><div><Eyebrow>THE APPROACH</Eyebrow><p>Build a control layer that separates user intent from governed execution.</p></div><div><Eyebrow>CURRENT STAGE</Eyebrow><p>Pre-pilot / working system.</p></div><div className="case-links"><a href="https://github.com/im-ulises/crobi-chief" target="_blank" rel="noreferrer">View technical proof <ArrowUpRight size={15}/></a><span className="muted-link">90-sec demo — coming soon</span></div></div>
      </section>

      <section className="split-section section-pad section-rule" aria-labelledby="real-world-title"><div className="section-heading"><Eyebrow>FIELD WORK / 02</Eyebrow><span className="section-number">04 / 11</span></div><div className="split-grid"><div className="split-title"><h2 id="real-world-title">AI in a real commercial environment.</h2></div><div className="split-copy"><p className="lead">Customer problem <span>→</span> solution design <span>→</span> AI workflow <span>→</span> production <span>→</span> delivery.</p><p>At Big Media in Ciudad Juárez, Ulises works across real client requirements, commercial campaigns, generative AI production and implementation.</p><p>The work lives where creative ambition meets technical feasibility: collaborating with sales, production and creative stakeholders to turn an ambiguous idea into something executable.</p><div className="placeholder-note"><span>PROOF TO ADD</span><br/>Verified production time, campaigns delivered, customers served and content volume.</div></div></div></section>

      <section className="split-section founder section-pad section-rule" aria-labelledby="founder-title"><div className="section-heading"><Eyebrow>OWNERSHIP / 03</Eyebrow><span className="section-number">05 / 11</span></div><div className="split-grid"><div className="split-title"><h2 id="founder-title">Founder-level ownership.</h2></div><div className="split-copy"><p className="lead">The job is not only to build. It is to understand what is worth building.</p><p>EVO Studios demonstrates the full loop: acquire customers, understand needs, sell solutions, decide technical feasibility, build the work and deliver the result.</p><div className="mini-list"><span>01 / Customer discovery</span><span>02 / Solution design</span><span>03 / AI workflow development</span><span>04 / Client communication</span></div></div></div></section>

      <section className="speaking section-pad section-rule" aria-labelledby="speaking-title"><div className="section-heading"><Eyebrow>COMMUNICATION / 04</Eyebrow><span className="section-number">06 / 11</span></div><div className="speaking-grid"><h2 id="speaking-title">Explaining AI is part of <em>building AI.</em></h2><div><p>Ulises has delivered live Cinematic AI talks and practical workshops showing professionals how emerging generative AI technology translates into real production workflows.</p><div className="attendee"><strong>40+</strong><span>attendees across<br/>live sessions</span></div></div></div></section>

      <section id="experience" className="experience section-pad section-rule" aria-labelledby="experience-title"><div className="section-heading"><Eyebrow>EXPERIENCE</Eyebrow><span className="section-number">07 / 11</span></div><div className="experience-heading"><h2 id="experience-title">A path built<br/>around <em>ownership.</em></h2><p>Prioritizing outcomes, context and the work required to move from a question to a functioning system.</p></div><div className="timeline">{experience.map(item => <Reveal className="timeline-item" key={item.company}><div className="timeline-date">{item.year}</div><div><h3>{item.company}</h3><p className="role">{item.role}</p><p>{item.description}</p><ul>{item.bullets.map(b => <li key={b}><Check size={14}/>{b}</li>)}</ul></div></Reveal>)}</div></section>

      <section className="capabilities section-pad section-rule" aria-labelledby="capabilities-title"><div className="section-heading"><Eyebrow>CAPABILITIES</Eyebrow><span className="section-number">08 / 11</span></div><div className="capabilities-head"><h2 id="capabilities-title">The useful<br/><em>combination.</em></h2><p>Systems thinking, technical depth, customer empathy and the ability to make the next step clear.</p></div><div className="skill-grid">{Object.entries(skills).map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><div>{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></section>

      <section id="about" className="about section-pad section-rule" aria-labelledby="about-title"><div className="section-heading"><Eyebrow>POSITIONING</Eyebrow><span className="section-number">09 / 11</span></div><div className="about-grid"><h2 id="about-title">I tend to sit between the people defining the problem and the people building the system.</h2><div><p>I enjoy taking messy business requirements, understanding what is actually needed, determining what AI can realistically solve, and turning that into something that works.</p><p>My background crosses entrepreneurship, product, customer work, AI systems and creative technology. That combination is why forward deployment is particularly interesting to me.</p></div></div></section>

      <section className="testimonial section-pad section-rule" aria-labelledby="testimonial-title"><div className="section-heading"><Eyebrow>TESTIMONIALS / COMING SOON</Eyebrow><span className="section-number">10 / 11</span></div><div className="testimonial-box"><span className="quote-mark">“</span><h2 id="testimonial-title">The people who have worked alongside me will tell this part better.</h2><p>Client, collaborator and workshop-attendee perspectives will be added here as verified quotes become available.</p><span className="placeholder-tag">PLACEHOLDER — NO UNSUPPORTED TESTIMONIALS</span></div></section>

      <section className="contact section-pad" aria-labelledby="contact-title"><div className="contact-top"><Eyebrow>LAST THING</Eyebrow><span className="section-number">11 / 11</span></div><h2 id="contact-title">Building AI that survives contact with the real world <em>interests me.</em></h2><p>Currently open to conversations around AI Deployment, Forward Deployed Engineering, Solutions Engineering and agentic systems.</p><div className="contact-actions"><a className="button button-dark" href={`mailto:${profile.email}`}>Email Ulises <Mail size={16}/></a><a className="button button-light" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a><Link className="button button-light" to="/resume">Download CV <Download size={15}/></Link></div></section>
    </main>
    <Footer />
  </>;
}

function Resume() { return <><Header/><main className="resume-page"><div className="resume-actions"><Link to="/">← Back to site</Link><button onClick={() => window.print()}><Download size={14}/> Print / Save PDF</button></div><section className="resume-header"><div><p className="eyebrow">AI BUILDER & FOUNDER</p><h1>Ulises Frías</h1><p className="resume-position">Agentic Systems · Product · Customer Deployment</p></div><div className="resume-contact">Mexico · English / Spanish<br/><a href={`mailto:${profile.email}`}>{profile.email}</a><br/><a href={profile.linkedin}>linkedin.com/in/ulises-frias</a><br/><a href={profile.github}>github.com/im-ulises</a></div></section><div className="resume-rule"/><section className="resume-summary"><h2>Positioning</h2><p>I build AI systems that turn business problems into deployed workflows. My work sits between customer discovery, product thinking, technical systems and production delivery.</p></section><div className="resume-columns"><section><h2>Selected impact</h2>{signals.map(s => <div className="resume-item" key={s.name}><h3>{s.name}</h3><p>{s.title}</p></div>)}</section><section><h2>Experience</h2>{experience.map(item => <div className="resume-item" key={item.company}><div className="resume-date">{item.year}</div><h3>{item.company}</h3><p className="resume-role">{item.role}</p><p>{item.description}</p></div>)}</section></div><section className="resume-skills"><h2>Core capabilities</h2><p>{Object.values(skills).flat().join(' · ')}</p></section></main></> }
function Footer() { return <footer className="footer section-pad"><span>Ulises Frías<span className="dot">.</span></span><span>Mexico</span><div><a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a><a href={`mailto:${profile.email}`}>Email</a></div><span>Built with obsessive attention to detail.</span></footer> }
export default function App() { return useLocation().pathname === '/resume' ? <Resume/> : <Home/>; }
