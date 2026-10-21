import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from './data/profile';
import AgentWorkflowDemo from './AgentWorkflowDemo';
import './agent-case-study.css';

type Language = 'en' | 'es';
const copy = {
  en: {
    back: 'Back to portfolio',
    label: 'ENGINEERING CASE STUDY / INDEPENDENT R&D · 2026',
    title: 'AI agents should be powerful. Their authority should be predictable.',
    intro: 'Designing a governed execution platform for AI agents: turning a human objective into coordinated work while keeping access, approvals, external actions and evidence under explicit control.',
    roles: ['ROLE', 'PROJECT STATUS', 'TECHNICAL FOCUS'],
    facts: ['Founder · Product & Technical Direction', 'Internal R&D · Tested implementation', 'Python · FastAPI · APIs · Agent orchestration'],
    quote: 'The model proposes. The control plane authorizes.',
    problemTag: '01 / THE PROBLEM',
    problemTitle: 'Autonomous execution needs more than a clever prompt.',
    problem: 'Models can plan and request tools, but they should not define their own permissions or declare an external action successful without reliable evidence. The challenge is making AI work useful, controllable and auditable when failures and uncertainty are inevitable.',
    architectureTag: '02 / SYSTEM ARCHITECTURE',
    architectureTitle: 'Clear boundaries between reasoning and authority.',
    architectureDesc: 'A deliberately high-level view of the technical design. Private source code, secrets and operational configuration remain unpublished.',
    stages: [
      ['Human objective', 'Intent and outcome'],
      ['Director / API', 'Reasoning and coordination'],
      ['Control plane', 'Permissions, grants and approvals'],
      ['Worker / runtime', 'Bounded execution'],
      ['Tools & MCP', 'Authorized external effects'],
      ['Evidence', 'Durable status and audit'],
    ],
    decisionsTag: '03 / TECHNICAL DECISIONS',
    decisionsTitle: 'Safety and reliability as architectural properties.',
    decisions: [
      ['Runtime-neutral orchestration', 'Model and runtime choices do not grant new authority.'],
      ['Human-in-the-loop approvals', 'Material external effects require the relevant authorization.'],
      ['Durable execution truth', 'External outcomes and audit evidence outlive model-generated summaries.'],
      ['Failure-aware state', 'Cancellation, reclaims and unknown outcomes must not become false success.'],
    ],
    proofTag: '04 / EVIDENCE',
    proofTitle: 'Demonstrated, not just described.',
    metrics: [
      ['9', 'Representative failure scenarios passed in one selected deployed execution profile.'],
      ['1', 'Real, approved external write demonstrated through an MCP integration.'],
      ['0', 'False-success or silent duplicate material effects observed in that test set.'],
    ],
    caveat: 'These observations are scoped to the tested configuration and scenarios—not universal certification of all runtimes or deployments.',
    scopeTag: '05 / LIMITS',
    scopeTitle: 'A working technical system is not the same as a validated business.',
    scope: 'Internal execution and reliability were demonstrated. A completed external customer pilot, measured customer ROI and general multi-tenant deployment readiness are not claimed.',
    endTag: 'THE TAKEAWAY',
    endTitle: 'I work across product, architecture and execution.',
    endDesc: 'This project combines agent systems, API integrations, permission design, operational failure handling and the discipline to distinguish real verification from optimistic demos.',
    contact: 'Discuss the work',
    allWork: 'Back to selected work',
    privacy: 'Public-safe technical summary. Project name and private repository intentionally withheld.',
  },
  es: {
    back: 'Volver al portafolio',
    label: 'CASO TÉCNICO / I+D INDEPENDIENTE · 2026',
    title: 'Los agentes de IA deben ser capaces. Su autoridad debe ser predecible.',
    intro: 'Diseño de una plataforma de ejecución gobernada para agentes de IA: convertir un objetivo humano en trabajo coordinado y mantener acceso, aprobaciones, efectos externos y evidencia bajo control explícito.',
    roles: ['RESPONSABILIDAD', 'ESTADO', 'ENFOQUE TÉCNICO'],
    facts: ['Fundador · Dirección técnica y de producto', 'I+D interno · Implementación probada', 'Python · FastAPI · APIs · Orquestación de agentes'],
    quote: 'El modelo propone. El plano de control autoriza.',
    problemTag: '01 / EL PROBLEMA',
    problemTitle: 'La ejecución autónoma requiere más que un buen prompt.',
    problem: 'Los modelos pueden planear y solicitar herramientas, pero no deben inventar sus permisos ni declarar exitosa una acción externa sin evidencia confiable. El reto es lograr trabajo útil, controlable y auditable incluso cuando existen fallos e incertidumbre.',
    architectureTag: '02 / ARQUITECTURA',
    architectureTitle: 'Límites claros entre razonamiento y autoridad.',
    architectureDesc: 'Vista intencionalmente general de la arquitectura. No se publica código privado, secretos ni configuración operativa.',
    stages: [
      ['Objetivo humano', 'Intención y resultado'],
      ['Director / API', 'Razonamiento y coordinación'],
      ['Plano de control', 'Permisos y aprobaciones'],
      ['Worker / runtime', 'Ejecución acotada'],
      ['Herramientas y MCP', 'Efectos externos autorizados'],
      ['Evidencia', 'Estado duradero y auditoría'],
    ],
    decisionsTag: '03 / DECISIONES TÉCNICAS',
    decisionsTitle: 'Seguridad y confiabilidad integradas en la arquitectura.',
    decisions: [
      ['Orquestación neutral al runtime', 'El modelo o runtime no puede otorgarse autoridad adicional.'],
      ['Aprobaciones humanas', 'Los efectos externos relevantes requieren autorización apropiada.'],
      ['Estado duradero', 'Resultados y auditorías no dependen del resumen generado por el modelo.'],
      ['Manejo explícito de fallos', 'Cancelaciones y resultados inciertos no equivalen a éxito.'],
    ],
    proofTag: '04 / EVIDENCIA',
    proofTitle: 'Demostrado, no solamente descrito.',
    metrics: [
      ['9', 'Escenarios representativos de fallo superados en un perfil de ejecución desplegado.'],
      ['1', 'Escritura externa real y aprobada, demostrada mediante una integración MCP.'],
      ['0', 'Éxitos falsos o efectos materiales duplicados silenciosamente observados en las pruebas.'],
    ],
    caveat: 'Estos resultados corresponden únicamente a la configuración y los escenarios probados; no son certificación universal para todos los entornos.',
    scopeTag: '05 / LÍMITES',
    scopeTitle: 'Tener un sistema funcional no equivale a validar un negocio.',
    scope: 'Se demostró la ejecución interna y su confiabilidad. No se afirma que exista un piloto externo completado, ROI medido o preparación multi-tenant universal.',
    endTag: 'CONCLUSIÓN',
    endTitle: 'Trabajo entre producto, arquitectura y ejecución.',
    endDesc: 'Este proyecto combina sistemas agénticos, integraciones API, diseño de permisos, manejo de fallos y rigor para distinguir verificación real de demos optimistas.',
    contact: 'Conversemos del proyecto',
    allWork: 'Volver al trabajo seleccionado',
    privacy: 'Resumen técnico público. Nombre del proyecto y repositorio privado omitidos deliberadamente.',
  }
} as const;

export default function AgentCaseStudy({ language }: { language: Language }) {
  const t = copy[language];
  return <main className="study">
    <section className="study-hero section-pad">
      <Link to="/" className="study-back"><ArrowLeft size={15} />{t.back}</Link>
      <div className="study-eyebrow">{t.label}</div>
      <h1>{t.title}</h1>
      <p className="study-lede">{t.intro}</p>
      <div className="study-facts">{t.facts.map((fact, i) => <div key={fact}><small>{t.roles[i]}</small><strong>{fact}</strong></div>)}</div>
    </section>
    <div className="study-statement section-pad"><ShieldCheck size={35} aria-hidden="true"/><p>{t.quote}</p></div>
    <section className="study-section section-pad">
      <p className="study-kicker">{t.problemTag}</p>
      <div className="study-columns"><h2>{t.problemTitle}</h2><p>{t.problem}</p></div>
    </section>
    <section className="study-section study-architecture section-pad">
      <p className="study-kicker">{t.architectureTag}</p>
      <div className="study-columns"><h2>{t.architectureTitle}</h2><p>{t.architectureDesc}</p></div>
      <div className="study-flow" role="list">{t.stages.map(([name, detail], i) =>
        <div role="listitem" className="study-node" key={name}>
          <small>{String(i + 1).padStart(2, '0')}</small>
          <h3>{name}</h3><p>{detail}</p>
          {i < t.stages.length - 1 && <ArrowRight className="study-arrow" size={18} aria-hidden="true" />}
        </div>
      )}</div>
    </section>
    <AgentWorkflowDemo language={language} />
    <section className="study-section section-pad">
      <p className="study-kicker">{t.decisionsTag}</p>
      <div className="study-columns"><h2>{t.decisionsTitle}</h2>
        <div className="study-decisions">{t.decisions.map(([title, detail], i) => <div key={title} className="study-decision"><small>0{i + 1}</small><div><h3>{title}</h3><p>{detail}</p></div></div>)}</div>
      </div>
    </section>
    <section className="study-section study-proof section-pad">
      <p className="study-kicker">{t.proofTag}</p><h2>{t.proofTitle}</h2>
      <div className="study-metrics">{t.metrics.map(([value, explanation]) => <div key={value}><strong>{value}</strong><p>{explanation}</p></div>)}</div>
      <p className="study-caveat">{t.caveat}</p>
    </section>
    <section className="study-section section-pad">
      <p className="study-kicker">{t.scopeTag}</p>
      <div className="study-columns"><h2>{t.scopeTitle}</h2><p>{t.scope}</p></div>
    </section>
    <section className="study-end section-pad">
      <p className="study-kicker">{t.endTag}</p><h2>{t.endTitle}</h2>
      <p>{t.endDesc}</p>
      <div className="study-actions">
        <a className="button button-dark" href={`mailto:${profile.email}`}>{t.contact} <ArrowUpRight size={16}/></a>
        <Link className="button button-light" to="/#work">{t.allWork} <ArrowRight size={16}/></Link>
      </div>
      <small>{t.privacy}</small>
    </section>
  </main>;
}
