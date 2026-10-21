import { useState } from 'react';
import { ArrowRight, Check, CircleSlash, LockKeyhole, Play, RotateCcw, ShieldCheck } from 'lucide-react';
import './agent-workflow-demo.css';

type Language = 'en' | 'es';
type Decision = 'pending' | 'approved' | 'denied';

const ui = {
  en: {
    kicker: 'INTERACTIVE WALKTHROUGH / SIMULATED DATA',
    title: 'See the control boundary in action.',
    intro: 'Follow an illustrative agent run, pause at the approval gate, then choose whether the external action proceeds. Every result is simulated locally in your browser.',
    mock: 'Illustrative UI · No live agents, integrations or customer data',
    job: 'EXAMPLE REQUEST',
    objective: 'Prepare a campaign status summary and email it to the client.',
    run: 'SIMULATED RUN',
    runId: 'SIM-RUN-001',
    steps: [
      ['Goal received', 'A human requests an outcome.'],
      ['Agent plans', 'A draft and proposed action are produced.'],
      ['Policy evaluated', 'Data read allowed; outbound send needs approval.'],
      ['Human approval', 'The sensitive action waits for a decision.'],
      ['Tool execution', 'Only an approved action can proceed.'],
      ['Evidence recorded', 'The result is captured as an inspectable state.'],
    ],
    detail: [
      ['Intent captured', 'An authorized user wants a campaign summary delivered. The request itself does not grant permission to send email.', 'Request accepted · External effects: 0'],
      ['Plan proposed', 'The agent drafts a status update using fictional campaign information, and requests an outbound email action.', 'Proposed effect · External effects: 0'],
      ['Permission gate', 'The policy allows the sample read but classifies sending the email as a material external effect requiring human approval.', 'Send permission: approval required'],
      ['Awaiting decision', 'The execution pauses. The agent cannot approve its own proposed send action.', 'Outbound effect: blocked'],
      ['Authorized execution', 'Approval was simulated; a mocked tool adapter records one outbound effect. No email is actually sent.', 'Mock adapter · Simulated outbound effect: 1'],
      ['Recorded outcome', 'The simulated run ends with durable-style evidence: approval decision, attempted operation and final outcome.', 'Approved · Mock outcome: success'],
    ],
    denied: ['Denied at approval gate', 'The human rejected the proposed send. The sample run closes without calling an external tool.', 'Denied · Outbound effects: 0'],
    labels: { state: 'RUN STATE', external: 'SIMULATED EXTERNAL EFFECTS', evidence: 'EXAMPLE AUDIT TRAIL', inspected: 'INSPECTED STEP' },
    states: ['Not started', 'Planning', 'Policy check', 'Awaiting approval', 'Mock execution', 'Completed'],
    rejectedState: 'Denied · No external action',
    eventNames: [
      'objective.received',
      'agent.plan.proposed',
      'policy.approval_required',
      'approval.requested',
      'mock_tool.dispatched',
      'run.outcome.recorded',
    ],
    deniedEvent: 'approval.denied · run.closed',
    buttons: { start: 'Start walkthrough', next: 'Continue', approve: 'Approve sample action', deny: 'Deny', evidence: 'Inspect outcome', reset: 'Run again' },
    foot: 'This is a UI demonstration of a system concept, not a live run, historical event, real client workflow, or independent test result. Engineering test evidence is documented separately below.',
    inspectedHelp: 'Progress through the sample to inspect each control point.',
    outcome: 'NO REAL EMAIL IS SENT',
  },
  es: {
    kicker: 'RECORRIDO INTERACTIVO / DATOS SIMULADOS',
    title: 'Observa cómo funciona el control.',
    intro: 'Recorre una ejecución ilustrativa, detenla en la aprobación y decide si la acción externa puede continuar. Todo ocurre de forma simulada dentro del navegador.',
    mock: 'Interfaz ilustrativa · Sin agentes, integraciones ni datos reales de clientes',
    job: 'SOLICITUD DE EJEMPLO',
    objective: 'Prepara un resumen del estado de una campaña y envíalo por correo al cliente.',
    run: 'EJECUCIÓN SIMULADA',
    runId: 'SIM-RUN-001',
    steps: [
      ['Objetivo recibido', 'Una persona solicita un resultado.'],
      ['Plan del agente', 'Se crea un borrador y una acción propuesta.'],
      ['Evaluación de permisos', 'Lectura permitida; el envío requiere aprobación.'],
      ['Aprobación humana', 'La acción sensible espera una decisión.'],
      ['Ejecución de herramienta', 'Solo una acción autorizada puede continuar.'],
      ['Evidencia registrada', 'El resultado queda como estado inspeccionable.'],
    ],
    detail: [
      ['Intención recibida', 'Un usuario autorizado quiere enviar un resumen de campaña. La solicitud por sí misma no otorga permiso de enviar correos.', 'Solicitud aceptada · Efectos externos: 0'],
      ['Plan propuesto', 'El agente prepara un borrador con información ficticia y solicita una acción de envío de correo.', 'Efecto propuesto · Efectos externos: 0'],
      ['Límite de autorización', 'La política permite la lectura de ejemplo, pero clasifica el envío como efecto material que necesita aprobación humana.', 'Permiso de envío: requiere aprobación'],
      ['Esperando decisión', 'La ejecución se detiene. El agente no puede aprobar por su cuenta el envío solicitado.', 'Efecto externo: bloqueado'],
      ['Ejecución autorizada', 'Se simuló una aprobación; un adaptador ficticio registra un efecto externo. No se envió ningún correo real.', 'Adaptador ficticio · Efectos simulados: 1'],
      ['Resultado registrado', 'La ejecución simulada termina con evidencia ilustrativa: decisión, operación intentada y resultado final.', 'Aprobado · Resultado ficticio: éxito'],
    ],
    denied: ['Denegado en la aprobación', 'La persona rechazó el envío propuesto. La ejecución de ejemplo se cierra sin llamar herramientas externas.', 'Denegado · Efectos externos: 0'],
    labels: { state: 'ESTADO DE EJECUCIÓN', external: 'EFECTOS EXTERNOS SIMULADOS', evidence: 'REGISTRO DE AUDITORÍA DE EJEMPLO', inspected: 'PASO INSPECCIONADO' },
    states: ['Sin iniciar', 'Planeando', 'Revisando permisos', 'Esperando aprobación', 'Ejecución ficticia', 'Completado'],
    rejectedState: 'Denegado · Sin acción externa',
    eventNames: [
      'objective.received',
      'agent.plan.proposed',
      'policy.approval_required',
      'approval.requested',
      'mock_tool.dispatched',
      'run.outcome.recorded',
    ],
    deniedEvent: 'approval.denied · run.closed',
    buttons: { start: 'Iniciar recorrido', next: 'Continuar', approve: 'Aprobar acción ficticia', deny: 'Denegar', evidence: 'Ver resultado', reset: 'Reiniciar' },
    foot: 'Esto es una demostración de interfaz, no una ejecución real, evento histórico, flujo de cliente ni resultado de pruebas independiente. La evidencia técnica está documentada en otra sección más abajo.',
    inspectedHelp: 'Avanza en el ejemplo para inspeccionar cada punto de control.',
    outcome: 'NO SE ENVÍA NINGÚN CORREO REAL',
  },
} as const;

export default function AgentWorkflowDemo({ language }: { language: Language }) {
  const t = ui[language];
  const [phase, setPhase] = useState(0);
  const [decision, setDecision] = useState<Decision>('pending');
  const denied = decision === 'denied';
  const finished = phase === 5;
  const effects = phase >= 4 && decision === 'approved' ? 1 : 0;
  const view = denied && finished ? t.denied : t.detail[phase];
  const log = t.eventNames.slice(0, phase + 1).filter((_, i) => !(denied && i >= 4));
  if (denied && finished) log.push(t.deniedEvent);
  if (phase === 5 && decision === 'approved') log[5] = t.eventNames[5];

  const reset = () => { setPhase(0); setDecision('pending'); };
  const advance = () => setPhase(p => Math.min(5, p + 1));
  const approve = () => { setDecision('approved'); setPhase(4); };
  const reject = () => { setDecision('denied'); setPhase(5); };

  return <section className="demo-section section-pad" aria-labelledby="demo-title">
    <div className="demo-header">
      <span className="demo-overline">{t.kicker}</span>
      <h2 id="demo-title">{t.title}</h2>
      <p>{t.intro}</p>
    </div>
    <div className="demo-console">
      <div className="demo-console-top">
        <span className="demo-console-brand"><span className="demo-indicator" /> CONTROL / WORKFLOW</span>
        <span className="demo-sim-chip"><LockKeyhole size={12} aria-hidden="true" /> SIMULATION ONLY</span>
      </div>
      <div className="demo-request">
        <div><small>{t.job}</small><p>{t.objective}</p></div>
        <div className="demo-request-id"><small>{t.run}</small><strong>{t.runId}</strong></div>
      </div>
      <div className="demo-grid">
        <div className="demo-timeline" aria-label={language === 'es' ? 'Etapas de ejecución' : 'Execution steps'}>
          {t.steps.map(([name, detail], i) => {
            const skipped = denied && i === 4;
            const complete = i < phase && !skipped;
            const active = i === phase || (finished && denied && i === 3);
            return <div className={`demo-timeline-item${complete ? ' is-complete' : ''}${active ? ' is-active' : ''}${skipped ? ' is-skipped' : ''}`} key={name}>
              <span className="demo-timeline-icon" aria-hidden="true">{complete ? <Check size={13} /> : String(i + 1).padStart(2,'0')}</span>
              <div><strong>{name}</strong><p>{detail}</p></div>
            </div>;
          })}
        </div>
        <div className="demo-inspector">
          <div className="demo-inspector-meta"><small>{t.labels.inspected}</small><span>{String(Math.min(phase + 1, 6)).padStart(2,'0')} / 06</span></div>
          <div className="demo-live-status" aria-live="polite">
            <div className="demo-status-top"><span className="demo-status-dot" /> {t.labels.state}</div>
            <strong>{denied && finished ? t.rejectedState : t.states[phase]}</strong>
          </div>
          <div className="demo-inspector-detail" aria-live="polite">
            <h3>{view[0]}</h3>
            <p>{view[1]}</p>
            <div className="demo-result"><ShieldCheck size={16} aria-hidden="true"/>{view[2]}</div>
          </div>
          <div className="demo-effect-count"><span>{t.labels.external}</span><strong>{effects}</strong></div>
          <div className="demo-actions">
            {phase === 3 && decision === 'pending' ? <>
              <button type="button" className="demo-action-primary" onClick={approve}><Check size={17}/>{t.buttons.approve}</button>
              <button type="button" className="demo-action-ghost" onClick={reject}><CircleSlash size={16}/>{t.buttons.deny}</button>
            </> : finished ? <button type="button" className="demo-action-primary" onClick={reset}><RotateCcw size={16}/>{t.buttons.reset}</button>
              : <button type="button" className="demo-action-primary" onClick={advance}>{phase === 0 ? <Play size={15}/> : <ArrowRight size={16}/>} {phase === 0 ? t.buttons.start : phase === 4 ? t.buttons.evidence : t.buttons.next}</button>}
          </div>
        </div>
      </div>
      <div className="demo-audit">
        <div className="demo-audit-head"><span>{t.labels.evidence}</span><span>{t.outcome}</span></div>
        <ol aria-live="polite">{log.map((entry, i) => <li key={entry}><span>{String(i + 1).padStart(2,'0')}</span><code>{entry}</code></li>)}</ol>
      </div>
      <p className="demo-console-disclaimer">{t.mock}</p>
    </div>
    <p className="demo-legal">{t.foot}</p>
  </section>;
}
