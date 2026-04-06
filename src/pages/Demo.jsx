import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";
import { trackEvent } from "../utils/tracking";
import "./Demo.css";

const SALES_PUBLIC_CLIENT_ID = "9408uqymxsad";
const WIDGET_BASE_URL = "https://evolvian-assistant.onrender.com/static/widget.html";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Espanol" },
];

const FEATURE_ILLUSTRATIONS = [
  "/feature-boxes/feature-01-asistente-ai.png",
  "/feature-boxes/feature-02-historico-unificado.png",
  "/feature-boxes/feature-03-citas-recordatorios.png",
  "/feature-boxes/feature-04-canales-conectados.png",
  "/feature-boxes/feature-05-captura-datos.png",
  "/feature-boxes/feature-06-visibilidad-operativa.png",
];

const COPY = {
  en: {
    languageLabel: "Lang",
    nav: {
      action: "See Evolvian in action",
      home: "Home",
      blog: "Blog",
      cta: "Start free",
    },
    badge: "Live Demo",
    title: "See Evolvian in action",
    subtitle: "This assistant is trained on Evolvian's own data. Ask it anything.",
    guidance:
      "Start with the guided prompts below so you can quickly see pricing answers, channel capabilities, and human handoff behavior.",
    outOfScopePrompt: "Ask something outside Evolvian scope to test human handoff:",
    askAnything:
      "Then ask whatever question you need so you can learn more about Evolvian.",
    scheduleInstructionTitle: "Try the scheduling flow",
    scheduleInstructionBody:
      "Click Book in the top-right area of the chat to test scheduling. The calendar is for solution validation only.",
    feedback: {
      kicker: "Feedback",
      title: "Tell us what worked and what felt unclear",
      description:
        "Share quick feedback about the demo. Email and phone are optional if you want us to follow up.",
      messageLabel: "Feedback",
      messagePlaceholder: "What should we improve or clarify in this demo?",
      emailLabel: "Email (optional)",
      emailPlaceholder: "you@company.com",
      phoneLabel: "Phone (optional)",
      phonePlaceholder: "+1 555 123 4567",
      submit: "Send feedback",
      sending: "Sending...",
      success: "Thanks. Your feedback was saved.",
      error: "We could not save your feedback. Please try again.",
      minLength: "Please write at least 10 characters.",
    },
    progressLabel: "Question progress",
    status: {
      idle: "Pending",
      sent: "Sent",
      copied: "Copied",
    },
    tooltipSent: "Sent to chat",
    tooltipCopied: "Copied - paste it in the chat",
    tooltipCopyFailed: "Could not copy automatically",
    pricingAnchor: "Plans from $0 - no credit card needed",
    cta: "Set up yours for free ->",
    ctaHref: "https://evolvianai.net",
    iframeTitle: "Evolvian live assistant",
    features: {
      kicker: "Why operations teams choose Evolvian",
      title: "Built for daily execution, not just demos",
      description:
        "Every feature is designed to reduce repetitive workload and keep communication consistent across channels.",
      cards: [
        {
          title: "AI assistant aligned to your business",
          description:
            "Upload your documents and instructions so each answer follows your policies and workflows.",
        },
        {
          title: "Message history in one place",
          description:
            "Review previous chat, WhatsApp, and email interactions before replying to each contact.",
        },
        {
          title: "Appointments and reminders",
          description:
            "Enable scheduling, reminder, and follow-up flows from the same assistant experience.",
        },
        {
          title: "Conversation channels: widget, WhatsApp, and email",
          description:
            "Generate conversations through the Evolvian widget, WhatsApp, and email.",
        },
        {
          title: "Capture key customer data",
          description:
            "Collect name, email, phone, and use-case details so your team can act faster.",
        },
        {
          title: "Centralize customer communication with Evolvian",
          description:
            "Manage customer communication and captured data from Evolvian to support daily operations.",
        },
      ],
    },
    questions: [
      "What plans do you offer?",
      "Does it work with WhatsApp?",
      "How long does setup take?",
      "How can I set up Slack with Evolvian?",
      "Where can I find that link?",
    ],
  },
  es: {
    languageLabel: "Idioma",
    nav: {
      action: "Ver Evolvian en accion",
      home: "Inicio",
      blog: "Blog",
      cta: "Empieza gratis",
    },
    badge: "Demo en Vivo",
    title: "Ve Evolvian en accion",
    subtitle: "Este asistente esta entrenado con los datos reales de Evolvian. Pregunta lo que quieras.",
    guidance:
      "Empieza con estas preguntas guiadas para ver rapido precios, capacidades por canal y como funciona el traspaso a una persona.",
    outOfScopePrompt: "Haz una pregunta fuera del alcance de Evolvian para probar el traspaso a una persona:",
    askAnything:
      "Luego haz cualquier pregunta que necesites para conocer mejor Evolvian.",
    scheduleInstructionTitle: "Prueba la funcionalidad de agendar",
    scheduleInstructionBody:
      "Haz clic en Agendar en la parte superior derecha del chat para probar el flujo de agenda. La agenda es solo para fines de validar la solucion.",
    feedback: {
      kicker: "Feedback",
      title: "Dinos que funciono y que se sintio poco claro",
      description:
        "Comparte feedback rapido sobre el demo. Email y telefono son opcionales si quieres que te contactemos.",
      messageLabel: "Feedback",
      messagePlaceholder: "Que deberiamos mejorar o aclarar en este demo?",
      emailLabel: "Email (opcional)",
      emailPlaceholder: "tu@empresa.com",
      phoneLabel: "Telefono (opcional)",
      phonePlaceholder: "+52 55 1234 5678",
      submit: "Enviar feedback",
      sending: "Enviando...",
      success: "Gracias. Tu feedback fue guardado.",
      error: "No pudimos guardar tu feedback. Intentalo de nuevo.",
      minLength: "Escribe al menos 10 caracteres.",
    },
    progressLabel: "Progreso de preguntas",
    status: {
      idle: "Pendiente",
      sent: "Enviado",
      copied: "Copiado",
    },
    tooltipSent: "Enviado al chat",
    tooltipCopied: "Copiado - pegalo en el chat",
    tooltipCopyFailed: "No se pudo copiar automaticamente",
    pricingAnchor: "Planes desde $0 - sin tarjeta de credito",
    cta: "Configura el tuyo gratis ->",
    ctaHref: "https://evolvianai.net",
    iframeTitle: "Asistente en vivo de Evolvian",
    features: {
      kicker: "Por que equipos operativos eligen Evolvian",
      title: "Hecho para la operacion diaria, no solo para demos",
      description:
        "Cada funcion esta disenada para reducir trabajo repetitivo y mantener una atencion consistente entre canales.",
      cards: [
        {
      title: "Asistente IA alineado a tu negocio",
          description:
            "Sube documentos e instrucciones para que cada respuesta siga tus politicas y flujos.",
        },
        {
          title: "Historico unificado de mensajes",
          description:
            "Consulta interacciones previas de chat, WhatsApp y email antes de responder a cada contacto.",
        },
        {
          title: "Citas y recordatorios",
          description:
            "Activa agendas, recordatorios y seguimiento desde la misma experiencia del asistente.",
        },
        {
          title: "Canales de conversacion: chat web, WhatsApp y correo",
          description:
            "Genera conversaciones desde el chat web de Evolvian, WhatsApp y correo.",
        },
        {
          title: "Captura datos clave del cliente",
          description: "Recolecta nombre, email y telefono para que tu equipo actue mas rapido.",
        },
        {
          title: "Centraliza tu comunicacion con clientes con Evolvian",
          description:
            "Gestiona la comunicacion con clientes y los datos capturados desde Evolvian para tu operacion diaria.",
        },
      ],
    },
    questions: [
      "Que planes ofrecen?",
      "Funciona con WhatsApp?",
      "Cuanto tarda la implementacion?",
      "Como conecto Slack con Evolvian?",
      "Donde encuentro ese enlace?",
    ],
  },
};

const STATUS_IDLE = "idle";
const INITIAL_FEEDBACK_FORM = {
  message: "",
  email: "",
  phone: "",
};

function createInitialStatuses(length) {
  return Array.from({ length }, () => STATUS_IDLE);
}

async function copyTextToClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  if (typeof document === "undefined") return false;

  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "");
  temp.style.position = "absolute";
  temp.style.left = "-9999px";
  document.body.appendChild(temp);
  temp.select();

  try {
    const copied = document.execCommand("copy");
    document.body.removeChild(temp);
    return copied;
  } catch {
    document.body.removeChild(temp);
    return false;
  }
}

function tryDirectIframeSubmit(iframe, question) {
  if (!iframe?.contentWindow) return false;

  try {
    iframe.contentWindow.postMessage(
      {
        type: "EVOLVIAN_WIDGET_PREFILL",
        text: question,
        submit: true,
      },
      "*"
    );
  } catch {
    // Ignore postMessage failures.
  }

  try {
    const frameDocument = iframe.contentDocument || iframe.contentWindow.document;
    if (!frameDocument) return false;

    const input =
      frameDocument.querySelector("textarea") ||
      frameDocument.querySelector('input[type="text"]') ||
      frameDocument.querySelector("input:not([type])");

    if (!input) return false;

    input.focus();
    input.value = question;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));

    const form = input.closest("form");
    const sendButton = frameDocument.querySelector(
      'button[type="submit"], button[aria-label*="send" i], button[title*="send" i]'
    );

    if (sendButton) {
      sendButton.click();
      return true;
    }

    if (form) {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      return true;
    }

    input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
      })
    );
    return true;
  } catch {
    return false;
  }
}

export default function Demo() {
  const { language, setLanguage } = usePublicLanguage();
  const t = COPY[language] || COPY.en;
  const iframeRef = useRef(null);
  const tooltipTimerRef = useRef(null);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState(() => createInitialStatuses(COPY.en.questions.length));
  const [tooltip, setTooltip] = useState("");
  const [feedbackForm, setFeedbackForm] = useState(INITIAL_FEEDBACK_FORM);
  const [feedbackState, setFeedbackState] = useState({ type: "idle", message: "" });
  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState(false);

  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams({
      public_client_id: SALES_PUBLIC_CLIENT_ID,
      lang: language,
    });
    return `${WIDGET_BASE_URL}?${params.toString()}`;
  }, [language]);

  const completedCount = useMemo(
    () => questionStatuses.filter((status) => status !== STATUS_IDLE).length,
    [questionStatuses]
  );

  useEffect(() => {
    return () => {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
    };
  }, []);

  const sendLanguageMessage = () => {
    const frame = iframeRef.current;
    if (!frame?.contentWindow) return;

    const payloads = [
      { type: "EVOLVIAN_WIDGET_SET_LANGUAGE", language },
      { type: "EVOLVIAN_WIDGET_LANGUAGE", language },
      { type: "EVOLVIAN_WIDGET_CONTEXT", language },
    ];

    payloads.forEach((payload) => {
      try {
        frame.contentWindow.postMessage(payload, "*");
      } catch {
        // ignore cross-origin postMessage failures
      }
    });
  };

  useEffect(() => {
    sendLanguageMessage();
  }, [language]);

  const showTooltip = (message) => {
    setTooltip(message);
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    tooltipTimerRef.current = setTimeout(() => {
      setTooltip("");
    }, 1800);
  };

  const setQuestionStatus = (index, value) => {
    setQuestionStatuses((prev) => prev.map((status, i) => (i === index ? value : status)));
  };

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    setLanguage(nextLanguage);
    trackEvent({ name: "Demo_Live_Language_Change", category: "Demo", label: nextLanguage });
  };

  const handleQuestionClick = async (question, index) => {
    setActiveQuestionIndex(index);

    const didSend = tryDirectIframeSubmit(iframeRef.current, question);
    if (didSend) {
      setQuestionStatus(index, "sent");
      trackEvent({
        name: "Demo_Live_Question_Send",
        category: "Demo",
        label: `${language}_${index + 1}`,
      });
      showTooltip(t.tooltipSent);
      return;
    }

    const copied = await copyTextToClipboard(question);
    setQuestionStatus(index, "copied");
    trackEvent({
      name: copied ? "Demo_Live_Question_Copy" : "Demo_Live_Question_Copy_Failed",
      category: "Demo",
      label: `${language}_${index + 1}`,
    });
    showTooltip(copied ? t.tooltipCopied : t.tooltipCopyFailed);
  };

  const handleFeedbackChange = (event) => {
    const { name, value } = event.target;
    setFeedbackForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = feedbackForm.message.trim();
    if (trimmedMessage.length < 10) {
      setFeedbackState({ type: "error", message: t.feedback.minLength });
      return;
    }

    setIsFeedbackSubmitting(true);
    setFeedbackState({ type: "idle", message: "" });

    try {
      trackEvent({
        name: "Demo_Live_Feedback_Attempt",
        category: "Demo",
        label: language,
      });

      const response = await fetch(`${API_BASE}/api/public/demo/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          email: feedbackForm.email.trim() || null,
          phone: feedbackForm.phone.trim() || null,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("feedback_failed");
      }

      setFeedbackForm(INITIAL_FEEDBACK_FORM);
      setFeedbackState({ type: "success", message: t.feedback.success });
      trackEvent({
        name: "Demo_Live_Feedback_Submit",
        category: "Demo",
        label: `${language}_${feedbackForm.email.trim() || feedbackForm.phone.trim() ? "with_contact" : "anonymous"}`,
      });
    } catch {
      setFeedbackState({ type: "error", message: t.feedback.error });
      trackEvent({
        name: "Demo_Live_Feedback_Error",
        category: "Demo",
        label: language,
      });
    } finally {
      setIsFeedbackSubmitting(false);
    }
  };

  return (
    <>
      <header className="demo-top-header">
        <div className="demo-top-header-inner">
          <a
            href="/"
            className="demo-brand-link"
            aria-label="Evolvian home"
            onClick={() => trackEvent({ name: "Demo_Live_Logo_Click", category: "Navigation", label: language })}
          >
            <img src="/logo-evolvian.svg" alt="Evolvian logo" className="demo-brand-logo" />
          </a>

          <nav className="demo-top-nav" aria-label="Demo navigation">
            <a href="/" onClick={() => trackEvent({ name: "Demo_Live_Nav_Click", category: "Navigation", label: `home_${language}` })}>
              {t.nav.home}
            </a>
            <a href="/blog" onClick={() => trackEvent({ name: "Demo_Live_Nav_Click", category: "Navigation", label: `blog_${language}` })}>
              {t.nav.blog}
            </a>
            <a href="/demo" className="active" onClick={() => trackEvent({ name: "Demo_Live_Nav_Click", category: "Navigation", label: `demo_${language}` })}>
              {t.nav.action}
            </a>
          </nav>

          <div className="demo-top-actions">
            <label htmlFor="demo-live-lang">{t.languageLabel}</label>
            <select
              id="demo-live-lang"
              value={language}
              onChange={handleLanguageChange}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <a
              href="https://www.evolvianai.net/login"
              target="_blank"
              rel="noopener noreferrer"
              className="demo-top-cta"
              onClick={() => trackEvent({ name: "Demo_Live_StartFree_Click", category: "Demo", label: `header_${language}` })}
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      <main className="demo-live-page">
        <div className="demo-live-shell">
          <section className="demo-left-column">
            <div className="demo-left-header">
              <span className="demo-badge">{t.badge}</span>
            </div>

            <h1>{t.title}</h1>
            <p className="demo-subtitle">{t.subtitle}</p>
            <p className="demo-guidance">{t.guidance}</p>

            <div className="demo-progress-row" aria-label={t.progressLabel}>
              <span>
                {t.progressLabel}: {completedCount}/{t.questions.length}
              </span>
              <div className="demo-progress-track" role="presentation">
                <div
                  className="demo-progress-fill"
                  style={{ width: `${(completedCount / t.questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="demo-question-list" role="list">
              {t.questions.slice(0, 3).map((question, index) => {
                const status = questionStatuses[index];
                const isActive = activeQuestionIndex === index;
                return (
                  <button
                    key={question}
                    type="button"
                    className={`demo-question-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => handleQuestionClick(question, index)}
                    role="listitem"
                  >
                    <span className="demo-question-index">{index + 1}</span>
                    <span className="demo-question-copy">{question}</span>
                    <span className={`demo-question-status status-${status}`}>{t.status[status]}</span>
                  </button>
                );
              })}
            </div>

            <p className="demo-out-of-scope">{t.outOfScopePrompt}</p>

            <div className="demo-question-list" role="list">
              {t.questions.slice(3).map((question, localIndex) => {
                const index = localIndex + 3;
                const status = questionStatuses[index];
                const isActive = activeQuestionIndex === index;
                return (
                  <button
                    key={question}
                    type="button"
                    className={`demo-question-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => handleQuestionClick(question, index)}
                    role="listitem"
                  >
                    <span className="demo-question-index">{index + 1}</span>
                    <span className="demo-question-copy">{question}</span>
                    <span className={`demo-question-status status-${status}`}>{t.status[status]}</span>
                  </button>
                );
              })}
            </div>

            <p className="demo-anything-text">{t.askAnything}</p>

            <div className="demo-schedule-callout" role="note" aria-label={t.scheduleInstructionTitle}>
              <strong>{t.scheduleInstructionTitle}</strong>
              <p>{t.scheduleInstructionBody}</p>
            </div>

            {tooltip ? <p className="demo-inline-tooltip">{tooltip}</p> : <p className="demo-inline-tooltip spacer" />}

            <hr className="demo-divider" />

            <p className="demo-price-anchor">{t.pricingAnchor}</p>
            <a
              href={t.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-cta"
              onClick={() => trackEvent({ name: "Demo_Live_StartFree_Click", category: "Demo", label: `footer_${language}` })}
            >
              {t.cta}
            </a>
          </section>

          <section className="demo-right-column" aria-label={t.iframeTitle}>
            <iframe
              key={language}
              ref={iframeRef}
              src={iframeSrc}
              title={t.iframeTitle}
              loading="lazy"
              className="demo-live-iframe"
              allow="clipboard-write; microphone"
              onLoad={sendLanguageMessage}
            />
          </section>
        </div>

        <section className="demo-features-section" id="features">
          <div className="demo-features-heading">
            <p>{t.features.kicker}</p>
            <h2>{t.features.title}</h2>
            <p>{t.features.description}</p>
          </div>
          <div className="demo-features-grid">
            {t.features.cards.map((feature, index) => (
              <article key={feature.title} className="demo-feature-card">
                <div className={`demo-feature-media ${index === 4 ? "is-wide" : ""}`}>
                  <img
                    src={FEATURE_ILLUSTRATIONS[index]}
                    alt={feature.title}
                    loading="lazy"
                  />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="demo-feedback-section" id="feedback">
          <div className="demo-feedback-heading">
            <p>{t.feedback.kicker}</p>
            <h2>{t.feedback.title}</h2>
            <p>{t.feedback.description}</p>
          </div>

          <form className="demo-feedback-form" onSubmit={handleFeedbackSubmit}>
            <label className="demo-feedback-field">
              <span>{t.feedback.messageLabel}</span>
              <textarea
                name="message"
                rows="5"
                value={feedbackForm.message}
                onChange={handleFeedbackChange}
                placeholder={t.feedback.messagePlaceholder}
                required
                minLength={10}
              />
            </label>

            <div className="demo-feedback-grid">
              <label className="demo-feedback-field">
                <span>{t.feedback.emailLabel}</span>
                <input
                  name="email"
                  type="email"
                  value={feedbackForm.email}
                  onChange={handleFeedbackChange}
                  placeholder={t.feedback.emailPlaceholder}
                />
              </label>

              <label className="demo-feedback-field">
                <span>{t.feedback.phoneLabel}</span>
                <input
                  name="phone"
                  type="tel"
                  value={feedbackForm.phone}
                  onChange={handleFeedbackChange}
                  placeholder={t.feedback.phonePlaceholder}
                />
              </label>
            </div>

            {feedbackState.message ? (
              <p className={`demo-feedback-status is-${feedbackState.type}`}>{feedbackState.message}</p>
            ) : null}

            <button type="submit" className="demo-feedback-submit" disabled={isFeedbackSubmitting}>
              {isFeedbackSubmitting ? t.feedback.sending : t.feedback.submit}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
