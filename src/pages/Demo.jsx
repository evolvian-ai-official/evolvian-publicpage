import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";
import "./Demo.css";

const SALES_PUBLIC_CLIENT_ID = "9408uqymxsad";
const WIDGET_IFRAME_URL = `https://evolvian-assistant.onrender.com/static/widget.html?public_client_id=${SALES_PUBLIC_CLIENT_ID}`;

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Espanol" },
];

const COPY = {
  en: {
    languageLabel: "Lang",
    badge: "Live Demo",
    title: "See Evolvian in action",
    subtitle: "This assistant is trained on Evolvian's own data. Ask it anything.",
    guidance:
      "Start with the guided prompts below so you can quickly see pricing answers, channel capabilities, and human handoff behavior.",
    outOfScopePrompt: "Ask a question out of Evolvian scope to test human handoff:",
    askAnything:
      "Then ask whatever question you need so you can learn more about Evolvian.",
    progressLabel: "Question progress",
    status: {
      idle: "Pending",
      sent: "Sent",
      copied: "Copied",
    },
    tooltipSent: "Sent to chat",
    tooltipCopied: "Copied — paste it in the chat",
    tooltipCopyFailed: "Could not copy automatically",
    pricingAnchor: "Plans from $0 — no credit card needed",
    cta: "Set up yours free →",
    ctaHref: "https://evolvianai.net",
    iframeTitle: "Evolvian live assistant",
    questions: [
      "What plans do you offer?",
      "Does it work with WhatsApp?",
      "How long does setup take?",
      "How can I setup my slack with Evolvian",
      "Where is the link for that",
    ],
  },
  es: {
    languageLabel: "Idioma",
    badge: "Demo en Vivo",
    title: "Ve Evolvian en accion",
    subtitle: "Este asistente esta entrenado con los datos reales de Evolvian. Preguntale lo que quieras.",
    guidance:
      "Empieza con estas preguntas guiadas para ver rapido precios, capacidades por canal y el comportamiento de handoff humano.",
    outOfScopePrompt: "Haz una pregunta fuera del alcance de Evolvian para probar handoff humano:",
    askAnything:
      "Luego haz cualquier pregunta que necesites para conocer mejor Evolvian.",
    progressLabel: "Progreso de preguntas",
    status: {
      idle: "Pendiente",
      sent: "Enviado",
      copied: "Copiado",
    },
    tooltipSent: "Enviado al chat",
    tooltipCopied: "Copiado — pegalo en el chat",
    tooltipCopyFailed: "No se pudo copiar automaticamente",
    pricingAnchor: "Planes desde $0 — sin tarjeta de credito",
    cta: "Configura el tuyo gratis →",
    ctaHref: "https://evolvianai.net",
    iframeTitle: "Asistente en vivo de Evolvian",
    questions: [
      "What plans do you offer?",
      "Does it work with WhatsApp?",
      "How long does setup take?",
      "How can I setup my slack with Evolvian",
      "Where is the link for that",
    ],
  },
};

const STATUS_IDLE = "idle";

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

  const handleQuestionClick = async (question, index) => {
    setActiveQuestionIndex(index);

    const didSend = tryDirectIframeSubmit(iframeRef.current, question);
    if (didSend) {
      setQuestionStatus(index, "sent");
      showTooltip(t.tooltipSent);
      return;
    }

    const copied = await copyTextToClipboard(question);
    setQuestionStatus(index, "copied");
    showTooltip(copied ? t.tooltipCopied : t.tooltipCopyFailed);
  };

  return (
    <main className="demo-live-page">
      <div className="demo-live-shell">
        <section className="demo-left-column">
          <div className="demo-left-header">
            <span className="demo-badge">{t.badge}</span>
            <div className="demo-language-picker">
              <label htmlFor="demo-live-lang">{t.languageLabel}</label>
              <select
                id="demo-live-lang"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
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

          {tooltip ? <p className="demo-inline-tooltip">{tooltip}</p> : <p className="demo-inline-tooltip spacer" />}

          <hr className="demo-divider" />

          <p className="demo-price-anchor">{t.pricingAnchor}</p>
          <a
            href={t.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="demo-cta"
          >
            {t.cta}
          </a>
        </section>

        <section className="demo-right-column" aria-label={t.iframeTitle}>
          <iframe
            ref={iframeRef}
            src={WIDGET_IFRAME_URL}
            title={t.iframeTitle}
            loading="lazy"
            className="demo-live-iframe"
            allow="clipboard-write; microphone"
          />
        </section>
      </div>
    </main>
  );
}
