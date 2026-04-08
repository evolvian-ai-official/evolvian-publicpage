import React, { useEffect, useMemo, useState } from "react";
import * as Label from "@radix-ui/react-label";
import { trackConversion, trackEvent } from "./utils/tracking";
import { usePublicLanguage } from "./contexts/PublicLanguageContext";
import { usePublicConsent, PUBLIC_CONSENT_VERSION } from "./contexts/PublicConsentContext";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const FALLBACK_PLAN_PRICES = {
  free: "$0 USD/mo",
  starter: "$19 USD/mo",
  premium: "$49 USD/mo",
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
      kicker: "AI Receptionist for Health & Service Businesses",
      titleBefore: "Stop losing patients to",
      titleEmphasis: "unanswered WhatsApp messages",
      description:
        "Evolvian is an AI receptionist that answers patient questions, books appointments, and sends reminders — automatically, 24/7, via WhatsApp. No extra staff needed.",
      ctaPrimary: "Start free",
      ctaSecondary: "Talk to team",
      ctaDemo: "See Evolvian in action",
      pills: ["WhatsApp + appointments", "No missed bookings", "Ready in 15 min"],
      statLeadLabel: "Patient coverage",
      statLeadValue: "24/7 automatic",
      statSetupLabel: "Setup time",
      statSetupValue: "< 15 min",
    },
    trust: [
      { title: "Answer WhatsApp 24/7", description: "Respond to every patient question, even at night and on weekends, without missing a message." },
      { title: "Book appointments automatically", description: "The AI checks your real-time availability and confirms bookings directly in the conversation." },
      { title: "Reminders that reduce no-shows", description: "Send automatic WhatsApp reminders before each appointment to keep your schedule full." },
      { title: "Full patient history", description: "Every conversation saved in one place so your team always has context before responding." },
    ],
    features: {
      kicker: "Why clinics and health businesses choose Evolvian",
      title: "Your AI receptionist works while you treat patients",
      description:
        "Every feature is built to eliminate the friction between a patient question and a confirmed appointment.",
      imageSlotTitle: "Illustrative image space",
      imageSlotPathLabel: "Suggested URL path",
      imageSlotFileLabel: "Suggested file name",
      imageSlotHint: "Add the file in public/feature-boxes with this name to show the illustration here.",
      cards: [
        {
          title: "AI trained on your clinic's information",
          description:
            "Upload your services, pricing, and policies so every answer reflects your clinic — not a generic chatbot.",
        },
        {
          title: "Patient conversation history",
          description:
            "See every previous interaction before your team responds, whether from WhatsApp, web, or email.",
        },
        {
          title: "Appointment booking and reminders",
          description:
            "The assistant books appointments, syncs with your Google Calendar, and sends reminders to reduce no-shows.",
        },
        {
          title: "WhatsApp, web widget, and email",
          description:
            "Meet patients where they already are. WhatsApp is the primary channel — supported from day one.",
        },
        {
          title: "Capture patient contact data",
          description:
            "Automatically collect name, email, and phone from every conversation so nothing falls through the cracks.",
        },
        {
          title: "Hand off to your team when needed",
          description: "When a case needs a human touch, the AI escalates the conversation with full context to your staff.",
        },
      ],
    },
    plans: {
      kicker: "Pricing",
      title: "Start free, grow as you book more appointments",
      description: "No contracts. Cancel anytime. Designed for clinics and service businesses in LATAM.",
      mostPopular: "Most popular",
      ctas: {
        free: "Start for free",
        starter: "Get Starter",
        premium: "Get Premium",
        white_label: "Talk to sales",
      },
      descriptions: {
        free: "Test with your clinic — free, no card required.",
        starter: "For clinics answering patient questions on WhatsApp.",
        premium: "For active clinics: WhatsApp + auto-booking + reminders.",
        white_label: "Multi-location clinics and agencies with custom setup.",
      },
      highlights: {
        free: [
          "100 conversations / month",
          "1 knowledge document",
          "Web chat widget",
          "AI answers patient questions",
        ],
        starter: [
          "1,000 conversations / month",
          "1 knowledge document",
          "Web chat + WhatsApp",
          "AI answers via WhatsApp 24/7",
        ],
        premium: [
          "Everything in Starter",
          "5,000 conversations / month",
          "3 knowledge documents",
          "Appointment booking + Google Calendar sync",
          "Automatic reminders before appointments",
          "Custom AI prompt for your clinic",
        ],
        white_label: ["Unlimited conversations", "Unlimited documents", "Dedicated onboarding", "Priority support"],
      },
    },
    process: {
      kicker: "How it works",
      title: "From setup to your first booked appointment in 3 steps",
      items: [
        {
          step: "01",
          title: "Upload your clinic's information",
          description: "Services, pricing, FAQs, and policies — the AI learns from your own content.",
        },
        {
          step: "02",
          title: "Connect your WhatsApp Business",
          description: "Link your number and activate the AI. Patients can start chatting immediately.",
        },
        {
          step: "03",
          title: "Your AI receptionist starts working",
          description: "It answers questions, books appointments, and sends reminders — automatically, 24/7.",
        },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Tell us about your clinic or business",
      description:
        "Share your current setup and we will propose the best Evolvian configuration for your needs. Our team usually responds in less than 24 hours.",
      metrics: [
        { value: "< 15 min", label: "To set up your AI receptionist" },
        { value: "WhatsApp-first", label: "LATAM's preferred channel" },
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
        usage: "Example: We run a dental clinic. We want patients to book appointments via WhatsApp without having to call.",
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
      title: "We help clinics and service businesses in LATAM never miss a patient again",
      description:
        "Evolvian gives health and service businesses an AI receptionist that works around the clock — answering questions, booking appointments, and keeping patients engaged, all via WhatsApp.",
      bullets: [
        "Trained on your clinic's own information",
        "WhatsApp-first, designed for LATAM businesses",
        "Transparent setup and bilingual support",
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
      kicker: "La Recepcionista AI para Clínicas y Negocios de Salud",
      titleBefore: "Deja de perder pacientes por",
      titleEmphasis: "mensajes sin respuesta en WhatsApp",
      description:
        "Evolvian atiende a tus pacientes por WhatsApp las 24 horas, agenda citas en tiempo real y envía recordatorios automáticos. Sin contratar personal extra.",
      ctaPrimary: "Empieza gratis",
      ctaSecondary: "Hablar con equipo",
      ctaDemo: "Ver Evolvian en acción",
      pills: ["WhatsApp + citas", "Sin citas perdidas", "Listo en 15 min"],
      statLeadLabel: "Atención a pacientes",
      statLeadValue: "24/7 automático",
      statSetupLabel: "Tiempo de setup",
      statSetupValue: "< 15 min",
    },
    trust: [
      { title: "Responde WhatsApp las 24 horas", description: "Atiende cada pregunta de tus pacientes, incluso de noche y fines de semana, sin perder un mensaje." },
      { title: "Agenda citas automáticamente", description: "La IA revisa tu disponibilidad en tiempo real y confirma reservas directamente en la conversación." },
      { title: "Recordatorios que reducen no-shows", description: "Envía recordatorios automáticos por WhatsApp antes de cada cita para mantener tu agenda llena." },
      { title: "Historial completo de pacientes", description: "Cada conversación guardada en un solo lugar para que tu equipo siempre tenga contexto al responder." },
    ],
    features: {
      kicker: "Por qué clínicas en LATAM eligen Evolvian",
      title: "Tu recepcionista AI trabaja mientras tú atiendes pacientes",
      description:
        "Cada función está diseñada para eliminar la fricción entre la pregunta de un paciente y una cita confirmada.",
      imageSlotTitle: "Espacio para imagen ilustrativa",
      imageSlotPathLabel: "Ruta sugerida",
      imageSlotFileLabel: "Nombre sugerido",
      imageSlotHint: "Coloca el archivo en public/feature-boxes con este nombre y la imagen se mostrará aquí.",
      cards: [
        {
          title: "IA entrenada con la información de tu clínica",
          description:
            "Sube tus servicios, precios y políticas para que cada respuesta refleje tu clínica, no un chatbot genérico.",
        },
        {
          title: "Historial de conversaciones por paciente",
          description:
            "Consulta cada interacción anterior antes de responder, ya sea por WhatsApp, web o email.",
        },
        {
          title: "Citas y recordatorios automáticos",
          description:
            "El asistente agenda citas, sincroniza con tu Google Calendar y envía recordatorios para reducir ausencias.",
        },
        {
          title: "WhatsApp, widget web y email",
          description:
            "Atiende a tus pacientes donde ya están. WhatsApp es el canal principal, disponible desde el primer día.",
        },
        {
          title: "Captura los datos de contacto del paciente",
          description: "Recolecta nombre, email y teléfono automáticamente de cada conversación para que no se pierda nada.",
        },
        {
          title: "Transfiere al equipo cuando sea necesario",
          description: "Cuando un caso requiere atención humana, la IA escala la conversación con contexto completo a tu equipo.",
        },
      ],
    },
    plans: {
      kicker: "Planes",
      title: "Empieza gratis, crece conforme agendas más citas",
      description: "Sin contratos. Cancela cuando quieras. Diseñado para clínicas y negocios de servicio en LATAM.",
      mostPopular: "Más popular",
      ctas: {
        free: "Empieza gratis",
        starter: "Obtener Starter",
        premium: "Obtener Premium",
        white_label: "Hablar con ventas",
      },
      descriptions: {
        free: "Prueba con tu clínica — gratis, sin tarjeta.",
        starter: "Para clínicas que responden consultas de pacientes por WhatsApp.",
        premium: "Para clínicas activas: WhatsApp + citas automáticas + recordatorios.",
        white_label: "Clínicas con múltiples sucursales y agencias con implementación a medida.",
      },
      highlights: {
        free: [
          "100 conversaciones / mes",
          "1 documento de conocimiento",
          "Widget de chat en web",
          "IA responde preguntas de pacientes",
        ],
        starter: [
          "1,000 conversaciones / mes",
          "1 documento de conocimiento",
          "Web chat + WhatsApp",
          "IA atiende por WhatsApp las 24 horas",
        ],
        premium: [
          "Todo lo de Starter",
          "5,000 conversaciones / mes",
          "3 documentos de conocimiento",
          "Agendamiento de citas + sincronización con Google Calendar",
          "Recordatorios automáticos antes de cada cita",
          "Prompt personalizado para tu clínica",
        ],
        white_label: ["Conversaciones ilimitadas", "Documentos ilimitados", "Onboarding dedicado", "Soporte prioritario"],
      },
    },
    process: {
      kicker: "Cómo funciona",
      title: "De la configuración a tu primera cita agendada en 3 pasos",
      items: [
        {
          step: "01",
          title: "Sube la información de tu clínica",
          description: "Servicios, precios, preguntas frecuentes y políticas — la IA aprende de tu contenido.",
        },
        {
          step: "02",
          title: "Conecta tu WhatsApp Business",
          description: "Vincula tu número y activa la IA. Los pacientes pueden empezar a chatear de inmediato.",
        },
        {
          step: "03",
          title: "Tu recepcionista AI empieza a trabajar",
          description: "Responde preguntas, agenda citas y envía recordatorios — automáticamente, las 24 horas.",
        },
      ],
    },
    contact: {
      kicker: "Contacto",
      title: "Cuéntanos sobre tu clínica o negocio",
      description:
        "Comparte cómo funciona hoy y te propondremos la mejor configuración de Evolvian para tus necesidades. Respondemos normalmente en menos de 24 horas.",
      metrics: [
        { value: "< 15 min", label: "Para configurar tu recepcionista AI" },
        { value: "WhatsApp primero", label: "El canal favorito de LATAM" },
        { value: "Bilingüe", label: "Soporte en inglés y español" },
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
        usage: "Ej: Tenemos una clínica dental. Queremos que los pacientes puedan agendar citas por WhatsApp sin necesidad de llamar.",
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
      kicker: "Nosotros",
      title: "Ayudamos a clínicas y negocios de servicio en LATAM a nunca perder un paciente",
      description:
        "Evolvian le da a clínicas y negocios de servicio una recepcionista AI que trabaja las 24 horas — responde preguntas, agenda citas y mantiene a los pacientes activos, todo por WhatsApp.",
      bullets: [
        "Entrenada con la información de tu propio negocio",
        "WhatsApp primero, diseñado para negocios en LATAM",
        "Configuración transparente y soporte bilingüe",
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

function formatMonthlyPrice(priceUsd) {
  const price = Number(priceUsd);
  if (!Number.isFinite(price)) return null;
  return Number.isInteger(price) ? `$${price.toFixed(0)} USD/mo` : `$${price.toFixed(2)} USD/mo`;
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
      { href: "/demo", label: t.nav.demo },
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
        ctaHref: DIRECT_LOGIN_URL,
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
