import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";
import "./Demo.css";

const DEMO_ACCESS_KEY = "evolvian_demo_access_v2";
const DEMO_FEEDBACK_KEY = "evolvian_demo_feedback_v2";
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
const API_BASE = (import.meta.env.VITE_API_URL || "").trim();

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Espanol" },
];

const INITIAL_LEAD = {
  name: "",
  email: "",
  phone: "",
  acceptedTerms: false,
  acceptedMarketing: false,
};

const STEPS = [
  { id: "widget_install", phase: "phase1", videoFile: "step-1-widget-install.mp4" },
  { id: "whatsapp_setup", phase: "phase1", videoFile: "step-2-whatsapp-setup.mp4" },
  { id: "email_appointment", phase: "phase2", videoFile: "step-3-email-appointment.mp4" },
  { id: "whatsapp_templates", phase: "phase2", videoFile: "step-4-whatsapp-templates.mp4" },
  { id: "agenda_sync", phase: "phase2", videoFile: "step-5-agenda-sync.mp4" },
];

const COPY = {
  en: {
    title: "Evolvian Interactive Demo",
    subtitle: "Watch each outcome as a transcript + interactive video.",
    backHome: "Back to public page",
    phase1Label: "Phase 1",
    phase2Label: "Phase 2",
    phase2Hint: "Phase 2 starts after this point with your contact details.",
    phase2GateTitle: "Continue to Phase 2",
    phase2GateBody: "Share your details to continue with templates, appointment automation, and agenda operations.",
    phase2GateCta: "Continue to Phase 2",
    formName: "Name",
    formEmail: "Email",
    formPhone: "Phone (optional)",
    formTerms: "I accept the Terms & Conditions.",
    formMarketing: "I want to receive product updates and marketing emails.",
    unlockButton: "Continue with Demo",
    cancel: "Cancel",
    finishDemo: "Finish demo and leave feedback",
    feedbackTitle: "Rate this demo",
    feedbackBody: "Please rate your experience from 1 to 5 stars.",
    feedbackComment: "Feedback (optional)",
    feedbackPlaceholder: "What should we refine before production?",
    feedbackSubmit: "Send feedback",
    videoAreaTitle: "Interactive video",
    videoMissingTitle: "Video pending upload",
    videoMissingBody: "This video will appear here once uploaded.",
    transcriptTitle: "Step-by-step guide",
    errors: {
      name: "Name must contain at least 2 characters.",
      email: "Enter a valid email.",
      terms: "You must accept Terms & Conditions.",
      stars: "Please select a star rating before sending.",
      consent: "We could not save your marketing consent. Please try again.",
    },
    steps: {
      widget_install: {
        title: "Solve repetitive website questions 24/7 without adding headcount",
        summary: "We show how your team uploads knowledge, installs the widget, and starts answering with business context.",
        transcript: [
          ["00:00", "Open Upload Documents in Evolvian Admin."],
          ["00:09", "Add the first PDF/TXT with your services and policies."],
          ["00:19", "System processes and indexes that document."],
          ["00:31", "Copy embed code with your public_client_id."],
          ["00:43", "Paste the script in your website HTML."],
          ["00:55", "Widget replies using the uploaded context in real time."],
        ],
      },
      whatsapp_setup: {
        title: "Resolve WhatsApp demand spikes without losing response quality",
        summary: "We cover WABA setup and how Evolvian handles incoming client conversations with operational consistency.",
        transcript: [
          ["00:00", "Open WhatsApp setup in Evolvian Admin."],
          ["00:10", "Paste WABA ID, permanent token, and phone number ID."],
          ["00:22", "Validate webhook + outbound permissions."],
          ["00:33", "Incoming customer message enters the Evolvian inbox."],
          ["00:47", "Assistant responds with your business context and guardrails."],
          ["01:03", "Team supervises and scales only edge cases."],
        ],
      },
      email_appointment: {
        title: "Prevent missed appointments with email templates and automated confirmations",
        summary: "This step shows email template creation, appointment scheduling, and final delivery to the client inbox.",
        transcript: [
          ["00:00", "Create an email template for appointment confirmation."],
          ["00:14", "Choose service, date, and client contact in scheduler."],
          ["00:26", "Bind template to appointment flow."],
          ["00:38", "System sends confirmation email automatically."],
          ["00:50", "Client receives details and confirmation status updates."],
        ],
      },
      whatsapp_templates: {
        title: "Reduce no-shows with WhatsApp templates for reminders and follow-up",
        summary: "We show the template workflow and how approved WhatsApp messages are triggered at the right moments.",
        transcript: [
          ["00:00", "Create or import approved WhatsApp template."],
          ["00:12", "Map placeholders: client name, date, service, location."],
          ["00:24", "Attach template to reminder policy."],
          ["00:36", "Evolvian sends reminder through WhatsApp channel."],
          ["00:48", "Client confirms or requests change from the same thread."],
        ],
      },
      agenda_sync: {
        title: "Eliminate calendar conflicts between admin operations and customer widget bookings",
        summary: "This final step shows agenda management in Admin and real-time slot behavior in widget.",
        transcript: [
          ["00:00", "Set working hours and service duration in Admin."],
          ["00:12", "Connect Google Calendar to block busy slots."],
          ["00:24", "Widget exposes only valid time windows to customers."],
          ["00:36", "Admin sees booking updates instantly."],
          ["00:48", "Cancellations free slots automatically for new bookings."],
        ],
      },
    },
  },
  es: {
    title: "Demo Interactivo Evolvian",
    subtitle: "Ve cada resultado con transcript a la izquierda y video interactivo a la derecha.",
    backHome: "Volver a pagina publica",
    phase1Label: "Fase 1",
    phase2Label: "Fase 2",
    phase2Hint: "La Fase 2 inicia en este punto con tus datos.",
    phase2GateTitle: "Continuar a Fase 2",
    phase2GateBody: "Comparte tus datos para continuar con templates, automatizacion de citas y operacion de agendas.",
    phase2GateCta: "Continuar a Fase 2",
    formName: "Nombre",
    formEmail: "Email",
    formPhone: "Telefono (opcional)",
    formTerms: "Acepto los Terminos y Condiciones.",
    formMarketing: "Quiero recibir novedades y emails de marketing.",
    unlockButton: "Continuar con Demo",
    cancel: "Cancelar",
    finishDemo: "Finalizar demo y dejar feedback",
    feedbackTitle: "Califica este demo",
    feedbackBody: "Califica tu experiencia de 1 a 5 estrellas.",
    feedbackComment: "Feedback (opcional)",
    feedbackPlaceholder: "Que debemos refinar antes de produccion?",
    feedbackSubmit: "Enviar feedback",
    videoAreaTitle: "Video interactivo",
    videoMissingTitle: "Video pendiente por subir",
    videoMissingBody: "Este video aparecera aqui cuando lo subas.",
    transcriptTitle: "Guia paso a paso",
    errors: {
      name: "El nombre debe tener al menos 2 caracteres.",
      email: "Ingresa un email valido.",
      terms: "Debes aceptar Terminos y Condiciones.",
      stars: "Selecciona una calificacion antes de enviar.",
      consent: "No pudimos guardar tu consentimiento de marketing. Intentalo de nuevo.",
    },
    steps: {
      widget_install: {
        title: "Resuelve preguntas repetitivas de la web 24/7 sin aumentar headcount",
        summary: "Mostramos como subes conocimiento, instalas el widget y empiezas a responder con contexto del negocio.",
        transcript: [
          ["00:00", "Abrir Upload Documents en Admin Evolvian."],
          ["00:09", "Subir el primer PDF/TXT con servicios y politicas."],
          ["00:19", "El sistema procesa e indexa ese documento."],
          ["00:31", "Copiar embed code con public_client_id."],
          ["00:43", "Pegar el script en el HTML de tu web."],
          ["00:55", "El widget responde en tiempo real con ese contexto."],
        ],
      },
      whatsapp_setup: {
        title: "Resuelve picos de demanda en WhatsApp sin bajar calidad de respuesta",
        summary: "Cubrimos setup de WABA y como Evolvian maneja conversaciones entrantes con consistencia operativa.",
        transcript: [
          ["00:00", "Abrir configuracion de WhatsApp en Admin Evolvian."],
          ["00:10", "Pegar WABA ID, token permanente y phone number ID."],
          ["00:22", "Validar webhook y permisos de salida."],
          ["00:33", "Mensaje entrante del cliente llega a bandeja Evolvian."],
          ["00:47", "El asistente responde con contexto y reglas de negocio."],
          ["01:03", "El equipo supervisa y solo escala casos limite."],
        ],
      },
      email_appointment: {
        title: "Evita citas perdidas con templates de email y confirmaciones automaticas",
        summary: "Este paso muestra creacion de template email, agenda de cita y envio final al inbox del cliente.",
        transcript: [
          ["00:00", "Crear template de email para confirmacion de cita."],
          ["00:14", "Elegir servicio, fecha y contacto en scheduler."],
          ["00:26", "Vincular template al flujo de appointment."],
          ["00:38", "El sistema envia email de confirmacion automaticamente."],
          ["00:50", "El cliente recibe detalle y estado de confirmacion."],
        ],
      },
      whatsapp_templates: {
        title: "Reduce no-shows con templates de WhatsApp para recordatorios y seguimiento",
        summary: "Mostramos workflow de templates y como se disparan mensajes aprobados en el momento correcto.",
        transcript: [
          ["00:00", "Crear o importar template aprobado de WhatsApp."],
          ["00:12", "Mapear placeholders: nombre, fecha, servicio, ubicacion."],
          ["00:24", "Asignar template a la politica de recordatorios."],
          ["00:36", "Evolvian envia recordatorio por canal WhatsApp."],
          ["00:48", "Cliente confirma o solicita cambio en el mismo hilo."],
        ],
      },
      agenda_sync: {
        title: "Elimina choques de agenda entre operacion admin y reservas del widget",
        summary: "Paso final: gestion de agendas en Admin y comportamiento de slots en widget en tiempo real.",
        transcript: [
          ["00:00", "Definir horarios de trabajo y duracion por servicio en Admin."],
          ["00:12", "Conectar Google Calendar para bloquear horarios ocupados."],
          ["00:24", "El widget solo muestra ventanas validas al cliente."],
          ["00:36", "Admin visualiza reservas nuevas al instante."],
          ["00:48", "Cancelaciones liberan slots automaticamente."],
        ],
      },
    },
  },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function VideoSlot({ title, src, fallbackTitle, fallbackBody }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div className="video-slot">
      <h3>{title}</h3>
      {!hasError ? (
        <video key={src} controls preload="metadata" onError={() => setHasError(true)}>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="video-placeholder">
          <strong>{fallbackTitle}</strong>
          <p>{fallbackBody}</p>
        </div>
      )}
    </div>
  );
}

export default function Demo() {
  const { language, setLanguage } = usePublicLanguage();
  const t = COPY[language] || COPY.en;

  const [activeStep, setActiveStep] = useState("widget_install");
  const [visitedSteps, setVisitedSteps] = useState({});

  const [leadForm, setLeadForm] = useState(INITIAL_LEAD);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingStep, setPendingStep] = useState(null);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(DEMO_ACCESS_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      const expiresAt = Number(parsed?.expiresAt || 0);
      if (!expiresAt || expiresAt <= Date.now()) {
        localStorage.removeItem(DEMO_ACCESS_KEY);
        return;
      }
      setLeadSubmitted(true);
      setLeadForm((prev) => ({
        ...prev,
        name: parsed?.name || "",
        email: parsed?.email || "",
        phone: parsed?.phone || "",
        acceptedTerms: true,
        acceptedMarketing: Boolean(parsed?.acceptedMarketing),
      }));
    } catch {
      localStorage.removeItem(DEMO_ACCESS_KEY);
    }
  }, []);

  useEffect(() => {
    const rawFeedback = localStorage.getItem(DEMO_FEEDBACK_KEY);
    if (!rawFeedback) return;
    try {
      const parsed = JSON.parse(rawFeedback);
      if (parsed?.rating) setFeedbackSubmitted(true);
    } catch {
      localStorage.removeItem(DEMO_FEEDBACK_KEY);
    }
  }, []);

  useEffect(() => {
    setVisitedSteps((prev) => ({ ...prev, [activeStep]: true }));
  }, [activeStep]);

  const activeStepConfig = useMemo(
    () => STEPS.find((step) => step.id === activeStep) || STEPS[0],
    [activeStep]
  );

  const activeCopy = t.steps[activeStepConfig.id];
  const phase2Reached = activeStepConfig.phase === "phase2";

  const handleSelectStep = (stepId) => {
    const step = STEPS.find((item) => item.id === stepId);
    if (!step) return;
    if (step.phase === "phase2" && !leadSubmitted) {
      setPendingStep(stepId);
      setShowLeadModal(true);
      return;
    }
    setActiveStep(stepId);
  };

  const handleLeadChange = (event) => {
    const { name, type, checked, value } = event.target;
    setLeadForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    setLeadError("");

    if ((leadForm.name || "").trim().length < 2) {
      setLeadError(t.errors.name);
      return;
    }
    if (!emailRegex.test((leadForm.email || "").trim())) {
      setLeadError(t.errors.email);
      return;
    }
    if (!leadForm.acceptedTerms) {
      setLeadError(t.errors.terms);
      return;
    }

    if (leadForm.acceptedMarketing && API_BASE) {
      try {
        const response = await fetch(`${API_BASE}/api/public/demo/lead`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: (leadForm.name || "").trim(),
            email: (leadForm.email || "").trim().toLowerCase(),
            phone: (leadForm.phone || "").trim() || null,
            accepted_terms: true,
            accepted_marketing: true,
            consent_version: "2026-03",
          }),
        });
        if (!response.ok) {
          setLeadError(t.errors.consent);
          return;
        }
      } catch {
        setLeadError(t.errors.consent);
        return;
      }
    }

    const expiresAt = Date.now() + THREE_DAYS_MS;
    localStorage.setItem(
      DEMO_ACCESS_KEY,
      JSON.stringify({
        name: leadForm.name.trim(),
        email: leadForm.email.trim().toLowerCase(),
        phone: leadForm.phone.trim(),
        acceptedMarketing: Boolean(leadForm.acceptedMarketing),
        expiresAt,
        createdAt: Date.now(),
      })
    );

    setLeadSubmitted(true);
    setShowLeadModal(false);

    if (pendingStep) {
      setActiveStep(pendingStep);
      setPendingStep(null);
    }
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();
    setFeedbackError("");

    if (!rating) {
      setFeedbackError(t.errors.stars);
      return;
    }

    localStorage.setItem(
      DEMO_FEEDBACK_KEY,
      JSON.stringify({
        rating,
        comment: feedbackComment.trim(),
        email: (leadForm.email || "").trim().toLowerCase(),
        submittedAt: Date.now(),
      })
    );

    setFeedbackSubmitted(true);
    setShowFeedbackModal(false);
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div className="demo-header-left">
          <img src="/logo-evolvian.svg" alt="Evolvian logo" className="demo-logo" />
          <div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>

        <div className="demo-header-actions">
          <label htmlFor="demo-lang">{language === "es" ? "Idioma" : "Lang"}</label>
          <select id="demo-lang" value={language} onChange={(event) => setLanguage(event.target.value)}>
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Link to="/" className="demo-link-home">
            {t.backHome}
          </Link>
        </div>
      </header>

      <main className="demo-main">
        <aside className="demo-sidebar">
          <h2>Demo</h2>
          <ul>
            {STEPS.map((step, index) => {
              const stepCopy = t.steps[step.id];
              const active = step.id === activeStep;
              const phaseLabel = step.phase === "phase1" ? t.phase1Label : t.phase2Label;
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    className={`demo-step-item ${active ? "is-active" : ""}`}
                    onClick={() => handleSelectStep(step.id)}
                  >
                    <span className="demo-step-index">{index + 1}.</span>
                    <span className="demo-step-text">{stepCopy.title}</span>
                    <span className={`demo-phase-chip ${step.phase}`}>{phaseLabel}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {!leadSubmitted ? <p className="demo-phase-hint">{t.phase2Hint}</p> : null}
        </aside>

        <section className="demo-content">
          {!leadSubmitted ? (
            <article className="demo-phase-gate-card">
              <h3>{t.phase2GateTitle}</h3>
              <p>{t.phase2GateBody}</p>
              <button type="button" onClick={() => setShowLeadModal(true)}>
                {t.phase2GateCta}
              </button>
            </article>
          ) : null}

          <article className="demo-step-stage">
            <header className="demo-step-stage-head">
              <h3>{activeCopy.title}</h3>
              <p>{activeCopy.summary}</p>
            </header>

            <div className="demo-step-columns">
              <section className="demo-transcript-panel">
                <h4>{t.transcriptTitle}</h4>
                <ul>
                  {activeCopy.transcript.map((line) => (
                    <li key={`${activeStep}-${Array.isArray(line) ? line[1] : line}`}>
                      <p>{Array.isArray(line) ? line[1] : line}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <VideoSlot
                title={t.videoAreaTitle}
                src={`/demo-videos/${activeStepConfig.videoFile}`}
                fallbackTitle={t.videoMissingTitle}
                fallbackBody={t.videoMissingBody}
              />
            </div>
          </article>

          {phase2Reached && leadSubmitted ? (
            <div className="demo-footer-actions">
              <button type="button" onClick={() => setShowFeedbackModal(true)}>
                {t.finishDemo}
              </button>
            </div>
          ) : null}

        </section>
      </main>

      {showLeadModal ? (
        <div className="demo-modal-overlay" role="dialog" aria-modal="true" aria-label="Continue with demo">
          <div className="demo-modal-card">
            <h3>{t.phase2GateTitle}</h3>
            <p>{t.phase2GateBody}</p>

            <form onSubmit={handleLeadSubmit}>
              <label>
                {t.formName}
                <input name="name" type="text" value={leadForm.name} onChange={handleLeadChange} required />
              </label>

              <label>
                {t.formEmail}
                <input name="email" type="email" value={leadForm.email} onChange={handleLeadChange} required />
              </label>

              <label>
                {t.formPhone}
                <input name="phone" type="tel" value={leadForm.phone} onChange={handleLeadChange} />
              </label>

              <label className="demo-check">
                <input
                  name="acceptedTerms"
                  type="checkbox"
                  checked={leadForm.acceptedTerms}
                  onChange={handleLeadChange}
                  required
                />
                <span>
                  {t.formTerms} <a href="/terms">Terms</a>
                </span>
              </label>

              <label className="demo-check">
                <input
                  name="acceptedMarketing"
                  type="checkbox"
                  checked={leadForm.acceptedMarketing}
                  onChange={handleLeadChange}
                />
                <span>{t.formMarketing}</span>
              </label>

              {leadError ? <p className="demo-error">{leadError}</p> : null}

              <div className="demo-modal-actions">
                <button type="button" className="secondary" onClick={() => setShowLeadModal(false)}>
                  {t.cancel}
                </button>
                <button type="submit">{t.unlockButton}</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {showFeedbackModal ? (
        <div className="demo-modal-overlay" role="dialog" aria-modal="true" aria-label="Demo feedback">
          <div className="demo-modal-card">
            <h3>{t.feedbackTitle}</h3>
            <p>{t.feedbackBody}</p>

            <form onSubmit={handleFeedbackSubmit}>
              <div className="demo-stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Rate ${value}`}
                    className={value <= rating ? "star active" : "star"}
                    onClick={() => setRating(value)}
                  >
                    ★
                  </button>
                ))}
              </div>

              <label>
                {t.feedbackComment}
                <textarea
                  rows="4"
                  value={feedbackComment}
                  onChange={(event) => setFeedbackComment(event.target.value)}
                  placeholder={t.feedbackPlaceholder}
                />
              </label>

              {feedbackError ? <p className="demo-error">{feedbackError}</p> : null}

              <div className="demo-modal-actions">
                <button type="button" className="secondary" onClick={() => setShowFeedbackModal(false)}>
                  {t.cancel}
                </button>
                <button type="submit">{t.feedbackSubmit}</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
