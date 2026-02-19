import React, { useMemo, useState } from "react";
import BlogChrome from "../blog/BlogChrome";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";
import { usePublicConsent, PUBLIC_CONSENT_VERSION } from "../contexts/PublicConsentContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const REQUEST_TYPES = {
  access: { en: "Access my data", es: "Acceso a mis datos" },
  delete: { en: "Delete my data", es: "Eliminar mis datos" },
  correct: { en: "Correct my data", es: "Corregir mis datos" },
  opt_out_sale_share: { en: "Opt out of sale/share", es: "No vender ni compartir" },
  marketing_opt_out: { en: "Unsubscribe marketing", es: "Baja de marketing" },
};

const COPY = {
  en: {
    kicker: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: February 2026",
    intro:
      "At Evolvian, privacy and transparency are core principles. This policy describes how we collect, use, and protect information on the public website.",
    sections: [
      {
        title: "1. Information we collect",
        bullets: [
          "Contact and identity data: name, email, company context, and message details submitted in forms.",
          "Technical data: IP address, browser metadata, and security-related request logs.",
          "Consent data: cookie choices, privacy preference updates, and marketing opt-in records.",
        ],
      },
      {
        title: "2. Purposes of processing",
        bullets: [
          "Respond to sales or support inquiries.",
          "Operate and secure the website and APIs.",
          "Measure performance with consented analytics and campaign attribution.",
          "Manage legal obligations and privacy-rights requests.",
        ],
      },
      {
        title: "3. Cookies and similar technologies",
        body: "Necessary technologies are always active. Analytics and marketing technologies are optional and controlled from your privacy preferences.",
      },
      {
        title: "4. Data sharing",
        body: "We may use service providers to operate hosting, infrastructure, and communications. We do not sell personal information for cash consideration.",
      },
      {
        title: "5. Data retention",
        body: "We retain data only for legitimate business and legal purposes, then delete or anonymize when no longer needed.",
      },
      {
        title: "6. Your rights",
        bullets: [
          "Request access, correction, deletion, or portability where applicable.",
          "Opt out of sale/share and targeted advertising where applicable.",
          "Withdraw marketing consent at any time.",
        ],
      },
      {
        title: "7. Contact",
        body: "For privacy-related requests, contact",
      },
    ],
    choicesTitle: "Privacy choices",
    choicesBody:
      "You can update your consent preferences (analytics/marketing/do-not-sell-or-share) at any time.",
    openChoices: "Open privacy choices",
    rightsTitle: "Submit a privacy request",
    rightsBody:
      "Use this form to submit a rights request. We will verify and respond according to applicable law.",
    labels: {
      name: "Name",
      email: "Email",
      type: "Request type",
      details: "Details",
      submit: "Send request",
      sending: "Sending...",
    },
    placeholders: {
      name: "Your full name (optional)",
      email: "you@company.com",
      details: "Describe your request so our team can process it quickly.",
    },
    requiredEmail: "Email is required.",
    requiredType: "Please select a request type.",
    success: "Request received. Our privacy team will contact you soon.",
    error: "Could not submit your request. Please try again later.",
    policyVersion: "Consent policy version",
  },
  es: {
    kicker: "Legal",
    title: "Politica de Privacidad",
    updated: "Ultima actualizacion: Febrero 2026",
    intro:
      "En Evolvian, la privacidad y transparencia son principios clave. Esta politica describe como recopilamos, usamos y protegemos la informacion en el sitio publico.",
    sections: [
      {
        title: "1. Informacion que recopilamos",
        bullets: [
          "Datos de contacto e identidad: nombre, email, contexto de empresa y mensajes enviados en formularios.",
          "Datos tecnicos: direccion IP, metadata del navegador y logs de seguridad.",
          "Datos de consentimiento: preferencias de cookies, cambios de privacidad y registros de marketing.",
        ],
      },
      {
        title: "2. Finalidades del tratamiento",
        bullets: [
          "Responder solicitudes comerciales o de soporte.",
          "Operar y asegurar el sitio y sus APIs.",
          "Medir rendimiento con analitica consentida y atribucion de campanas.",
          "Gestionar obligaciones legales y solicitudes de derechos de privacidad.",
        ],
      },
      {
        title: "3. Cookies y tecnologias similares",
        body: "Las tecnologias necesarias siempre estan activas. Analitica y marketing son opcionales y se controlan desde tus preferencias de privacidad.",
      },
      {
        title: "4. Comparticion de datos",
        body: "Podemos usar proveedores para hosting, infraestructura y comunicaciones. No vendemos informacion personal por contraprestacion monetaria.",
      },
      {
        title: "5. Retencion de datos",
        body: "Conservamos datos solo por fines legitimos de negocio y legales; despues se eliminan o anonimizan cuando ya no son necesarios.",
      },
      {
        title: "6. Tus derechos",
        bullets: [
          "Solicitar acceso, correccion, eliminacion o portabilidad cuando aplique.",
          "Solicitar no venta/comparticion y no publicidad dirigida cuando aplique.",
          "Retirar consentimiento de marketing en cualquier momento.",
        ],
      },
      {
        title: "7. Contacto",
        body: "Para solicitudes de privacidad, escribe a",
      },
    ],
    choicesTitle: "Preferencias de privacidad",
    choicesBody:
      "Puedes actualizar tus preferencias de consentimiento (analitica/marketing/no vender ni compartir) en cualquier momento.",
    openChoices: "Abrir preferencias de privacidad",
    rightsTitle: "Enviar solicitud de privacidad",
    rightsBody:
      "Usa este formulario para enviar una solicitud de derechos. Responderemos conforme a la ley aplicable.",
    labels: {
      name: "Nombre",
      email: "Email",
      type: "Tipo de solicitud",
      details: "Detalles",
      submit: "Enviar solicitud",
      sending: "Enviando...",
    },
    placeholders: {
      name: "Tu nombre completo (opcional)",
      email: "tu@empresa.com",
      details: "Describe tu solicitud para procesarla rapidamente.",
    },
    requiredEmail: "El email es obligatorio.",
    requiredType: "Selecciona un tipo de solicitud.",
    success: "Solicitud recibida. El equipo de privacidad te contactara pronto.",
    error: "No se pudo enviar la solicitud. Intenta de nuevo mas tarde.",
    policyVersion: "Version de politica de consentimiento",
  },
};

const INITIAL_REQUEST = {
  name: "",
  email: "",
  requestType: "access",
  details: "",
};

export default function Privacy() {
  const { language } = usePublicLanguage();
  const { openPreferences } = usePublicConsent();
  const t = COPY[language] || COPY.en;
  const [requestForm, setRequestForm] = useState(INITIAL_REQUEST);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestTypeOptions = useMemo(
    () =>
      Object.entries(REQUEST_TYPES).map(([value, labelMap]) => ({
        value,
        label: labelMap[language] || labelMap.en,
      })),
    [language]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = requestForm.email.trim().toLowerCase();
    const requestType = requestForm.requestType;

    if (!email) {
      setStatus({ type: "error", message: t.requiredEmail });
      return;
    }
    if (!requestType) {
      setStatus({ type: "error", message: t.requiredType });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch(`${API_BASE}/api/public/privacy/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: requestForm.name.trim(),
          email,
          request_type: requestType,
          details: requestForm.details.trim(),
          language,
          consent_version: PUBLIC_CONSENT_VERSION,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.detail || t.error);
      }

      setStatus({ type: "success", message: t.success });
      setRequestForm(INITIAL_REQUEST);
    } catch (error) {
      console.error("Privacy request failed:", error);
      setStatus({ type: "error", message: t.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusClass = status.type === "success" ? "status-success" : "status-error";

  return (
    <BlogChrome>
      <main className="legal-page">
        <section className="legal-hero">
          <div className="section-shell legal-hero-inner">
            <p className="legal-kicker">{t.kicker}</p>
            <h1>{t.title}</h1>
            <p>{t.updated}</p>
          </div>
        </section>

        <section className="section-base">
          <div className="section-shell legal-shell">
            <article className="legal-card">
              <p>{t.intro}</p>

              {t.sections.map((section) => (
                <div key={section.title}>
                  <h2>{section.title}</h2>
                  {section.body ? (
                    <p>
                      {section.body}{" "}
                      {section.title.includes("Contact") || section.title.includes("Contacto") ? (
                        <>
                          <a href="mailto:privacy@evolvianai.com">privacy@evolvianai.com</a> {language === "es" ? "o" : "or"}{" "}
                          <a href="mailto:support@evolvianai.com">support@evolvianai.com</a>
                        </>
                      ) : null}
                    </p>
                  ) : null}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

              <h2>{t.choicesTitle}</h2>
              <p>{t.choicesBody}</p>
              <button type="button" className="btn btn-secondary legal-choice-btn" onClick={openPreferences}>
                {t.openChoices}
              </button>

              <h2>{t.rightsTitle}</h2>
              <p>{t.rightsBody}</p>

              <form className="legal-request-form" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="privacy-name">
                  {t.labels.name}
                </label>
                <input
                  id="privacy-name"
                  type="text"
                  className="form-control"
                  value={requestForm.name}
                  onChange={(event) => setRequestForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder={t.placeholders.name}
                />

                <label className="form-label" htmlFor="privacy-email">
                  {t.labels.email}
                </label>
                <input
                  id="privacy-email"
                  type="email"
                  className="form-control"
                  required
                  value={requestForm.email}
                  onChange={(event) => setRequestForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder={t.placeholders.email}
                />

                <label className="form-label" htmlFor="privacy-request-type">
                  {t.labels.type}
                </label>
                <select
                  id="privacy-request-type"
                  className="form-control"
                  value={requestForm.requestType}
                  onChange={(event) => setRequestForm((prev) => ({ ...prev, requestType: event.target.value }))}
                >
                  {requestTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <label className="form-label" htmlFor="privacy-details">
                  {t.labels.details}
                </label>
                <textarea
                  id="privacy-details"
                  className="form-control"
                  rows="4"
                  value={requestForm.details}
                  onChange={(event) => setRequestForm((prev) => ({ ...prev, details: event.target.value }))}
                  placeholder={t.placeholders.details}
                />

                <p className="form-hint">
                  {t.policyVersion}: <strong>{PUBLIC_CONSENT_VERSION}</strong>
                </p>

                {status.message ? <p className={`status-message ${statusClass}`}>{status.message}</p> : null}

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? t.labels.sending : t.labels.submit}
                </button>
              </form>
            </article>
          </div>
        </section>
      </main>
    </BlogChrome>
  );
}
