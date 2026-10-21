import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Download, Code2, BriefcaseBusiness, Mail, Menu, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experience, experienceEs, profile } from './data/profile';
import './portfolio-v2.css';

type Language = 'en' | 'es';
type Props = { language: Language; setLanguage: (language: Language) => void };

const translations = {
  en: {
    navWork: 'Work', navApproach: 'Approach', navExperience: 'Experience', navContact: 'Contact',
    availability: 'OPEN TO GLOBAL ROLES', cv: 'Résumé',
    eyebrow: 'AI DEPLOYMENT  /  ENGINEERING  /  PRODUCT',
    leadFirst: 'AI that works', leadSecond: 'in the real', leadThird: 'world.',
    heroBody: 'I bridge the gap between ambiguous business problems and systems that actually get built. Customer-facing by instinct. Technical by practice.',
    heroButton: 'Explore my work', heroSecondary: 'View résumé',
    heroSide: 'BUILDER · OPERATOR · CUSTOMER-FACING', portrait: 'AI DEPLOYMENT / MEXICO',
    signalOne: 'Operational forms mapped', signalTwo: 'Business owners trained', signalThree: 'Co-founding EVO Studios since',
    workEyebrow: '01 / SELECTED WORK', workTitleA: 'Ideas are easy.', workTitleB: 'Proof is harder.',
    workIntro: 'Three kinds of work: engineering AI systems, turning operational problems into technical plans, and shipping creative technology for clients.',
    crobiCategory: 'PRIVATE R&D  /  AGENT SYSTEMS',
    crobiTitle: 'Crobi OS', crobiDescription: 'An agent execution architecture built around control: tools, memory, permissions, human approvals and an auditable record of work.',
    crobiFoot: 'Independent R&D · Not presented as a commercial deployment',
    crobiLink: 'Request technical walkthrough',
    bosurCategory: 'PAID DISCOVERY  /  SYSTEM DESIGN',
    bosurTitle: 'BOSUR', bosurDescription: 'Turning 33 operational and compliance forms into a scoped tablet-first platform, with approximately 8 modules and 18–20 workflows.',
    bosurFoot: 'Phase 0 discovery and architecture — implementation not claimed',
    evoCategory: 'CLIENT DELIVERY  /  CREATIVE AI',
    evoTitle: 'EVO Studios × Big Media', evoDescription: 'Translating complex briefs into viable AI-assisted creative workflows, production and delivery under real-world deadlines.',
    evoFoot: 'Creative technology · Customer-facing production',
    concept: 'CONCEPTUAL SYSTEM VISUALIZATION',
    systemTitle: 'Agent Control Center', systemSubtitle: 'Execution overview', mockOverview: 'Overview', mockWorkflows: 'Workflows',
    mockPermissions: 'Approvals', mockMemory: 'Memory', mockTasks: 'Tasks today', mockActive: 'Active agents',
    mockApproval: 'Approval required', mockAllow: 'Human decision', mockPipeline: 'Execution pipeline',
    mockInput: 'Request received', mockPlan: 'Plan created', mockGate: 'Permission gate', mockExecution: 'Tool execution',
    opsTitle: 'Operations / Field forms', opsSubtitle: 'Implementation scope · Discovery phase', opsForms: 'Source forms', opsModules: 'Proposed modules', opsWorkflow: 'Workflows mapped', opsAudit: 'Audit evidence', opsTemp: 'IoT temperature', opsAlerts: 'Alerts & reporting',
    methodEyebrow: '02 / HOW I WORK', methodTitleA: 'From unclear', methodTitleB: 'to executable.',
    methodIntro: 'A useful AI solution starts with understanding what actually breaks in the operation.',
    methodOne: 'Understand the business', methodOneBody: 'Work with stakeholders, map what people do today and identify where friction costs time or money.',
    methodTwo: 'Make the system real', methodTwoBody: 'Define architecture, integrations, constraints and a concrete prototype before overselling a vision.',
    methodThree: 'Own the delivery', methodThreeBody: 'Translate decisions into work, handle feedback and make sure users can operate what was built.',
    expEyebrow: '03 / EXPERIENCE', expTitle: 'Built across disciplines.', expIntro: 'A background that crosses AI engineering, product, commercial delivery and creative production.',
    skillsEyebrow: 'CORE TOOLKIT', skills: ['Python / FastAPI', 'TypeScript', 'REST APIs / MCP', 'Agent orchestration', 'Human approvals', 'Solution architecture', 'Customer discovery', 'Product delivery'],
    contactEyebrow: '04 / LET’S WORK', contactTitleA: 'Have a difficult', contactTitleB: 'problem?', contactText: 'I like the work where technical execution meets messy reality. Open to AI Deployment, Forward Deployed Engineering and Solutions roles.',
    emailButton: 'Start a conversation', contactGithub: 'Explore GitHub',
    footLocation: 'Based in Mexico · English / Spanish', footTop: 'Back to top',
  },
  es: {
    navWork: 'Proyectos', navApproach: 'Método', navExperience: 'Experiencia', navContact: 'Contacto',
    availability: 'ABIERTO A ROLES GLOBALES', cv: 'CV',
    eyebrow: 'IMPLEMENTACIÓN DE IA  /  INGENIERÍA  /  PRODUCTO',
    leadFirst: 'IA que funciona', leadSecond: 'en el mundo', leadThird: 'real.',
    heroBody: 'Conecto problemas ambiguos de negocio con sistemas que sí se pueden construir. Trabajo directamente con clientes y también desarrollo la solución.',
    heroButton: 'Explorar proyectos', heroSecondary: 'Ver currículum',
    heroSide: 'CONSTRUCTOR · OPERADOR · FRENTE AL CLIENTE', portrait: 'IMPLEMENTACIÓN DE IA / MÉXICO',
    signalOne: 'Formatos operativos analizados', signalTwo: 'Dueños de negocio capacitados', signalThree: 'Cofundador de EVO Studios desde',
    workEyebrow: '01 / PROYECTOS', workTitleA: 'Las ideas sobran.', workTitleB: 'La evidencia importa.',
    workIntro: 'Tres formas de trabajar: construir sistemas de IA, traducir operaciones a planes técnicos y entregar tecnología creativa para clientes.',
    crobiCategory: 'I+D PRIVADA  /  SISTEMAS AGÉNTICOS',
    crobiTitle: 'Crobi OS', crobiDescription: 'Arquitectura de ejecución para agentes construida alrededor del control: herramientas, memoria, permisos, aprobaciones humanas y trazabilidad.',
    crobiFoot: 'I+D independiente · No se presenta como implementación comercial',
    crobiLink: 'Solicitar explicación técnica',
    bosurCategory: 'DISCOVERY PAGADO  /  DISEÑO DE SISTEMAS',
    bosurTitle: 'BOSUR', bosurDescription: 'Convertir 33 formatos operativos y de cumplimiento en el alcance de una plataforma tablet-first con ~8 módulos y 18–20 workflows.',
    bosurFoot: 'Fase 0 y arquitectura — no se afirma implementación',
    evoCategory: 'ENTREGA A CLIENTES  /  IA CREATIVA',
    evoTitle: 'EVO Studios × Big Media', evoDescription: 'Transformar briefs complejos en procesos viables de IA creativa, producción y entregas con fechas reales.',
    evoFoot: 'Tecnología creativa · Entrega con clientes',
    concept: 'VISUALIZACIÓN CONCEPTUAL DEL SISTEMA',
    systemTitle: 'Centro de control de agentes', systemSubtitle: 'Resumen de ejecución', mockOverview: 'Resumen', mockWorkflows: 'Procesos',
    mockPermissions: 'Aprobaciones', mockMemory: 'Memoria', mockTasks: 'Tareas hoy', mockActive: 'Agentes activos',
    mockApproval: 'Requiere aprobación', mockAllow: 'Decisión humana', mockPipeline: 'Flujo de ejecución',
    mockInput: 'Solicitud recibida', mockPlan: 'Plan generado', mockGate: 'Control de permisos', mockExecution: 'Ejecutar herramienta',
    opsTitle: 'Operaciones / Formularios', opsSubtitle: 'Alcance de implementación · Discovery', opsForms: 'Formatos fuente', opsModules: 'Módulos propuestos', opsWorkflow: 'Workflows mapeados', opsAudit: 'Evidencia de auditoría', opsTemp: 'Temperatura IoT', opsAlerts: 'Alertas y reportes',
    methodEyebrow: '02 / MI MÉTODO', methodTitleA: 'De la ambigüedad', methodTitleB: 'a la ejecución.',
    methodIntro: 'La solución de IA empieza entendiendo dónde se rompe realmente la operación.',
    methodOne: 'Entender el negocio', methodOneBody: 'Hablar con responsables, mapear procesos actuales y encontrar dónde se pierde tiempo o dinero.',
    methodTwo: 'Aterrizar el sistema', methodTwoBody: 'Definir arquitectura, integraciones, restricciones y un prototipo concreto antes de vender una visión.',
    methodThree: 'Responsabilizarme de la entrega', methodThreeBody: 'Convertir decisiones en ejecución, responder al feedback y lograr que el usuario pueda operar el sistema.',
    expEyebrow: '03 / EXPERIENCIA', expTitle: 'Experiencia multidisciplinaria.', expIntro: 'Una trayectoria que conecta ingeniería de IA, producto, trabajo comercial y producción creativa.',
    skillsEyebrow: 'HERRAMIENTAS Y CAPACIDADES', skills: ['Python / FastAPI', 'TypeScript', 'REST APIs / MCP', 'Orquestación de agentes', 'Aprobaciones humanas', 'Arquitectura de soluciones', 'Discovery con clientes', 'Entrega de producto'],
    contactEyebrow: '04 / HABLEMOS', contactTitleA: '¿Tienes un problema', contactTitleB: 'difícil?', contactText: 'Me gusta construir donde la tecnología se encuentra con operaciones reales. Abierto a AI Deployment, Forward Deployed Engineering y Solutions.',
    emailButton: 'Iniciar conversación', contactGithub: 'Ver GitHub',
    footLocation: 'México · Inglés / Español', footTop: 'Volver arriba',
  },
};

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="p2-text-link" href={href}>{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

export default function PortfolioV2({ language, setLanguage }: Props) {
  const t = translations[language];
  const es = language === 'es';
  const [menuOpen, setMenuOpen] = useState(false);
  const history = (es ? experienceEs : experience).slice(0, 3);
  return <div className="portfolio-v2" id="top">
    <header className="p2-header">
      <a href="#top" className="p2-monogram" aria-label="Ulises Frías — Home">UF<span className="p2-monogram-point">.</span></a>
      <nav className={'p2-navigation' + (menuOpen ? ' is-open' : '')} aria-label={es ? 'Navegación principal' : 'Main navigation'}>
        <a href="#work" onClick={() => setMenuOpen(false)}>{t.navWork}</a>
        <a href="#approach" onClick={() => setMenuOpen(false)}>{t.navApproach}</a>
        <a href="#experience" onClick={() => setMenuOpen(false)}>{t.navExperience}</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>{t.navContact}</a>
      </nav>
      <div className="p2-header-actions">
        <div className="p2-language"><button type="button" className={es ? '' : 'active'} onClick={() => setLanguage('en')} aria-pressed={!es}>EN</button><span>/</span><button type="button" className={es ? 'active' : ''} onClick={() => setLanguage('es')} aria-pressed={es}>ES</button></div>
        <Link to="/resume" className="p2-resume-button">{t.cv} <ArrowUpRight size={16}/></Link>
        <button type="button" className="p2-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
      </div>
    </header>

    <main>
      <section className="p2-hero" aria-labelledby="p2-hero-heading">
        <div className="p2-hero-content">
          <div className="p2-hero-eyebrow"><span className="p2-live-dot"/> {t.eyebrow}</div>
          <h1 id="p2-hero-heading">{t.leadFirst}<br/>{t.leadSecond}<br/><em>{t.leadThird}</em></h1>
          <p className="p2-hero-description">{t.heroBody}</p>
          <div className="p2-hero-actions">
            <a className="p2-cta-primary" href="#work">{t.heroButton}<ArrowUpRight size={19}/></a>
            <Link className="p2-cta-secondary" to="/resume">{t.heroSecondary}<Download size={16}/></Link>
          </div>
          <div className="p2-hero-availability"><span className="p2-live-dot"/>{t.availability}<span className="p2-availability-arrow">↗</span></div>
        </div>
        <div className="p2-hero-image">
          <div className="p2-photo-top"><span>U / F — 2026</span><span>01 / 04</span></div>
          <div className="p2-hero-sculpture" aria-label={es ? 'Composición gráfica abstracta sobre sistemas de IA' : 'Abstract visual composition about AI systems'}>
            <div className="p2-sculpture-glow"/>
            <div className="p2-sculpture-ring p2-sculpture-ring-a"/>
            <div className="p2-sculpture-ring p2-sculpture-ring-b"/>
            <div className="p2-sculpture-core"><span>UF<span className="p2-sculpture-dot">.</span></span></div>
            <div className="p2-sculpture-pill p2-sculpture-pill-a">HUMAN / INTENT</div>
            <div className="p2-sculpture-pill p2-sculpture-pill-b">SYSTEM / ACTION ↗</div>
            <div className="p2-sculpture-index">001<br/>/OS</div>
          </div>
          <div className="p2-photo-bottom"><span>ULISES FRÍAS</span><span>{t.portrait}</span></div>
        </div>
        <div className="p2-hero-bottom"><span>{t.heroSide}</span><a href="#work"><ArrowDown size={17}/> SCROLL TO EXPLORE</a></div>
      </section>

      <section className="p2-numbers" aria-label={es ? 'Resultados relevantes' : 'Relevant evidence'}>
        <div><span className="p2-number">33<span className="p2-number-star">✳</span></span><p>{t.signalOne}</p></div>
        <div><span className="p2-number">40<span className="p2-number-star">✳</span></span><p>{t.signalTwo}</p></div>
        <div><span className="p2-number">2017<span className="p2-number-star">↗</span></span><p>{t.signalThree}</p></div>
      </section>

      <section id="work" className="p2-work p2-container" aria-labelledby="p2-work-title">
        <div className="p2-section-intro">
          <div className="p2-kicker"><span className="p2-kicker-square"/> {t.workEyebrow}</div>
          <div><h2 id="p2-work-title">{t.workTitleA}<br/><em>{t.workTitleB}</em></h2><p>{t.workIntro}</p></div>
        </div>

        <article className="p2-crobi-card" id="crobi">
          <div className="p2-crobi-art">
            <div className="p2-art-noise"/>
            <div className="p2-concept-label">{t.concept}</div>
            <div className="p2-dashboard" role="img" aria-label={es ? 'Ilustración de arquitectura conceptual de Crobi OS' : 'Conceptual Crobi OS architecture illustration'}>
              <div className="p2-dashboard-top"><span className="p2-dash-brand"><span className="p2-brand-symbol">✳</span> CROBI <span className="p2-dash-os">OS</span></span><span className="p2-dash-top-status"><span/> DESIGN CONCEPT</span><span className="p2-dash-avatar">UF</span></div>
              <div className="p2-dashboard-body">
                <div className="p2-dashboard-side">
                  <div className="p2-side-row active"><span>▦</span>{t.mockOverview}</div>
                  <div className="p2-side-row"><span>⤷</span>{t.mockWorkflows}</div>
                  <div className="p2-side-row"><span>◈</span>{t.mockPermissions}</div>
                  <div className="p2-side-row"><span>◷</span>{t.mockMemory}</div>
                  <div className="p2-side-foot">WORKSPACE<br/><strong>Personal / R&D</strong></div>
                </div>
                <div className="p2-dashboard-main">
                  <div className="p2-dash-heading"><span><small>WORKSPACE  /  OVERVIEW</small><strong>{t.systemTitle}</strong></span><span className="p2-dash-pill">{t.systemSubtitle}</span></div>
                  <div className="p2-dash-metrics">
                    <div><small>{t.mockTasks}</small><strong>—</strong><span>↗ WORKFLOW</span></div>
                    <div><small>{t.mockActive}</small><strong>—</strong><span>● MONITORED</span></div>
                  </div>
                  <div className="p2-dash-approval"><div className="p2-approval-icon"><ShieldCheck size={22}/></div><div><small>PERMISSION GATE</small><strong>{t.mockApproval}</strong><span>Outbound tool execution</span></div><b>{t.mockAllow} ↗</b></div>
                  <div className="p2-dash-pipeline"><small>{t.mockPipeline}</small><div><span><Check size={11}/>{t.mockInput}</span><i/><span><Check size={11}/>{t.mockPlan}</span><i/><span className="is-gated">● {t.mockGate}</span><i/><span>{t.mockExecution}</span></div></div>
                </div>
              </div>
            </div>
            <div className="p2-art-floating"><span className="p2-floating-icon">◈</span><span>PERMISSION LAYER<strong>Human in control</strong></span></div>
          </div>
          <div className="p2-crobi-details">
            <div className="p2-card-index"><span>01 — FEATURED CASE</span><span>2026</span></div>
            <div className="p2-category">{t.crobiCategory}</div>
            <h3>{t.crobiTitle}<span className="p2-title-asterisk">✳</span></h3>
            <p>{t.crobiDescription}</p>
            <div className="p2-tags"><span>PYTHON</span><span>FASTAPI</span><span>MCP</span><span>AGENT CONTROL</span></div>
            <div className="p2-card-footer"><span>{t.crobiFoot}</span><ArrowLink href={'mailto:' + profile.email + '?subject=Crobi%20OS%20technical%20walkthrough'}>{t.crobiLink}</ArrowLink></div>
          </div>
        </article>

        <div className="p2-secondary-grid">
          <article className="p2-secondary-card p2-bosur-card">
            <div className="p2-secondary-art p2-bosur-art">
              <div className="p2-concept-label">{t.concept}</div>
              <div className="p2-tablet">
                <div className="p2-tablet-top"><span className="p2-tablet-icon">B.</span><span>{t.opsTitle}</span><span>···</span></div>
                <div className="p2-tablet-body">
                  <small>{t.opsSubtitle}</small><div className="p2-tablet-head"><strong>Overview</strong><span>PHASE 0</span></div>
                  <div className="p2-tablet-metrics"><div><strong>33</strong><span>{t.opsForms}</span></div><div><strong>~8</strong><span>{t.opsModules}</span></div><div><strong>18–20</strong><span>{t.opsWorkflow}</span></div></div>
                  <div className="p2-tablet-list"><div><span>☑</span>{t.opsAudit}<i>↗</i></div><div><span>◷</span>{t.opsTemp}<i>↗</i></div><div><span>◈</span>{t.opsAlerts}<i>↗</i></div></div>
                </div>
              </div>
              <div className="p2-bosur-stamp">33<span>→</span>08</div>
            </div>
            <div className="p2-secondary-content"><div className="p2-card-index"><span>02 — OPERATIONS</span><span>2026</span></div><div className="p2-category">{t.bosurCategory}</div><h3>{t.bosurTitle}</h3><p>{t.bosurDescription}</p><div className="p2-secondary-foot">{t.bosurFoot}</div></div>
          </article>
          <article className="p2-secondary-card p2-evo-card">
            <div className="p2-secondary-art p2-evo-art">
              <div className="p2-evo-top"><span>STUDIO  /  AI WORKFLOWS</span><span>02 / 04</span></div>
              <div className="p2-evo-orbit p2-evo-orbit-one"/><div className="p2-evo-orbit p2-evo-orbit-two"/>
              <div className="p2-evo-display"><span>IDEA → SYSTEM → DELIVERY</span><strong>MAKE<br/><em>IT</em><br/>REAL<span>®</span></strong></div>
              <div className="p2-evo-bottom">EVO STUDIOS × BIG MEDIA <span>EST. 2017</span></div>
            </div>
            <div className="p2-secondary-content"><div className="p2-card-index"><span>03 — CREATIVE TECH</span><span>2017—NOW</span></div><div className="p2-category">{t.evoCategory}</div><h3>{t.evoTitle}</h3><p>{t.evoDescription}</p><div className="p2-secondary-foot">{t.evoFoot}</div></div>
          </article>
        </div>
      </section>

      <section id="approach" className="p2-approach" aria-labelledby="p2-approach-title">
        <div className="p2-approach-inner p2-container">
          <div className="p2-approach-heading"><div className="p2-kicker light"><span className="p2-kicker-square"/> {t.methodEyebrow}</div><h2 id="p2-approach-title">{t.methodTitleA}<br/><em>{t.methodTitleB}</em></h2><p>{t.methodIntro}</p></div>
          <div className="p2-steps"><div><span className="p2-step-number">01</span><h3>{t.methodOne}</h3><p>{t.methodOneBody}</p><ArrowUpRight size={20}/></div><div><span className="p2-step-number">02</span><h3>{t.methodTwo}</h3><p>{t.methodTwoBody}</p><ArrowUpRight size={20}/></div><div><span className="p2-step-number">03</span><h3>{t.methodThree}</h3><p>{t.methodThreeBody}</p><ArrowUpRight size={20}/></div></div>
        </div>
      </section>

      <section id="experience" className="p2-experience p2-container" aria-labelledby="p2-experience-title">
        <div className="p2-section-intro"><div className="p2-kicker"><span className="p2-kicker-square"/> {t.expEyebrow}</div><div><h2 id="p2-experience-title">{t.expTitle}</h2><p>{t.expIntro}</p></div></div>
        <div className="p2-timeline">{history.map((item, idx)=><div className="p2-timeline-row" key={item.company}><span>0{idx+1}</span><div><h3>{item.company}</h3><p>{item.role}</p></div><p>{item.description}</p><small>{item.year}</small></div>)}</div>
        <div className="p2-toolkit"><span>{t.skillsEyebrow}</span><div>{t.skills.map(skill=><span key={skill}>{skill}</span>)}</div></div>
      </section>

      <section className="p2-contact" id="contact">
        <div className="p2-container"><div className="p2-kicker light"><span className="p2-kicker-square"/> {t.contactEyebrow}</div><h2>{t.contactTitleA}<br/><em>{t.contactTitleB}</em></h2><div className="p2-contact-bottom"><p>{t.contactText}</p><a href={'mailto:'+profile.email} className="p2-contact-button">{t.emailButton}<ArrowUpRight size={26}/></a></div><div className="p2-contact-links"><a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={16}/>{t.contactGithub}<ArrowUpRight size={14}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={16}/>LinkedIn<ArrowUpRight size={14}/></a><Link to="/resume"><Download size={16}/>{t.cv}<ArrowUpRight size={14}/></Link></div></div>
      </section>
    </main>

    <footer className="p2-footer"><a href="#top" className="p2-footer-brand">ULISES FRÍAS<span>✳</span></a><span>{t.footLocation}</span><a href="#top">{t.footTop} <ArrowRight size={15}/></a><span>© 2026</span></footer>
  </div>;
}
