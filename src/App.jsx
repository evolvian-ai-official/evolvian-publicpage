import React, { useEffect, useMemo, useState } from "react";
import * as Label from "@radix-ui/react-label";
import { trackConversion, trackEvent } from "./utils/tracking";
import { usePublicLanguage } from "./contexts/PublicLanguageContext";
import { usePublicConsent, PUBLIC_CONSENT_VERSION } from "./contexts/PublicConsentContext";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const FALLBACK_PLAN_PRICES = {
  free: "$0/mo",
  starter: "$19/mo",
  premium: "$49/mo",
  white_label: null,
};

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

const COPY = {
  en: {
    nav: { features: "Features", plans: "Plans", contact: "Contact", about: "About", blog: "Blog" },
    auth: { login: "Log in", startFree: "Start free" },
    hero: {
      kicker: "AI Assistant Platform for Revenue Teams",
      titleBefore: "Convert more visitors with a",
      titleEmphasis: "business-ready AI assistant",
      description:
        "Deploy an assistant trained on your own content, capture qualified leads, and automate follow-up across website, WhatsApp, and email.",
      ctaPrimary: "Start free",
      ctaSecondary: "Talk to sales",
      pills: ["No code setup", "Lead capture included", "24h response support"],
      statLeadLabel: "Lead quality",
      statLeadValue: "High intent",
      statSetupLabel: "Setup time",
      statSetupValue: "< 1 day",
    },
    trust: [
      { title: "Fast setup", description: "Launch your assistant in minutes with no-code onboarding." },
      { title: "Multi-channel", description: "Website, WhatsApp, and email in one unified AI flow." },
      { title: "Lead-ready", description: "Capture qualified leads and route them to your team quickly." },
      { title: "Business context", description: "Responses grounded on your own documents and policies." },
    ],
    features: {
      kicker: "Why teams choose Evolvian",
      title: "Built for real operations, not just demos",
      description:
        "Every feature is designed to reduce repetitive workload while improving lead quality and customer experience.",
      cards: [
        {
          title: "AI trained on your business",
          description:
            "Upload your documents and give clear instructions so every answer reflects your process.",
        },
        {
          title: "Capture leads with the right details",
          description:
            "Collect name, email, and use case details so your sales conversations start with clear context.",
        },
        {
          title: "Appointment automation",
          description:
            "Enable scheduling, reminders, and follow-up flows from the same assistant experience.",
        },
        {
          title: "Brand-consistent widget",
          description:
            "Customize colors, typography, legal links, and behavior to match your website identity.",
        },
        {
          title: "Performance insights",
          description:
            "Track user interactions and optimize conversion points with clear event instrumentation.",
        },
        {
          title: "Scale with confidence",
          description: "Keep support quality while increasing volume across channels.",
        },
      ],
    },
    plans: {
      kicker: "Pricing",
      title: "Choose the plan that matches your growth stage",
      description: "Start free and upgrade when your lead volume and automation needs increase.",
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
        premium: "Best value for growth teams and recurring customer ops.",
        white_label: "Enterprise and agency solution with tailored implementation.",
      },
      highlights: {
        free: [
          "100 messages / month",
          "1 document",
          "Basic dashboard",
          "Website chat widget integration",
        ],
        starter: [
          "1,000 messages / month",
          "1 document",
          "Basic dashboard",
          "Website chat widget integration",
          "WhatsApp AI setup support",
        ],
        premium: [
          "Everything in Starter",
          "5,000 messages / month",
          "3 documents",
          "Advanced widget customization",
          "Custom assistant prompt",
          "WhatsApp appointments and reminders",
        ],
        white_label: ["Unlimited messages", "Unlimited documents", "Dedicated onboarding", "Priority support"],
      },
    },
    process: {
      kicker: "Implementation flow",
      title: "From setup to qualified conversations in 3 steps",
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
          description: "Deploy to your channels and improve conversion with live data.",
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
        usage: "Example: We need to automate first response and qualify leads from WhatsApp.",
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
      title: "We help teams scale support and sales conversations with AI",
      description:
        "Evolvian empowers businesses to deploy assistants aligned with their own policies and knowledge base. The result is faster response times, better qualified leads, and a smoother customer experience.",
      bullets: [
        "Custom prompts by business",
        "Lead capture connected to operations",
        "Transparent setup and support",
      ],
    },
    footer: {
      locationTitle: "Location",
      locationLine1: "1001 S Main St Ste 500",
      locationLine2: "Kalispell, MT 59901",
      contactTitle: "Contact",
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
        "We already have your email registered. Send us an email at support@evolvianai.com or chat with Evolvian Assistant using the icon on your right.",
      genericError: "We could not send your request. Please try again in a few minutes.",
      successTitle: "Request received",
      successBody: "Thanks for contacting us. We will reach out soon to learn more about what you need.",
      close: "Close",
    },
  },
  es: {
    nav: { features: "Funciones", plans: "Planes", contact: "Contacto", about: "Nosotros", blog: "Blog" },
    auth: { login: "Iniciar sesion", startFree: "Empieza gratis" },
    hero: {
      kicker: "Plataforma de Asistentes AI para equipos de ventas",
      titleBefore: "Convierte mas visitantes con un",
      titleEmphasis: "asistente AI listo para negocio",
      description:
        "Despliega un asistente entrenado con tu contenido, captura leads calificados y automatiza seguimiento en web, WhatsApp y email.",
      ctaPrimary: "Empieza gratis",
      ctaSecondary: "Hablar con ventas",
      pills: ["Sin codigo", "Captura de leads", "Soporte en 24h"],
      statLeadLabel: "Calidad de lead",
      statLeadValue: "Alta intencion",
      statSetupLabel: "Tiempo de setup",
      statSetupValue: "< 1 dia",
    },
    trust: [
      { title: "Implementacion rapida", description: "Lanza tu asistente en minutos con onboarding no-code." },
      { title: "Multicanal", description: "Web, WhatsApp y email en un solo flujo de AI." },
      { title: "Orientado a leads", description: "Captura leads calificados y derivalos rapido a tu equipo." },
      { title: "Contexto de negocio", description: "Respuestas basadas en tus documentos y politicas." },
    ],
    features: {
      kicker: "Por que equipos eligen Evolvian",
      title: "Pensado para operacion real, no solo demos",
      description:
        "Cada funcion esta disenada para reducir trabajo repetitivo y mejorar conversion y experiencia del cliente.",
      cards: [
        {
          title: "AI entrenada con tu negocio",
          description:
            "Sube tus documentos y da instrucciones claras para que cada respuesta refleje tu proceso.",
        },
        {
          title: "Captura leads con datos clave",
          description:
            "Recolecta nombre, email y caso de uso para que ventas inicie conversaciones con contexto.",
        },
        {
          title: "Automatizacion de citas",
          description:
            "Activa agendas, recordatorios y seguimiento desde la misma experiencia del asistente.",
        },
        {
          title: "Widget alineado a tu marca",
          description:
            "Personaliza colores, tipografia, enlaces legales y comportamiento para tu sitio.",
        },
        {
          title: "Metricas de performance",
          description: "Mide interacciones y optimiza puntos de conversion con eventos claros.",
        },
        {
          title: "Escala con confianza",
          description: "Mantiene calidad de atencion mientras aumenta tu volumen de conversaciones.",
        },
      ],
    },
    plans: {
      kicker: "Planes",
      title: "Elige el plan segun tu etapa de crecimiento",
      description: "Empieza gratis y sube de plan cuando aumente tu volumen y automatizacion.",
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
        premium: "Mejor opcion para equipos en crecimiento.",
        white_label: "Solucion empresarial y agencias con implementacion a medida.",
      },
      highlights: {
        free: [
          "100 mensajes / mes",
          "1 documento",
          "Dashboard basico",
          "Integracion de chat widget en web",
        ],
        starter: [
          "1,000 mensajes / mes",
          "1 documento",
          "Dashboard basico",
          "Integracion de chat widget en web",
          "Soporte de configuracion AI para WhatsApp",
        ],
        premium: [
          "Todo lo de Starter",
          "5,000 mensajes / mes",
          "3 documentos",
          "Personalizacion avanzada de widget",
          "Prompt personalizado",
          "Citas y recordatorios por WhatsApp",
        ],
        white_label: ["Mensajes ilimitados", "Documentos ilimitados", "Onboarding dedicado", "Soporte prioritario"],
      },
    },
    process: {
      kicker: "Flujo de implementacion",
      title: "De setup a conversaciones calificadas en 3 pasos",
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
          description: "Publica en tus canales y mejora conversion con datos reales.",
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
        usage: "Ejemplo: Necesitamos automatizar primera respuesta y calificar leads de WhatsApp.",
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
      title: "Ayudamos a escalar soporte y ventas con AI",
      description:
        "Evolvian permite desplegar asistentes alineados a politicas y base de conocimiento de cada negocio. Resultado: respuestas mas rapidas, mejores leads y mejor experiencia de cliente.",
      bullets: [
        "Prompts personalizados por negocio",
        "Captura de leads conectada a operacion",
        "Implementacion clara y soporte",
      ],
    },
    footer: {
      locationTitle: "Ubicacion",
      locationLine1: "1001 S Main St Ste 500",
      locationLine2: "Kalispell, MT 59901",
      contactTitle: "Contacto",
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
        "Ya tenemos tu email registrado. Mandanos un email a support@evolvianai.com o chatea con Evolvian Assistant abriendo el icono a tu derecha.",
      genericError: "No pudimos enviar tu solicitud. Intentalo de nuevo en unos minutos.",
      successTitle: "Solicitud recibida",
      successBody: "Muchas gracias por contactarnos. Te escribiremos pronto para conocer mejor lo que necesitas.",
      close: "Cerrar",
    },
  },
};

function formatMonthlyPrice(priceUsd) {
  const price = Number(priceUsd);
  if (!Number.isFinite(price)) return null;
  return Number.isInteger(price) ? `$${price.toFixed(0)}/mo` : `$${price.toFixed(2)}/mo`;
}

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const { language, setLanguage } = usePublicLanguage();
  const { openPreferences } = usePublicConsent();
  const [planPrices, setPlanPrices] = useState(FALLBACK_PLAN_PRICES);
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
    ],
    [t]
  );

  const planCards = useMemo(
    () => [
      {
        id: "free",
        title: "Free",
        description: t.plans.descriptions.free,
        highlights: t.plans.highlights.free,
        ctaLabel: t.plans.ctas.free,
        ctaHref: "https://www.evolvianai.net/register",
        ctaEvent: "StartForFree_Click",
        theme: "soft",
      },
      {
        id: "starter",
        title: "Starter",
        description: t.plans.descriptions.starter,
        highlights: t.plans.highlights.starter,
        ctaLabel: t.plans.ctas.starter,
        ctaHref: "https://www.evolvianai.net/settings",
        ctaEvent: "StarterPlan_Click",
        theme: "dark",
      },
      {
        id: "premium",
        title: "Premium",
        description: t.plans.descriptions.premium,
        highlights: t.plans.highlights.premium,
        ctaLabel: t.plans.ctas.premium,
        ctaHref: "https://www.evolvianai.net/settings",
        ctaEvent: "PremiumPlan_Click",
        theme: "premium",
        badge: t.plans.mostPopular,
      },
      {
        id: "white_label",
        title: "White Label",
        description: t.plans.descriptions.white_label,
        highlights: t.plans.highlights.white_label,
        ctaLabel: t.plans.ctas.white_label,
        ctaHref: "#contact",
        ctaEvent: "WhiteLabel_Click",
        theme: "soft",
        customPrice: "Custom",
      },
    ],
    [t]
  );

  useEffect(() => {
    let cancelled = false;

    const loadPlanPrices = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/public/plans`);
        if (!res.ok) throw new Error(`status ${res.status}`);

        const data = await res.json();
        const nextPrices = { ...FALLBACK_PLAN_PRICES };

        for (const plan of data?.plans || []) {
          const rawId = String(plan?.id || "").trim().toLowerCase();
          const id = rawId === "enterprise" ? "white_label" : rawId;
          if (!id || id === "white_label") continue;

          const formatted = formatMonthlyPrice(plan?.price_usd);
          if (formatted) nextPrices[id] = formatted;
        }

        if (!cancelled) setPlanPrices(nextPrices);
      } catch (error) {
        console.error("Failed to load public plan prices:", error);
      }
    };

    loadPlanPrices();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!showContactSuccessModal) return undefined;
    const timeoutId = setTimeout(() => setShowContactSuccessModal(false), 5000);
    return () => clearTimeout(timeoutId);
  }, [showContactSuccessModal]);

  const getPlanPrice = (planId) => planPrices[planId] ?? FALLBACK_PLAN_PRICES[planId] ?? null;

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
        value: contactForm.email,
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
            value: contactForm.email,
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
        value: contactForm.email,
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
              href="https://www.evolvianai.net"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              onClick={() => trackEvent({ name: "Login_Click", category: "Navigation", label: `Header_${language}` })}
            >
              {t.auth.login}
            </a>
            <a
              href="https://www.evolvianai.net/register"
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
                href="https://www.evolvianai.net/register"
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
                  href="https://www.evolvianai.net/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-large"
                  onClick={() => trackEvent({ name: "Hero_StartFree_Click", category: "Hero", label: language })}
                >
                  {t.hero.ctaPrimary}
                </a>
                <a
                  href="#contact"
                  className="btn btn-ghost btn-large"
                  onClick={() => trackEvent({ name: "Hero_BookDemo_Click", category: "Hero", label: language })}
                >
                  {t.hero.ctaSecondary}
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
              {t.features.cards.map((feature) => (
                <article key={feature.title} className="feature-card card-lift">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="plans" className="section-base section-muted">
          <div className="section-shell">
            <div className="section-heading">
              <p className="section-kicker">{t.plans.kicker}</p>
              <h2>{t.plans.title}</h2>
              <p>{t.plans.description}</p>
            </div>

            <div className="plan-grid">
              {planCards.map((plan) => {
                const price = plan.customPrice || getPlanPrice(plan.id);
                const cardClass = `plan-card card-lift ${plan.theme === "premium" ? "plan-card-premium" : ""}`;

                return (
                  <article key={plan.id} className={cardClass}>
                    <div>
                      <div className="plan-header">
                        <h3>{plan.title}</h3>
                        {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
                      </div>
                      <p className="plan-price">{price || "Custom"}</p>
                      <p className="plan-description">{plan.description}</p>
                      <ul>
                        {plan.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={plan.ctaHref}
                      target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
                      rel={plan.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`btn ${plan.theme === "premium" ? "btn-primary" : "btn-secondary"}`}
                      onClick={() => trackEvent({ name: plan.ctaEvent, category: "Pricing", label: `${plan.title}_${language}` })}
                    >
                      {plan.ctaLabel}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

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
            <a href="mailto:support@evolvianai.com" onClick={() => trackEvent({ name: "Footer_Contact_Click", category: "Footer", label: language })}>
              support@evolvianai.com
            </a>
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
