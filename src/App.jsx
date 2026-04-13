import React, { useEffect, useMemo, useState } from "react";
import * as Label from "@radix-ui/react-label";
import { trackConversion, trackEvent } from "./utils/tracking";
import { usePublicLanguage } from "./contexts/PublicLanguageContext";
import { usePublicConsent, PUBLIC_CONSENT_VERSION } from "./contexts/PublicConsentContext";
import HealthcareSection from "./components/HealthcareSection";
import PublicPricingSection from "./components/PublicPricingSection";
import LandingPage from "./pages/LandingPage";
import { getPublicLandingVariant } from "./lib/publicLandingVariant";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const INITIAL_CONTACT_FORM = {
  name: "",
  email: "",
  subject: "",
  plan: "Starter",
  usage: "",
  acceptedTerms: false,
  acceptedPrivacy: false,
  acceptedMarketing: false,
};

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Espanol" },
];

const DIRECT_LOGIN_URL = "https://www.evolvianai.net/login";

const FEATURE_ILLUSTRATION_SLOTS = [
  { fileName: "feature-01-asistente-ai.png", publicUrl: "/feature-boxes/feature-01-asistente-ai.png" },
  { fileName: "feature-02-historico-unificado.png", publicUrl: "/feature-boxes/feature-02-historico-unificado.png" },
  { fileName: "feature-03-citas-recordatorios.png", publicUrl: "/feature-boxes/feature-03-citas-recordatorios.png" },
  { fileName: "feature-04-canales-conectados.png", publicUrl: "/feature-boxes/feature-04-canales-conectados.png" },
  { fileName: "feature-05-captura-datos.png", publicUrl: "/feature-boxes/feature-05-captura-datos.png" },
  { fileName: "feature-06-visibilidad-operativa.png", publicUrl: "/feature-boxes/feature-06-visibilidad-operativa.png" },
];

const FOOTER_SOCIAL_LINKS = [
  { key: "whatsapp", label: "WhatsApp", href: "https://www.whatsapp.com/" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
];

function FeatureIllustration({ imageSlot, featureTitle, featureCopy }) {
  const [hasImageError, setHasImageError] = useState(false);

  if (!imageSlot) return null;

  if (!hasImageError) {
    return (
      <div className="feature-image-frame">
        <img
          src={imageSlot.publicUrl}
          alt={featureTitle}
          className="feature-image"
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className="feature-image-slot" aria-label={featureCopy.imageSlotTitle}>
      <p className="feature-image-slot-title">{featureCopy.imageSlotTitle}</p>
      <p className="feature-image-slot-meta">
        {featureCopy.imageSlotPathLabel}: <code>{imageSlot.publicUrl}</code>
      </p>
      <p className="feature-image-slot-meta">
        {featureCopy.imageSlotFileLabel}: <code>{imageSlot.fileName}</code>
      </p>
      <p className="feature-image-slot-hint">{featureCopy.imageSlotHint}</p>
    </div>
  );
}

const COPY = {
  en: {
    nav: { features: "Features", plans: "Plans", contact: "Contact", about: "About", blog: "Blog", demo: "See Evolvian in action" },
    auth: { login: "Log in", startFree: "Start free" },
    hero: {
      kicker: "AI Operations Assistant for Growing Teams",
      titleBefore: "Automate daily operations with",
      titleEmphasis: "one assistant for chat, WhatsApp, and email",
      description:
        "Deploy an assistant trained on your own content to handle operational conversations, schedule appointments, send reminders, and keep message history in one place.",
      ctaPrimary: "Start free",
      ctaSecondary: "Talk to team",
      ctaDemo: "See Evolvian in action",
      pills: ["No-code setup", "Appointments + reminders", "Message history included"],
      statLeadLabel: "Operational load",
      statLeadValue: "Less manual work",
      statSetupLabel: "Go-live time",
      statSetupValue: "< 1 day",
    },
    trust: [
      { title: "Operational assistant", description: "Resolve repetitive daily requests with AI guided by your process." },
      { title: "Connected channels", description: "Website chat, WhatsApp, and email in one unified conversation flow." },
      { title: "Appointments and reminders", description: "Automate scheduling confirmations and reminder messages." },
      { title: "History by contact", description: "Keep message history so your team always has full context." },
    ],
    features: {
      kicker: "Why operations teams choose Evolvian",
      title: "Built for daily execution, not just demos",
      description:
        "Every feature is designed to reduce repetitive workload and keep communication consistent across channels.",
      imageSlotTitle: "Illustrative image space",
      imageSlotPathLabel: "Suggested URL path",
      imageSlotFileLabel: "Suggested file name",
      imageSlotHint: "Add the file in public/feature-boxes with this name to show the illustration here.",
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
            "Generate conversations through the Evolvian widget, WhatsApp, and email. These channels are not unified yet.",
        },
        {
          title: "Capture key customer data",
          description:
            "Collect name, email, phone, and use-case details so your team can act faster.",
        },
        {
          title: "Centralize customer communication with Evolvian",
          description: "Manage customer communication and captured data from Evolvian to support daily operations.",
        },
      ],
    },
    plans: {
      kicker: "Pricing",
      title: "Choose the plan that matches your current operations",
      description: "Start free and upgrade as conversation volume and automation needs grow.",
      mostPopular: "Most popular",
      ctas: {
        free: "Start for free",
        starter: "Get Starter",
        premium: "Get Premium",
        white_label: "Talk to sales",
      },
      descriptions: {
        free: "Try Evolvian at no cost.",
        starter: "Perfect for small businesses that need real automation.",
        premium: "Best value for teams handling recurring operational conversations.",
        white_label: "Enterprise and agency solution with tailored implementation.",
      },
      highlights: {
        free: [
          "500 messages / month",
          "Upload documents",
          "Basic dashboard",
          "Website chat widget integration",
        ],
        starter: [
          "2,000 messages / month",
          "Upload documents",
          "Basic dashboard",
          "Website chat widget integration",
          "WhatsApp AI setup support",
        ],
        premium: [
          "Everything in Starter",
          "5,000 messages / month",
          "Upload documents",
          "Advanced widget customization",
          "Custom assistant prompt",
          "WhatsApp appointments and reminders",
        ],
        white_label: ["Unlimited messages", "Unlimited documents", "Dedicated onboarding", "Priority support"],
      },
    },
    process: {
      kicker: "Implementation flow",
      title: "From setup to automated operations in 3 steps",
      items: [
        {
          step: "01",
          title: "Define your use case",
          description: "Tell us your goals, channels, and what your users ask the most.",
        },
        {
          step: "02",
          title: "Upload your context",
          description: "Train the assistant with your docs, FAQs, and service details.",
        },
        {
          step: "03",
          title: "Launch and optimize",
          description: "Deploy to your channels and improve daily execution with live data.",
        },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Tell us what you want to automate",
      description:
        "Share your current process and we will propose the best setup for your business. Our team usually responds in less than 24 hours.",
      metrics: [
        { value: "<24h", label: "Average response time" },
        { value: "3 channels", label: "Web, WhatsApp, email" },
        { value: "Bilingual", label: "English and Spanish support" },
      ],
      labels: {
        name: "Name",
        email: "Business email",
        subject: "Subject",
        plan: "Interested plan",
        usage: "Tell us your use case",
      },
      placeholders: {
        name: "Your full name",
        email: "you@company.com",
        subject: "What do you want to improve?",
        usage: "Example: We need to automate first response, appointments, and reminders from WhatsApp.",
      },
      terms: "I accept the Terms & Conditions.",
      termsPrefix: "I accept the",
      privacyPrefix: "I have read the",
      marketing: "I want to receive product updates and marketing emails from Evolvian.",
      minChars: "Minimum 10 characters.",
      submit: "Send message",
      sending: "Sending...",
      helper: "Prefer instant support? Open the widget icon on the right and chat with Evolvian Assistant.",
      faqs: [
        {
          question: "How long does it take to launch?",
          answer:
            "Most teams can launch in less than one day after uploading core docs and configuring channels.",
        },
        {
          question: "Can I start free and upgrade later?",
          answer: "Yes. You can begin with Free and move to Starter or Premium when your volume increases.",
        },
        {
          question: "Does the assistant work in Spanish and English?",
          answer: "Yes, you can configure language behavior and support bilingual conversations.",
        },
      ],
    },
    about: {
      kicker: "About Evolvian",
      title: "We help teams scale support and customer communication with AI",
      description:
        "Evolvian empowers businesses to deploy assistants aligned with their own policies and knowledge base. The result is faster response times, consistent follow-up, and smoother day-to-day operations.",
      bullets: [
        "Custom prompts by business",
        "Customer data capture connected to operations",
        "Transparent setup and support",
      ],
    },
    footer: {
      locationTitle: "Location",
      locationLine1: "1001 S Main St Ste 500",
      locationLine2: "Kalispell, MT 59901",
      contactTitle: "Contact",
      socialTitle: "Social",
      legalTitle: "Legal",
      getStarted: "Get started",
      createAccount: "Create your account",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      privacyChoices: "Privacy choices / Do not sell or share",
      rights: "All rights reserved.",
    },
    messages: {
      termsRequired: "You must accept Terms & Conditions before sending the form.",
      privacyRequired: "You must accept the Privacy Policy before sending the form.",
      duplicate:
        "We already have your email registered. Send us an email at sales@evolvianai.com or chat with Evolvian Assistant using the icon on your right.",
      genericError: "We could not send your request. Please try again in a few minutes.",
      successTitle: "Request received",
      successBody: "Thanks for contacting us. We will reach out soon to learn more about what you need.",
      close: "Close",
    },
  },
  es: {
    nav: { features: "Funciones", plans: "Planes", contact: "Contacto", about: "Nosotros", blog: "Blog", demo: "Ver Evolvian en accion" },
    auth: { login: "Iniciar sesion", startFree: "Empieza gratis" },
    hero: {
      kicker: "Plataforma de Asistente AI Operativo",
      titleBefore: "Automatiza tu operacion diaria con",
      titleEmphasis: "un asistente para chat, WhatsApp y email",
      description:
        "Despliega un asistente entrenado con tu contenido para atender la parte operativa: responder mensajes, agendar citas, enviar recordatorios y guardar historico de conversaciones.",
      ctaPrimary: "Empieza gratis",
      ctaSecondary: "Hablar con equipo",
      ctaDemo: "Ver Evolvian en accion",
      pills: ["Sin codigo", "Citas y recordatorios", "Historico de mensajes"],
      statLeadLabel: "Carga operativa",
      statLeadValue: "Menos trabajo manual",
      statSetupLabel: "Tiempo de lanzamiento",
      statSetupValue: "< 1 dia",
    },
    trust: [
      { title: "Asistente operativo", description: "Resuelve solicitudes repetitivas del dia a dia con AI guiada por tu proceso." },
      { title: "Canales conectados", description: "Web chat, WhatsApp y email en un solo flujo de conversacion." },
      { title: "Citas y recordatorios", description: "Automatiza confirmaciones de agenda y mensajes de recordatorio." },
      { title: "Historico por contacto", description: "Conserva el historico de mensajes para responder con contexto completo." },
    ],
    features: {
      kicker: "Por que equipos operativos eligen Evolvian",
      title: "Hecho para la operacion diaria, no solo para demos",
      description:
        "Cada funcion esta disenada para reducir trabajo repetitivo y mantener una atencion consistente entre canales.",
      imageSlotTitle: "Espacio para imagen ilustrativa",
      imageSlotPathLabel: "Ruta sugerida",
      imageSlotFileLabel: "Nombre sugerido",
      imageSlotHint: "Coloca el archivo en public/feature-boxes con este nombre y la imagen se mostrara aqui.",
      cards: [
        {
          title: "Asistente AI alineado a tu negocio",
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
          title: "Canales de conversacion: widget, WhatsApp y email",
          description:
            "Genera conversaciones por Evolvian widget, WhatsApp y email.",
        },
        {
          title: "Captura datos clave del cliente",
          description: "Recolecta nombre, email y telefono para que tu equipo actue mas rapido.",
        },
        {
          title: "Centraliza tu comunicacion con clientes con Evolvian",
          description: "Gestiona la comunicacion con clientes y los datos capturados desde Evolvian para tu operacion diaria.",
        },
      ],
    },
    plans: {
      kicker: "Planes",
      title: "Elige el plan segun tu operacion actual",
      description: "Empieza gratis y sube de plan cuando aumenten tus conversaciones y automatizacion.",
      mostPopular: "Mas popular",
      ctas: {
        free: "Empieza gratis",
        starter: "Obtener Starter",
        premium: "Obtener Premium",
        white_label: "Hablar con ventas",
      },
      descriptions: {
        free: "Prueba Evolvian sin costo.",
        starter: "Ideal para negocios pequenos que necesitan automatizar.",
        premium: "Mejor opcion para equipos con conversaciones operativas recurrentes.",
        white_label: "Solucion empresarial y agencias con implementacion a medida.",
      },
      highlights: {
        free: [
          "500 mensajes / mes",
          "Upload documents",
          "Dashboard basico",
          "Integracion de chat widget en web",
        ],
        starter: [
          "2,000 mensajes / mes",
          "Upload documents",
          "Dashboard basico",
          "Integracion de chat widget en web",
          "Soporte de configuracion AI para WhatsApp",
        ],
        premium: [
          "Todo lo de Starter",
          "5,000 mensajes / mes",
          "Upload documents",
          "Personalizacion avanzada de widget",
          "Prompt personalizado",
          "Citas y recordatorios por WhatsApp",
        ],
        white_label: ["Mensajes ilimitados", "Documentos ilimitados", "Onboarding dedicado", "Soporte prioritario"],
      },
    },
    process: {
      kicker: "Flujo de implementacion",
      title: "De setup a operacion automatizada en 3 pasos",
      items: [
        {
          step: "01",
          title: "Define tu caso de uso",
          description: "Comparte objetivos, canales y preguntas mas frecuentes de tus usuarios.",
        },
        {
          step: "02",
          title: "Sube tu contexto",
          description: "Entrena al asistente con documentos, FAQs y detalles de servicio.",
        },
        {
          step: "03",
          title: "Lanza y optimiza",
          description: "Publica en tus canales y mejora la ejecucion diaria con datos reales.",
        },
      ],
    },
    contact: {
      kicker: "Contacto",
      title: "Cuentanos que quieres automatizar",
      description:
        "Comparte tu proceso actual y te propondremos la mejor configuracion para tu negocio. Respondemos normalmente en menos de 24 horas.",
      metrics: [
        { value: "<24h", label: "Tiempo promedio de respuesta" },
        { value: "3 canales", label: "Web, WhatsApp, email" },
        { value: "Bilingue", label: "Soporte en ingles y espanol" },
      ],
      labels: {
        name: "Nombre",
        email: "Email de negocio",
        subject: "Asunto",
        plan: "Plan de interes",
        usage: "Cuentanos tu caso de uso",
      },
      placeholders: {
        name: "Tu nombre completo",
        email: "tu@empresa.com",
        subject: "Que te gustaria mejorar?",
        usage: "Ejemplo: Necesitamos automatizar primera respuesta, citas y recordatorios por WhatsApp.",
      },
      terms: "Acepto los Terminos y Condiciones.",
      termsPrefix: "Acepto los",
      privacyPrefix: "He leido la",
      marketing: "Quiero recibir novedades y emails de marketing de Evolvian.",
      minChars: "Minimo 10 caracteres.",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      helper: "Prefieres soporte inmediato? Abre el icono del widget a la derecha y conversa con Evolvian Assistant.",
      faqs: [
        {
          question: "Cuanto tardamos en lanzar?",
          answer: "La mayoria de equipos puede lanzar en menos de un dia al subir sus documentos base.",
        },
        {
          question: "Puedo empezar gratis y luego subir de plan?",
          answer: "Si. Puedes iniciar en Free y pasar a Starter o Premium cuando aumente tu volumen.",
        },
        {
          question: "Funciona en ingles y espanol?",
          answer: "Si, puedes configurar comportamiento bilingue para tus conversaciones.",
        },
      ],
    },
    about: {
      kicker: "Sobre Evolvian",
      title: "Ayudamos a escalar soporte y comunicacion con clientes con AI",
      description:
        "Evolvian permite desplegar asistentes alineados a politicas y base de conocimiento de cada negocio. Resultado: respuestas mas rapidas, seguimiento consistente y una operacion diaria mas fluida.",
      bullets: [
        "Prompts personalizados por negocio",
        "Captura de datos de cliente conectada a operacion",
        "Implementacion clara y soporte",
      ],
    },
    footer: {
      locationTitle: "Ubicacion",
      locationLine1: "1001 S Main St Ste 500",
      locationLine2: "Kalispell, MT 59901",
      contactTitle: "Contacto",
      socialTitle: "Redes",
      legalTitle: "Legal",
      getStarted: "Comenzar",
      createAccount: "Crear tu cuenta",
      terms: "Terminos y Condiciones",
      privacy: "Politica de Privacidad",
      privacyChoices: "Preferencias de privacidad / No vender ni compartir",
      rights: "Todos los derechos reservados.",
    },
    messages: {
      termsRequired: "Debes aceptar los Terminos y Condiciones para enviar el formulario.",
      privacyRequired: "Debes aceptar la Politica de Privacidad para enviar el formulario.",
      duplicate:
        "Ya tenemos tu email registrado. Mandanos un email a sales@evolvianai.com o chatea con Evolvian Assistant abriendo el icono a tu derecha.",
      genericError: "No pudimos enviar tu solicitud. Intentalo de nuevo en unos minutos.",
      successTitle: "Solicitud recibida",
      successBody: "Muchas gracias por contactarnos. Te escribiremos pronto para conocer mejor lo que necesitas.",
      close: "Cerrar",
    },
  },
};

function FooterSocialIcon({ kind }) {
  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (kind === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
        <path d="M8 11v5" />
        <path d="M12 16v-5" />
        <path d="M12 13.2c0-1.2.8-2.2 2-2.2s2 .9 2 2.3V16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2-5.1A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M9.2 9.3c.3-.6.7-.7 1-.7h.3c.1 0 .3.1.4.3l.7 1.5c.1.2.1.4 0 .6l-.5.6c-.1.1-.2.2-.1.4.4.8 1.1 1.5 1.9 2 .2.1.3 0 .4-.1l.6-.5c.2-.1.4-.2.6-.1l1.4.7c.2.1.3.2.3.4v.3c0 .3-.1.7-.7 1-.4.2-1 .2-1.7 0-1.8-.6-4.2-2.8-4.9-4.9-.2-.7-.2-1.4.1-1.8Z" />
    </svg>
  );
}

function GenericLandingPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const { language, setLanguage } = usePublicLanguage();
  const { openPreferences } = usePublicConsent();
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM);
  const [contactStatus, setContactStatus] = useState({ type: "idle", message: "" });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [showContactSuccessModal, setShowContactSuccessModal] = useState(false);

  const t = COPY[language] || COPY.en;

  const navLinks = useMemo(
    () => [
      { href: "#features", label: t.nav.features },
      { href: "#plans", label: t.nav.plans },
      { href: "#contact", label: t.nav.contact },
      { href: "#about-us", label: t.nav.about },
      { href: "/blog", label: t.nav.blog },
      { href: "/demo", label: t.nav.demo },
    ],
    [t]
  );

  useEffect(() => {
    if (!showContactSuccessModal) return undefined;
    const timeoutId = setTimeout(() => setShowContactSuccessModal(false), 5000);
    return () => clearTimeout(timeoutId);
  }, [showContactSuccessModal]);

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    setLanguage(nextLanguage);
    trackEvent({ name: "Language_Change", category: "UX", label: nextLanguage });
  };

  const handleContactInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setContactForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (!contactForm.acceptedTerms) {
      setContactStatus({ type: "error", message: t.messages.termsRequired });
      return;
    }
    if (!contactForm.acceptedPrivacy) {
      setContactStatus({ type: "error", message: t.messages.privacyRequired });
      return;
    }

    setIsContactSubmitting(true);
    setContactStatus({ type: "idle", message: "" });

    try {
      trackEvent({
        name: "Contact_Form_Attempt",
        category: "Lead",
        label: `${contactForm.plan}_${language}`,
      });

      const response = await fetch(`${API_BASE}/api/public/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          subject: contactForm.subject.trim(),
          plan: contactForm.plan,
          usage: contactForm.usage.trim(),
          accepted_terms: contactForm.acceptedTerms,
          accepted_privacy: contactForm.acceptedPrivacy,
          accepted_marketing: contactForm.acceptedMarketing,
          consent_version: PUBLIC_CONSENT_VERSION,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const detail = errorPayload?.detail;

        if (response.status === 409 && detail?.code === "DUPLICATE_EMAIL") {
          trackEvent({
            name: "Contact_Form_Duplicate_Email",
            category: "Lead",
            label: `${contactForm.plan}_${language}`,
          });
          setContactStatus({
            type: "warning",
            message: language === "es" ? detail?.message || t.messages.duplicate : t.messages.duplicate,
          });
          return;
        }

        const detailMessage =
          typeof detail === "string"
            ? detail
            : detail?.message || `No se pudo enviar el formulario (status ${response.status}).`;

        throw new Error(detailMessage);
      }

      trackEvent({
        name: "Contact_Form_Submit",
        category: "Lead",
        label: `${contactForm.plan}_${language}`,
      });
      trackConversion("Lead", {
        currency: "USD",
        value: 1,
      });

      setShowContactSuccessModal(true);
      setContactForm(INITIAL_CONTACT_FORM);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setContactStatus({ type: "error", message: error?.message || t.messages.genericError });
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const contactStatusClass =
    contactStatus.type === "error"
      ? "status-error"
      : contactStatus.type === "warning"
      ? "status-warning"
      : "status-success";

  return (
    <>
      <header className="main-header">
        <div className="section-shell header-inner">
          <a href="/" className="brand-link" onClick={() => trackEvent({ name: "Logo_Click", category: "Navigation" })}>
            <img src="/logo-evolvian.svg" alt="Evolvian logo" className="brand-logo" />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => trackEvent({ name: "Nav_Click", category: "Navigation", label: `${link.label}_${language}` })}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="desktop-actions">
            <div className="lang-group">
              <label htmlFor="language-select" className="lang-label">Lang</label>
              <select id="language-select" value={language} onChange={handleLanguageChange} className="lang-select">
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <a
              href={DIRECT_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              onClick={() => trackEvent({ name: "Login_Click", category: "Navigation", label: `Header_${language}` })}
            >
              {t.auth.login}
            </a>
            <a
              href={DIRECT_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => trackEvent({ name: "Register_Click", category: "Navigation", label: `Header_${language}` })}
            >
              {t.auth.startFree}
            </a>
          </div>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            aria-expanded={openMenu}
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {openMenu ? (
          <div className="mobile-nav">
            <div className="section-shell mobile-nav-inner">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    trackEvent({ name: "Nav_Click", category: "Navigation", label: `${link.label}_Mobile_${language}` });
                    setOpenMenu(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="mobile-lang-row">
                <label htmlFor="language-select-mobile" className="lang-label">Lang</label>
                <select id="language-select-mobile" value={language} onChange={handleLanguageChange} className="lang-select">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <a
                href={DIRECT_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={() => {
                  trackEvent({ name: "Register_Click", category: "Navigation", label: `Header_Mobile_${language}` });
                  setOpenMenu(false);
                }}
              >
                {t.auth.startFree}
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-glow hero-glow-left" />
          <div className="hero-glow hero-glow-right" />
          <div className="section-shell hero-grid">
            <div>
              <p className="hero-kicker">{t.hero.kicker}</p>
              <h1 className="hero-title">
                {t.hero.titleBefore} <span>{t.hero.titleEmphasis}</span>
              </h1>
              <p className="hero-description">{t.hero.description}</p>

              <div className="hero-cta-row">
                <a
                  href={DIRECT_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-large btn-evolvian-yellow"
                  onClick={() => trackEvent({ name: "Hero_StartFree_Click", category: "Hero", label: language })}
                >
                  {t.hero.ctaPrimary}
                </a>
                <a
                  href="#contact"
                  className="btn btn-ghost btn-large btn-evolvian-yellow-outline"
                  onClick={() => trackEvent({ name: "Hero_BookDemo_Click", category: "Hero", label: language })}
                >
                  {t.hero.ctaSecondary}
                </a>
                <a
                  href="/demo"
                  className="btn btn-secondary btn-large"
                  onClick={() => trackEvent({ name: "Hero_Demo_Click", category: "Hero", label: language })}
                >
                  {t.hero.ctaDemo}
                </a>
              </div>

              <div className="hero-pill-row">
                {t.hero.pills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual card-lift">
              <img src="/ai-illustration.png" alt="Evolvian AI preview" className="hero-image" />
              <div className="hero-float hero-float-one">
                <p>{t.hero.statLeadLabel}</p>
                <strong>{t.hero.statLeadValue}</strong>
              </div>
              <div className="hero-float hero-float-two">
                <p>{t.hero.statSetupLabel}</p>
                <strong>{t.hero.statSetupValue}</strong>
              </div>
            </div>
          </div>
        </section>

        <HealthcareSection />

        <section className="trust-strip">
          <div className="section-shell trust-grid">
            {t.trust.map((item) => (
              <article key={item.title} className="trust-card card-lift">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="features" className="section-base">
          <div className="section-shell">
            <div className="section-heading">
              <p className="section-kicker">{t.features.kicker}</p>
              <h2>{t.features.title}</h2>
              <p>{t.features.description}</p>
            </div>

            <div className="feature-grid">
              {t.features.cards.map((feature, index) => {
                const imageSlot = FEATURE_ILLUSTRATION_SLOTS[index];
                return (
                  <article key={feature.title} className="feature-card card-lift">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <FeatureIllustration imageSlot={imageSlot} featureTitle={feature.title} featureCopy={t.features} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <PublicPricingSection copy={t.plans} language={language} />

        <section className="section-base" id="process">
          <div className="section-shell">
            <div className="section-heading">
              <p className="section-kicker">{t.process.kicker}</p>
              <h2>{t.process.title}</h2>
            </div>

            <div className="process-grid">
              {t.process.items.map((item) => (
                <article key={item.step} className="process-card card-lift">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-base section-muted">
          <div className="section-shell contact-grid">
            <div className="contact-copy">
              <p className="section-kicker">{t.contact.kicker}</p>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.description}</p>

              <div className="contact-metrics">
                {t.contact.metrics.map((metric) => (
                  <div key={metric.value + metric.label}>
                    <strong>{metric.value}</strong>
                    <p>{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="faq-list">
                {t.contact.faqs.map((faq) => (
                  <article key={faq.question}>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="contact-form-card">
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div>
                  <Label.Root htmlFor="name" className="form-label">
                    {t.contact.labels.name}
                  </Label.Root>
                  <input
                    id="name"
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={handleContactInputChange}
                    placeholder={t.contact.placeholders.name}
                    className="form-control"
                  />
                </div>

                <div>
                  <Label.Root htmlFor="email" className="form-label">
                    {t.contact.labels.email}
                  </Label.Root>
                  <input
                    id="email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    placeholder={t.contact.placeholders.email}
                    className="form-control"
                  />
                </div>

                <div>
                  <Label.Root htmlFor="subject" className="form-label">
                    {t.contact.labels.subject}
                  </Label.Root>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={handleContactInputChange}
                    placeholder={t.contact.placeholders.subject}
                    className="form-control"
                  />
                </div>

                <div>
                  <Label.Root htmlFor="plan" className="form-label">
                    {t.contact.labels.plan}
                  </Label.Root>
                  <select id="plan" required value={contactForm.plan} onChange={handleContactInputChange} className="form-control">
                    <option value="Free">Free</option>
                    <option value="Starter">Starter</option>
                    <option value="Premium">Premium</option>
                    <option value="White Label">White Label</option>
                  </select>
                </div>

                <div>
                  <Label.Root htmlFor="usage" className="form-label">
                    {t.contact.labels.usage}
                  </Label.Root>
                  <textarea
                    id="usage"
                    rows="5"
                    required
                    minLength={10}
                    value={contactForm.usage}
                    onChange={handleContactInputChange}
                    placeholder={t.contact.placeholders.usage}
                    className="form-control"
                  />
                  <p className="form-hint">{t.contact.minChars}</p>
                </div>

                <label className="check-row">
                  <input id="acceptedTerms" type="checkbox" required checked={contactForm.acceptedTerms} onChange={handleContactInputChange} />
                  <span>
                    {t.contact.termsPrefix}{" "}
                    <a href="/terms">{t.footer.terms}</a>.
                  </span>
                </label>

                <label className="check-row">
                  <input
                    id="acceptedPrivacy"
                    type="checkbox"
                    required
                    checked={contactForm.acceptedPrivacy}
                    onChange={handleContactInputChange}
                  />
                  <span>
                    {t.contact.privacyPrefix}{" "}
                    <a href="/privacy">{t.footer.privacy}</a>.
                  </span>
                </label>

                <label className="check-row">
                  <input id="acceptedMarketing" type="checkbox" checked={contactForm.acceptedMarketing} onChange={handleContactInputChange} />
                  <span>{t.contact.marketing}</span>
                </label>

                {contactStatus.message ? (
                  <p role="status" aria-live="polite" className={`status-message ${contactStatusClass}`}>
                    {contactStatus.message}
                  </p>
                ) : null}

                <button type="submit" disabled={isContactSubmitting} className="btn btn-primary btn-large w-full">
                  {isContactSubmitting ? t.contact.sending : t.contact.submit}
                </button>

                <p className="form-hint">{t.contact.helper}</p>
              </form>
            </div>
          </div>
        </section>

        <section id="about-us" className="section-base">
          <div className="section-shell about-grid">
            <div>
              <p className="section-kicker">{t.about.kicker}</p>
              <h2>{t.about.title}</h2>
              <p>{t.about.description}</p>
              <div className="about-points">
                {t.about.bullets.map((bullet) => (
                  <span key={bullet}>{bullet}</span>
                ))}
              </div>
            </div>
            <div className="about-media card-lift">
              <img src="/aboutuseai.gif" alt="Evolvian platform overview" />
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="section-shell footer-grid">
          <div>
            <h4>{t.footer.locationTitle}</h4>
            <p>{t.footer.locationLine1}</p>
            <p>{t.footer.locationLine2}</p>
          </div>

          <div>
            <h4>{t.footer.contactTitle}</h4>
            <a href="mailto:sales@evolvianai.com" onClick={() => trackEvent({ name: "Footer_Contact_Click", category: "Footer", label: language })}>
              sales@evolvianai.com
            </a>
            <div className="footer-social-block">
              <p className="footer-social-title">{t.footer.socialTitle}</p>
              <div className="footer-social-row" aria-label={t.footer.socialTitle}>
                {FOOTER_SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={social.label}
                    title={social.label}
                    onClick={() => trackEvent({ name: `Footer_${social.label}_Click`, category: "Footer", label: language })}
                  >
                    <FooterSocialIcon kind={social.key} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4>{t.footer.legalTitle}</h4>
            <a href="/terms" onClick={() => trackEvent({ name: "Footer_Terms_Click", category: "Footer", label: language })}>
              {t.footer.terms}
            </a>
            <a href="/privacy" onClick={() => trackEvent({ name: "Footer_Privacy_Click", category: "Footer", label: language })}>
              {t.footer.privacy}
            </a>
            <button
              type="button"
              className="footer-privacy-btn"
              onClick={() => {
                trackEvent({ name: "Footer_Privacy_Choices_Click", category: "Footer", label: language });
                openPreferences();
              }}
            >
              {t.footer.privacyChoices}
            </button>
          </div>

          <div>
            <h4>{t.footer.getStarted}</h4>
            <a
              href="https://www.evolvianai.net/register"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ name: "Footer_Register_Click", category: "Footer", label: language })}
            >
              {t.footer.createAccount}
            </a>
          </div>
        </div>
        <p className="footer-bottom">© {new Date().getFullYear()} Evolvian AI. {t.footer.rights}</p>
      </footer>

      {showContactSuccessModal ? (
        <div className="contact-modal-overlay" role="dialog" aria-modal="true" aria-label="Contact form success">
          <div className="contact-modal-card">
            <h4>{t.messages.successTitle}</h4>
            <p>{t.messages.successBody}</p>
            <button type="button" className="btn btn-primary" onClick={() => setShowContactSuccessModal(false)}>
              {t.messages.close}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function App() {
  const landingVariant = getPublicLandingVariant();

  if (landingVariant === "generic") {
    return <GenericLandingPage />;
  }

  return <LandingPage />;
}
