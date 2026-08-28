import { createContext, useContext, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Download, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { experience, experienceEs, profile, signals, signalsEs, skills, skillsEs } from './data/profile';

type Language = 'en' | 'es';
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'en', setLanguage: () => undefined });
const useLanguage = () => useContext(LanguageContext);

function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const onHome = location.pathname === '/';
  const links = onHome
    ? [['#work', language === 'en' ? 'Work' : 'Trabajo'], ['#experience', language === 'en' ? 'Experience' : 'Experiencia'], ['#about', language === 'en' ? 'About' : 'Sobre mí']]
    : [['/', language === 'en' ? 'Home' : 'Inicio'], ['/#work', language === 'en' ? 'Work' : 'Trabajo'], ['/#experience', language === 'en' ? 'Experience' : 'Experiencia']];

  return <>
    <style>{`
      .header-right { display:flex; align-items:center; gap:22px; }
      .availability-pill {
        position:relative; display:inline-flex; align-items:center; gap:9px; min-height:36px; padding:0 13px;
        border:1px solid rgba(17,17,17,.16); border-radius:999px; background:rgba(244,243,239,.72);
        color:#292a27; font-size:10px; font-weight:600; letter-spacing:.09em; white-space:nowrap;
        backdrop-filter:blur(12px); transition:border-color .25s ease, background .25s ease, transform .25s ease;
        animation:availability-enter .65s cubic-bezier(.22,1,.36,1) .25s both;
      }
      .availability-pill:hover { border-color:rgba(17,17,17,.34); background:rgba(255,255,255,.48); transform:translateY(-1px); }
      .availability-light { position:relative; width:8px; height:8px; flex:0 0 8px; border-radius:50%; background:#23c968; box-shadow:0 0 0 1px rgba(35,201,104,.18), 0 0 8px rgba(35,201,104,.55); }
      .availability-light::after { content:''; position:absolute; inset:-5px; border:1px solid rgba(35,201,104,.5); border-radius:50%; animation:availability-pulse 2.2s cubic-bezier(.2,.7,.2,1) infinite; }
      .language-toggle { display:flex; align-items:center; gap:5px; font-size:10px; letter-spacing:.08em; color:#6f706d; white-space:nowrap; }
      .language-toggle button { border:0; background:transparent; padding:4px 2px; font-size:10px; letter-spacing:.08em; color:#6f706d; cursor:pointer; }
      .language-toggle button.active { color:#111; font-weight:600; }
      .hero-portrait { margin:0 0 28px; }
      .hero-portrait img { display:block; width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; object-position:center 42%; filter:grayscale(100%); }
      .hero-portrait figcaption { font-size:9px; letter-spacing:.1em; color:#6f706d; margin-top:8px; }
      .resume-bullets { list-style:none; padding:0; margin:9px 0 0; display:flex; flex-direction:column; gap:4px; }
      .resume-bullets li { position:relative; padding-left:12px; font-size:10px; line-height:1.35; color:#555652; }
      .resume-bullets li::before { content:'–'; position:absolute; left:0; color:#1769ff; }
      .resume-signal-label { display:block; font-size:8px; letter-spacing:.1em; color:#7b7c78; margin-bottom:5px; }
      .resume-selected .resume-item h3 { margin-bottom:4px; }
      .resume-selected .resume-work-title { color:#111; font-weight:500; margin-bottom:7px; }
      .resume-selected .resume-work-body { font-size:10px; line-height:1.35; color:#555652; }
      .resume-selected .resume-bullets { margin-top:7px; }
      .resume-earlier { border-top:1px solid #111; margin-top:28px; padding-top:15px; }
      .resume-earlier-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:28px; }
      .resume-earlier-item { border-top:1px solid #d7d5ce; padding-top:10px; }
      .resume-earlier-item h3 { font-size:14px; font-weight:500; margin:0 0 3px; }
      .resume-earlier-item .resume-role { font-size:10px; color:#111; margin:0 0 6px; }
      .resume-earlier-item p { font-size:10px; line-height:1.35; color:#6f706d; margin:0; }
      .resume-skills-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
      .resume-skill-group h3 { font-size:9px; letter-spacing:.1em; margin:0 0 6px; }
      .resume-skill-group p { font-size:10px; line-height:1.45; color:#555652; }
      @keyframes availability-enter { from { opacity:0; transform:translateY(-7px) scale(.97); filter:blur(3px); } to { opacity:1; transform:translateY(0) scale(1); filter:blur(0); } }
      @keyframes availability-pulse { 0% { opacity:.8; transform:scale(.55); } 65%,100% { opacity:0; transform:scale(1.45); } }
      @media (max-width:980px) and (min-width:761px) { .availability-pill { padding:0 10px; } .availability-label { display:none; } }
      @media (max-width:760px) {
        .header-right { gap:10px; } .availability-pill { min-height:32px; padding:0 10px; font-size:9px; } .availability-label { display:inline; }
        .resume-earlier-grid,.resume-skills-grid { grid-template-columns:1fr; gap:16px; }
      }
      @media (max-width:430px) { .availability-pill { padding:0 9px; } .availability-label { display:none; } }
      @media print {
        @page { size:A4; margin:10mm 11mm; }
        body { background:#fff !important; }
        .site-header,.resume-actions { display:none !important; }
        .resume-page { max-width:none !important; min-height:0 !important; padding:0 !important; margin:0 !important; background:#fff !important; }
        .resume-header h1 { font-size:42px !important; margin:10px 0 5px !important; }
        .resume-position { font-size:10px !important; margin:0 !important; }
        .resume-contact { font-size:7.8px !important; line-height:1.42 !important; }
        .resume-rule { margin:14px 0 10px !important; }
        .resume-summary { grid-template-columns:21% 1fr !important; gap:12px !important; }
        .resume-summary p { font-size:10.5px !important; line-height:1.2 !important; max-width:none !important; }
        .resume-columns { grid-template-columns:1fr 1fr !important; gap:22px !important; margin-top:18px !important; }
        .resume-page h2 { font-size:7.5px !important; margin-bottom:7px !important; }
        .resume-item { padding:7px 0 8px !important; break-inside:avoid; }
        .resume-item h3 { font-size:12px !important; margin-bottom:2px !important; }
        .resume-item p,.resume-selected .resume-work-body { font-size:7.8px !important; line-height:1.28 !important; }
        .resume-signal-label,.resume-date { font-size:6.7px !important; margin-bottom:4px !important; }
        .resume-bullets { gap:2px !important; margin-top:4px !important; }
        .resume-bullets li { font-size:7px !important; line-height:1.22 !important; padding-left:9px !important; }
        .resume-earlier { margin-top:12px !important; padding-top:7px !important; }
        .resume-earlier-grid { gap:14px !important; }
        .resume-earlier-item { padding-top:6px !important; break-inside:avoid; }
        .resume-earlier-item h3 { font-size:9.5px !important; }
        .resume-earlier-item .resume-role,.resume-earlier-item p { font-size:7px !important; line-height:1.22 !important; }
        .resume-skills { margin-top:12px !important; padding-top:7px !important; }
        .resume-skills-grid { grid-template-columns:repeat(4,1fr) !important; gap:10px !important; }
        .resume-skill-group h3 { font-size:6.8px !important; margin-bottom:3px !important; }
        .resume-skill-group p { font-size:6.8px !important; line-height:1.28 !important; }
      }
      @media (prefers-reduced-motion: reduce) { .availability-pill { animation:none; } .availability-light::after { animation:none; opacity:.35; } }
    `}</style>
    <header className="site-header">
      <Link className="wordmark" to="/" onClick={() => setOpen(false)}>ULISES FRÍAS<span className="dot">.</span></Link>
      <div className="header-right">
        <nav className={open ? 'nav open' : 'nav'}>
          {links.map(([href, label]) => href.startsWith('#')
            ? <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            : <Link key={href} to={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12}/></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12}/></a>
          <Link className="nav-cv" to="/resume" onClick={() => setOpen(false)}>{language === 'en' ? 'Download CV' : 'Descargar CV'} <Download size={13}/></Link>
          <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>{language === 'en' ? 'Contact' : 'Contacto'} <ArrowUpRight size={12}/></a>
        </nav>
        <a className="availability-pill" href={onHome ? '#contact' : '/#contact'} aria-label={language === 'en' ? 'Available for work — go to contact section' : 'Disponible para trabajar — ir a contacto'}>
          <span className="availability-light" aria-hidden="true" />
          <span className="availability-label">{language === 'en' ? 'AVAILABLE FOR WORK' : 'DISPONIBLE PARA TRABAJAR'}</span>
        </a>
        <div className="language-toggle" aria-label={language === 'en' ? 'Language selector' : 'Selector de idioma'}><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button><span>/</span><button className={language === 'es' ? 'active' : ''} onClick={() => setLanguage('es')} aria-pressed={language === 'es'}>ES</button></div>
        <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </header>
  </>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span className="eyebrow-line" />{children}</p>;
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Home() {
  const { language } = useLanguage();
  const es = language === 'es';
  const displayedSignals = es ? signalsEs : signals;
  const displayedExperience = es ? experienceEs : experience;
  const displayedSkills = es ? skillsEs : skills;

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <>
    <Header />
    <main>
      <section className="hero section-pad" aria-labelledby="hero-title">
        <div className="hero-meta"><Eyebrow>{es ? 'IMPLEMENTACIÓN DE IA · SISTEMAS AGÉNTICOS · PRODUCTO' : 'AI DEPLOYMENT · AGENTIC SYSTEMS · PRODUCT'}</Eyebrow><span className="hero-index">01 / 11</span></div>
        <div className="hero-grid">
          <h1 id="hero-title">{es ? <>Convierto <em>problemas ambiguos de negocio</em> en sistemas de IA implementables.</> : <>I turn <em>ambiguous business problems</em> into implementable AI systems.</>}</h1>
          <div className="hero-aside">
            <figure className="hero-portrait"><img src="/ulises-portrait.jpg" alt="Ulises Frías" loading="eager" width="1600" height="900" /><figcaption>{es ? 'ULISES FRÍAS / AI DEPLOYMENT' : 'ULISES FRÍAS / AI DEPLOYMENT'}</figcaption></figure>
            <p className="hero-kicker">{es ? <>Constructor · Operador<br/>Frente al cliente</> : <>Builder · Operator<br/>Customer-facing</>}</p>
            <p className="hero-copy">{es ? 'Constructor de AI deployment y fundador trabajando en la intersección entre problemas del cliente, sistemas técnicos y producto.' : 'AI deployment builder and founder working at the intersection of customer problems, technical systems and product.'}</p>
            <p className="hero-copy">{es ? 'Trabajo directamente con empresas para convertir necesidades operativas ambiguas en workflows implementables: desde discovery y mapeo hasta diseño de solución, prototipado y entrega.' : 'I work directly with businesses to turn ambiguous operational needs into implementable AI workflows — from discovery and workflow mapping through solution design, prototyping and delivery.'}</p>
          </div>
        </div>
        <div className="hero-footer">
          <p>{es ? 'México · Inglés / Español' : profile.location}<br/>{es ? 'Disponible para roles globales de implementación de IA' : profile.status}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">{es ? 'Ver trabajo seleccionado' : 'View selected work'} <ArrowDownRight size={16}/></a>
            <Link className="button button-light" to="/resume">{es ? 'Ver / guardar CV' : 'View / save résumé'} <Download size={15}/></Link>
          </div>
        </div>
      </section>

      <section id="work" className="signals section-pad section-rule" aria-labelledby="signals-title">
        <div className="section-heading"><Eyebrow>{es ? 'TRABAJO SELECCIONADO' : 'SELECTED WORK'}</Eyebrow><span className="section-number">02 / 11</span></div>
        <div className="signals-intro">
          <h2 id="signals-title">{es ? <>Diagnosticar.<br/><span>Entregar.</span><br/>Construir.</> : <>Diagnose.<br/><span>Deliver.</span><br/>Build.</>}</h2>
          <p>{es ? 'La secuencia es intencional: entender la operación, convertir requerimientos reales en entrega, construir sistemas, hacerse cargo del cliente y habilitar a los usuarios.' : 'The sequence is intentional: understand the operation, turn real requirements into delivery, build systems, own the customer, and enable users.'}</p>
        </div>
        <div className="signal-list">
          {displayedSignals.map(signal => <Reveal className="signal" key={signal.name}>
            <span className="signal-number">{signal.number}</span>
            <div className="signal-name">{signal.name}<small>{signal.label}</small></div>
            <h3>{signal.title}</h3>
            <p>{signal.body}</p>
            <ArrowUpRight className="signal-arrow" size={20}/>
          </Reveal>)}
        </div>
      </section>

      <section className="case-study section-pad section-rule" aria-labelledby="bosur-title">
        <div className="section-heading"><Eyebrow>{es ? 'CASO DESTACADO / 01' : 'FEATURED CASE STUDY / 01'}</Eyebrow><span className="section-number">03 / 11</span></div>
        <div className="case-header">
          <h2 id="bosur-title">BOSUR<span className="dot">.</span></h2>
          <p>{es ? 'Diagnosticar el negocio antes de decidir qué construir.' : 'Diagnose the business before deciding what to build.'}</p>
        </div>
        <div className="case-layout">
          <div className="case-statement">
            <Eyebrow>{es ? 'FASE 0 PAGADA' : 'PAID PHASE 0'}</Eyebrow>
            <p>{es ? 'El trabajo fue convertir una operación industrial basada en formatos, cumplimiento y procesos distribuidos en un alcance técnico coherente para una plataforma futura.' : 'The work was to turn an industrial operation built around forms, compliance and distributed processes into a coherent technical scope for a future platform.'}</p>
            <div className="case-role"><span>{es ? 'ALCANCE' : 'SCOPE'}</span><strong>{es ? 'Discovery con cliente → mapeo de workflows → arquitectura de solución → alcance de implementación' : 'Customer discovery → workflow mapping → solution architecture → implementation scope'}</strong></div>
          </div>
          <div className="architecture">
            <Eyebrow>{es ? 'DE OPERACIÓN A ARQUITECTURA' : 'OPERATION TO ARCHITECTURE'}</Eyebrow>
            <div className="arch-stack">
              {(es ? ['33 formatos fuente', 'Clasificación funcional', '~8 módulos', '~18–20 workflows', 'Experiencia tablet-first', 'Datos · Alertas · IoT', 'Capa agéntica / alcance'] : ['33 source forms', 'Functional classification', '~8 modules', '~18–20 workflows', 'Tablet-first experience', 'Data · Alerts · IoT', 'Agentic layer / scope']).map((item, i) =>
                <div key={item} className={`arch-node node-${i}`}><span>0{i + 1}</span>{item}</div>,
              )}
            </div>
          </div>
        </div>
        <div className="case-bottom">
          <div><Eyebrow>{es ? 'EVIDENCIA' : 'EVIDENCE'}</Eyebrow><p>{es ? '33 formatos operativos y de compliance revisados y clasificados funcionalmente.' : '33 operational and compliance forms reviewed and functionally classified.'}</p></div>
          <div><Eyebrow>{es ? 'SOLUCIÓN PROPUESTA' : 'PROPOSED SOLUTION'}</Eyebrow><p>{es ? 'Arquitectura tablet-first con datos estructurados, evidencia de auditoría, alertas, IoT de temperatura y una capa agéntica.' : 'Tablet-first architecture with structured data, audit evidence, alerts, IoT temperature sensing and an agentic layer.'}</p></div>
          <div className="case-links"><strong>{es ? 'La implementación todavía no se presenta como completada.' : 'Implementation is not yet claimed.'}</strong></div>
        </div>
      </section>

      <section className="split-section section-pad section-rule" aria-labelledby="real-world-title">
        <div className="section-heading"><Eyebrow>{es ? 'ENTREGA / 02' : 'DELIVERY / 02'}</Eyebrow><span className="section-number">04 / 11</span></div>
        <div className="split-grid">
          <div className="split-title"><h2 id="real-world-title">{es ? 'IA dentro de trabajo comercial real.' : 'AI inside real commercial work.'}</h2></div>
          <div className="split-copy">
            <p className="lead">{es ? <>Requerimiento <span>→</span> viabilidad <span>→</span> workflow <span>→</span> producción <span>→</span> entrega.</> : <>Requirement <span>→</span> feasibility <span>→</span> workflow <span>→</span> production <span>→</span> delivery.</>}</p>
            <p>{es ? 'En Big Media trabajo entre contexto comercial, creativo y de producción. El punto de partida no es “usar una herramienta de IA”, sino entender qué necesita la campaña, qué esperan los stakeholders y qué puede ejecutarse de forma realista.' : 'At Big Media I work across commercial, creative and production contexts. The starting point is not “use an AI tool”; it is understanding what the campaign needs, what stakeholders expect and what can realistically be executed.'}</p>
            <p>{es ? 'Convierto esos requerimientos en workflows de IA técnicamente viables y trabajo dentro de restricciones reales de producción y deadlines de entrega.' : 'I translate those requirements into technically feasible AI workflows and work within real production constraints and delivery deadlines.'}</p>
          </div>
        </div>
      </section>

      <section className="split-section section-pad section-rule" aria-labelledby="agentic-rd-title">
        <div className="section-heading"><Eyebrow>{es ? 'CONSTRUCCIÓN / 03' : 'BUILD / 03'}</Eyebrow><span className="section-number">05 / 11</span></div>
        <div className="split-grid">
          <div className="split-title"><h2 id="agentic-rd-title">{es ? 'También puedo construir el sistema.' : 'I can build the system, too.'}</h2></div>
          <div className="split-copy">
            <p className="lead">{es ? 'I+D independiente en sistemas agénticos.' : 'Independent R&D in agentic systems.'}</p>
            <p>{es ? 'Estoy construyendo un sistema con Python, FastAPI y APIs REST para coordinar workflows de agentes y ejecución de workers. Conecta herramientas mediante APIs y MCP, mantiene memoria y agrega puntos explícitos de control humano.' : 'I am building a system with Python, FastAPI and REST APIs to coordinate agent workflows and worker execution. It connects tools through APIs and MCP, maintains memory and adds explicit human control points.'}</p>
            <div className="mini-list">
              <span>01 / {es ? 'Orquestación de agentes · ejecución de workers' : 'Agent orchestration · worker execution'}</span>
              <span>02 / {es ? 'Tool calling · APIs · MCP · memoria' : 'Tool calling · APIs · MCP · memory'}</span>
              <span>03 / {es ? 'Aprobaciones humanas · permisos' : 'Human approvals · permissions'}</span>
              <span>04 / {es ? 'Ejecución trazable para trabajo autónomo controlado' : 'Traceable execution for controlled autonomous work'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="split-section founder section-pad section-rule" aria-labelledby="founder-title">
        <div className="section-heading"><Eyebrow>{es ? 'RESPONSABILIDAD / 04' : 'OWNERSHIP / 04'}</Eyebrow><span className="section-number">06 / 11</span></div>
        <div className="split-grid">
          <div className="split-title"><h2 id="founder-title">{es ? 'Hacerse cargo del cliente.' : 'Own the customer.'}</h2></div>
          <div className="split-copy">
            <p className="lead">{es ? 'Antes de AI deployment, hubo años de discovery, scoping, conversaciones comerciales y entrega.' : 'Before AI deployment, there were years of discovery, scoping, commercial conversations and delivery.'}</p>
            <p>{es ? 'Cofundé EVO Studios como una productora y empresa de publicidad. Durante años trabajé directamente con clientes desde el brief y la conversación comercial hasta el alcance, la ejecución y la entrega. Más adelante, la empresa evolucionó hacia workflows impulsados por IA, implementación y educación.' : 'I co-founded EVO Studios as a production and advertising company. For years I worked directly with customers from brief and commercial conversation through scoping, execution and delivery. The company later evolved toward AI-powered workflows, implementation and education.'}</p>
            <div className="mini-list">
              <span>01 / {es ? 'Discovery con clientes' : 'Customer discovery'}</span>
              <span>02 / {es ? 'Conversaciones comerciales' : 'Commercial conversations'}</span>
              <span>03 / {es ? 'Scoping y viabilidad' : 'Scoping and feasibility'}</span>
              <span>04 / {es ? 'Entrega de punta a punta' : 'End-to-end delivery'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="speaking section-pad section-rule" aria-labelledby="speaking-title">
        <div className="section-heading"><Eyebrow>{es ? 'ENABLEMENT / 05' : 'ENABLEMENT / 05'}</Eyebrow><span className="section-number">07 / 11</span></div>
        <div className="speaking-grid">
          <h2 id="speaking-title">{es ? <>Hacer la IA <em>utilizable</em> también es deployment.</> : <>Making AI <em>usable</em> is part of deployment.</>}</h2>
          <div>
            <p>{es ? 'EVO AI Campus / Cinematic AI reunió a 40 dueños de negocio en Ciudad Juárez en una sesión pagada de aproximadamente US$150 por asistente.' : 'EVO AI Campus / Cinematic AI brought 40 business owners together in Ciudad Juárez for a paid live session at approximately US$150 per attendee.'}</p>
            <p>{es ? 'La sesión se enfocó en workflows prácticos de IA generativa: explicar tecnología emergente de forma suficientemente clara para que otras personas puedan aplicarla.' : 'The session focused on practical generative AI workflows: making emerging technology clear enough for other people to apply it.'}</p>
            <div className="attendee"><strong>40</strong><span>{es ? <>dueños de negocio<br/>sesión pagada en vivo</> : <>business owners<br/>paid live session</>}</span></div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience section-pad section-rule" aria-labelledby="experience-title">
        <div className="section-heading"><Eyebrow>{es ? 'EXPERIENCIA' : 'EXPERIENCE'}</Eyebrow><span className="section-number">08 / 11</span></div>
        <div className="experience-heading">
          <h2 id="experience-title">{es ? <>Un camino construido<br/>alrededor de la <em>responsabilidad.</em></> : <>A path built<br/>around <em>ownership.</em></>}</h2>
          <p>{es ? 'Desde producción y clientes hasta producto y sistemas de IA: el patrón ha sido entender el problema, definir una solución viable y llevarla a una entrega concreta.' : 'From production and customers to product and AI systems, the recurring pattern has been understanding the problem, defining a viable solution and carrying it through to concrete delivery.'}</p>
        </div>
        <div className="timeline">
          {displayedExperience.map(item => <Reveal className="timeline-item" key={`${item.company}-${item.year}`}>
            <div className="timeline-date">{item.year}</div>
            <div>
              <h3>{item.company}</h3>
              <p className="role">{item.role}</p>
              <p>{item.description}</p>
              <ul>{item.bullets.map(b => <li key={b}><Check size={14}/>{b}</li>)}</ul>
            </div>
          </Reveal>)}
        </div>
      </section>

      <section className="capabilities section-pad section-rule" aria-labelledby="capabilities-title">
        <div className="section-heading"><Eyebrow>{es ? 'CAPACIDADES' : 'CAPABILITIES'}</Eyebrow><span className="section-number">09 / 11</span></div>
        <div className="capabilities-head">
          <h2 id="capabilities-title">{es ? <>Técnico.<br/><em>Customer-facing.</em></> : <>Technical.<br/><em>Customer-facing.</em></>}</h2>
          <p>{es ? 'Fluidez técnica suficiente para prototipar e integrar; experiencia de cliente suficiente para descubrir, estructurar y comunicar qué vale la pena construir.' : 'Enough technical fluency to prototype and integrate; enough customer experience to discover, structure and communicate what is worth building.'}</p>
        </div>
        <div className="skill-grid">
          {Object.entries(displayedSkills).map(([group, items]) => <div className="skill-group" key={group}>
            <h3>{group}</h3>
            <div>{items.map(item => <span key={item}>{item}</span>)}</div>
          </div>)}
        </div>
      </section>

      <section id="about" className="about section-pad section-rule" aria-labelledby="about-title">
        <div className="section-heading"><Eyebrow>{es ? 'POSICIONAMIENTO' : 'POSITIONING'}</Eyebrow><span className="section-number">10 / 11</span></div>
        <div className="about-grid">
          <h2 id="about-title">{es ? 'Trabajo entre quienes viven el problema y quienes construyen el sistema.' : 'I work between the people living the problem and the people building the system.'}</h2>
          <div>
            <p>{es ? 'Mi trabajo empieza con contexto: qué hace realmente el negocio, dónde se rompe el workflow, qué necesita el usuario y qué resultado importa. Después viene la arquitectura, el prototipo y la entrega.' : 'My work starts with context: what the business actually does, where the workflow breaks, what the user needs and what outcome matters. Then come architecture, prototyping and delivery.'}</p>
            <p>{es ? 'Mi experiencia cruza emprendimiento, producto, trabajo con clientes, sistemas de IA y tecnología creativa. Esa combinación es la razón por la que AI deployment, Deployment Strategy y Solutions Engineering encajan de forma natural.' : 'My background crosses entrepreneurship, product, customer work, AI systems and creative technology. That combination is why AI Deployment, Deployment Strategy and Solutions Engineering are a natural fit.'}</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-pad" aria-labelledby="contact-title">
        <div className="contact-top"><Eyebrow>{es ? 'HABLEMOS' : "LET'S TALK"}</Eyebrow><span className="section-number">11 / 11</span></div>
        <h2 id="contact-title">{es ? <>Del problema ambiguo al <em>plan técnico ejecutable.</em></> : <>From ambiguous problem to <em>executable technical plan.</em></>}</h2>
        <p>{es ? 'Abierto a conversaciones sobre AI Deployment, Deployment Strategy, Enterprise Solutions, Forward Deployed Engineering y sistemas agénticos.' : 'Open to conversations around AI Deployment, Deployment Strategy, Enterprise Solutions, Forward Deployed Engineering and agentic systems.'}</p>
        <div className="contact-actions">
          <a className="button button-dark" href={`mailto:${profile.email}`}>{es ? 'Escribir a Ulises' : 'Email Ulises'} <Mail size={16}/></a>
          <a className="button button-light" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a>
          <Link className="button button-light" to="/resume">{es ? 'Ver / guardar CV' : 'View / save CV'} <Download size={15}/></Link>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}

function Resume() {
  const { language } = useLanguage();
  const es = language === 'es';
  const displayedSignals = es ? signalsEs : signals;
  const displayedExperience = es ? experienceEs : experience;
  const displayedSkills = es ? skillsEs : skills;
  const primaryWork = displayedSignals.slice(0, 3);
  const currentExperience = displayedExperience.slice(0, 3);
  const earlierExperience = displayedExperience.slice(3);

  return <>
    <Header/>
    <main className="resume-page">
      <div className="resume-actions">
        <Link to="/">← {es ? 'Volver al sitio' : 'Back to site'}</Link>
        <button onClick={() => window.print()} title={es ? 'Abrir el diálogo de impresión para guardar como PDF' : 'Open the print dialog to save as PDF'}><Download size={14}/> {es ? 'Imprimir / Guardar PDF' : 'Print / Save PDF'}</button>
      </div>
      <section className="resume-header">
        <div>
          <p className="eyebrow">{es ? 'IMPLEMENTACIÓN DE IA · SISTEMAS AGÉNTICOS · PRODUCTO' : 'AI DEPLOYMENT · AGENTIC SYSTEMS · PRODUCT'}</p>
          <h1>Ulises Frías</h1>
          <p className="resume-position">{es ? 'Constructor · Operador · Frente al cliente' : 'Builder · Operator · Customer-facing'}</p>
        </div>
        <div className="resume-contact">
          {es ? 'México · Inglés / Español' : 'Mexico · English / Spanish'}<br/>
          <a href={`mailto:${profile.email}`}>{profile.email}</a><br/>
          <a href={profile.portfolio}>ulises-frias-cv.pages.dev</a><br/>
          <a href={profile.linkedin}>LinkedIn · Ulises Frías</a><br/>
          <a href={profile.github}>github.com/im-ulises</a>
        </div>
      </section>
      <div className="resume-rule"/>
      <section className="resume-summary">
        <h2>{es ? 'Perfil' : 'Profile'}</h2>
        <p>{es ? 'Constructor de AI deployment y fundador trabajando entre problemas del cliente, sistemas técnicos y producto. Trabajo directamente con empresas para convertir necesidades operativas ambiguas en workflows implementables, desde discovery y mapeo hasta diseño de solución, prototipado y entrega.' : 'AI deployment builder and founder working at the intersection of customer problems, technical systems and product. I work directly with businesses to turn ambiguous operational needs into implementable AI workflows, from discovery and workflow mapping through solution design, prototyping and delivery.'}</p>
      </section>
      <div className="resume-columns">
        <section className="resume-selected">
          <h2>{es ? 'Trabajo seleccionado' : 'Selected work'}</h2>
          {primaryWork.map(s => <div className="resume-item" key={s.name}>
            <span className="resume-signal-label">{s.number} · {s.label}</span>
            <h3>{s.name}</h3>
            <p className="resume-work-title">{s.title}</p>
            <p className="resume-work-body">{s.body}</p>
            <ul className="resume-bullets">{s.proof.map(item => <li key={item}>{item}</li>)}</ul>
          </div>)}
        </section>
        <section>
          <h2>{es ? 'Experiencia reciente' : 'Recent experience'}</h2>
          {currentExperience.map(item => <div className="resume-item" key={`${item.company}-${item.year}`}>
            <div className="resume-date">{item.year}</div>
            <h3>{item.company}</h3>
            <p className="resume-role">{item.role}</p>
            <p>{item.description}</p>
            <ul className="resume-bullets">{item.bullets.map(b => <li key={b}>{b}</li>)}</ul>
          </div>)}
        </section>
      </div>

      <section className="resume-earlier">
        <h2>{es ? 'Experiencia anterior' : 'Earlier experience'}</h2>
        <div className="resume-earlier-grid">
          {earlierExperience.map(item => <div className="resume-earlier-item" key={`${item.company}-${item.year}`}>
            <div className="resume-date">{item.year}</div>
            <h3>{item.company}</h3>
            <p className="resume-role">{item.role}</p>
            <p>{item.description}</p>
          </div>)}
        </div>
      </section>

      <section className="resume-skills">
        <h2>{es ? 'Capacidades principales' : 'Core capabilities'}</h2>
        <div className="resume-skills-grid">
          {Object.entries(displayedSkills).map(([group, items]) => <div className="resume-skill-group" key={group}>
            <h3>{group}</h3>
            <p>{items.join(' · ')}</p>
          </div>)}
        </div>
      </section>
    </main>
  </>;
}

function Footer() {
  const { language } = useLanguage();
  return <footer className="footer section-pad">
    <span>Ulises Frías<span className="dot">.</span></span>
    <span>{language === 'es' ? 'México' : 'Mexico'}</span>
    <div><a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a><a href={`mailto:${profile.email}`}>{language === 'es' ? 'Correo' : 'Email'}</a></div>
    <span>{language === 'es' ? 'Implementación de IA · Sistemas agénticos · Producto' : 'AI Deployment · Agentic Systems · Product'}</span>
  </footer>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    return window.localStorage.getItem('ulises-language') === 'es' ? 'es' : 'en';
  });
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem('ulises-language', language);
  }, [language]);

  useEffect(() => {
    const onResume = location.pathname === '/resume';
    const title = onResume
      ? `Ulises Frías — ${language === 'es' ? 'CV · AI Deployment' : 'Résumé · AI Deployment'}`
      : 'Ulises Frías — AI Deployment · Agentic Systems · Product';
    const description = language === 'es'
      ? 'Constructor de AI deployment y fundador: customer discovery, workflow mapping, arquitectura de soluciones, sistemas agénticos y entrega customer-facing.'
      : 'AI deployment builder and founder: customer discovery, workflow mapping, solution architecture, agentic systems and customer-facing delivery.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [language, location.pathname]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>
    {location.pathname === '/resume' ? <Resume/> : <Home/>}
  </LanguageContext.Provider>;
}
