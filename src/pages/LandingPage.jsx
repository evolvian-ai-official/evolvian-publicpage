import { motion, useReducedMotion } from "framer-motion";
import { usePublicConsent } from "../contexts/PublicConsentContext";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";
import PublicPricingSection from "../components/PublicPricingSection";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { PUBLIC_PRICING_COPY } from "../lib/publicPricingContent";
import { cn } from "../lib/utils";
import { trackEvent } from "../utils/tracking";

const START_TRIAL_URL = "https://www.evolvianai.net/register";
const DEMO_URL = "/demo";
const MotionDiv = motion.div;

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Espanol" },
];

const FOOTER_SOCIAL_LINKS = [
  { key: "whatsapp", label: "WhatsApp", href: "https://wa.me/5215542503251" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/evolvianai/" },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/109046205/admin/dashboard/",
  },
];

const OPERATIONS_FEATURE_ILLUSTRATIONS = [
  "/feature-boxes/feature-01-asistente-ai.png",
  "/feature-boxes/feature-02-historico-unificado.png",
  "/feature-boxes/feature-03-citas-recordatorios.png",
  "/feature-boxes/feature-04-canales-conectados.png",
  "/feature-boxes/feature-05-captura-datos.png",
  "/feature-boxes/feature-06-visibilidad-operativa.png",
];

const COPY = {
  en: {
    cta: {
      primary: "Start Free Trial",
      secondary: "View Demo",
    },
    header: {
      brand: "Evolvian AI",
      subtitle: "For modern clinics",
      trusted: "Trusted by modern clinics",
      langLabel: "Lang",
      nav: {
        problem: "Problem",
        solution: "Solution",
        howItWorks: "How it works",
        pricing: "Pricing",
        proof: "Proof",
      },
    },
    hero: {
      specialties: ["Dentists", "Psychologists", "General practitioners"],
      title: "Turn every patient inquiry into a booked appointment — automatically.",
      description: "Capture, qualify and schedule patients 24/7 without needing an assistant.",
      channels: ["WhatsApp", "Web chat", "Email"],
      metrics: [
        { value: "24/7", label: "capture" },
        { value: "3", label: "channels" },
        { value: "0", label: "extra hires" },
      ],
      conversionLabel: "Conversion focus",
      conversionValue: "More bookings",
      cardTitle: "WhatsApp intake",
      cardSubtitle: "Live response preview",
      online: "Online now",
      conversationTitle: "Patient conversation",
      conversationSubtitle: "Captured from web and WhatsApp",
      messageCount: "2 messages",
      patientLabel: "Patient",
      patientMessage: "Do you have appointments tomorrow?",
      aiLabel: "Evolvian AI",
      aiMessage: "Yes, we have availability at 10am and 2pm. Would you like to book?",
      suggestedTitle: "Suggested next step",
      suggestedDescription: "Offer times, confirm contact details, and reserve the slot instantly.",
      slots: ["10am", "2pm"],
      automationLabel: "Automation",
      automationValue: "Less manual work",
    },
    problem: {
      eyebrow: "The problem",
      title: "You're losing patients every day",
      description:
        "Most clinics do not lose demand because people are not interested. They lose it between the first message and the confirmed appointment.",
      items: [
        {
          title: "Slow responses = lost patients",
          description: "Patients message the first clinic that feels available. If replies take hours, they book elsewhere.",
        },
        {
          title: "Manual booking = wasted time",
          description: "Front-desk work steals attention from care, follow-up, and growth when every inquiry needs manual handling.",
        },
        {
          title: "Missed follow-ups = lost revenue",
          description: "No replies, forgotten reminders, and unclosed conversations leave appointments and repeat visits on the table.",
        },
      ],
    },
    solution: {
      eyebrow: "The solution",
      title: "Evolvian fixes this automatically",
      description:
        "Every incoming inquiry gets an immediate next step: a fast answer, the right qualification flow, and a clear path to a confirmed appointment.",
      items: [
        {
          icon: "message",
          title: "Instant Replies",
          description: "Respond in seconds across WhatsApp, web chat, and email with answers that feel helpful and human.",
          points: ["Reply after hours", "Handle repetitive questions", "Keep every lead warm"],
        },
        {
          icon: "spark",
          title: "Smart Qualification",
          description: "Collect symptoms, intent, specialty, insurance, and preferred timing before your team gets involved.",
          points: ["Ask the right questions", "Capture lead details", "Route each patient correctly"],
        },
        {
          icon: "calendar",
          title: "Automatic Booking",
          description: "Offer available slots, confirm the visit, and keep the calendar moving without back-and-forth messages.",
          points: ["Share live availability", "Confirm faster", "Reduce admin work"],
        },
      ],
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "From first inquiry to confirmed visit",
      description: "A simple patient journey with no inbox juggling, no missed follow-ups, and no manual scheduling bottlenecks.",
      items: [
        {
          step: "01",
          title: "Patient sends message",
          description: "A new inquiry arrives through WhatsApp, web chat, or email.",
        },
        {
          step: "02",
          title: "Evolvian responds instantly",
          description: "The assistant answers, qualifies the lead, and offers the next best step in real time.",
        },
        {
          step: "03",
          title: "Evolvian books appointment",
          description: "The patient picks a time and the appointment gets confirmed automatically.",
        },
      ],
      stepLabel: "Step",
    },
    benefits: {
      eyebrow: "Benefits",
      title: "Results your clinic feels immediately",
      description:
        "The product is not the AI. The product is a fuller calendar, faster patient response times, and less admin work for your team.",
      items: [
        {
          title: "More patients without ads",
          description: "Convert the demand you already have instead of paying for more traffic first.",
        },
        {
          title: "No need for assistants",
          description: "Keep the front desk lean while still replying quickly and consistently.",
        },
        {
          title: "24/7 availability",
          description: "Capture inquiries late at night, during consultations, and on weekends.",
        },
        {
          title: "Reduce no-shows",
          description: "Automated confirmations and reminder flows keep the calendar tighter.",
        },
      ],
    },
    pricing: {
      ...PUBLIC_PRICING_COPY.en,
    },
    operations: {
      eyebrow: "Why operations teams choose Evolvian",
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
            "Collect name, email, and phone so your team can act faster.",
        },
        {
          title: "Centralize customer communication with Evolvian",
          description:
            "Manage customer communication and captured data from Evolvian for daily operations.",
        },
      ],
    },
    proof: {
      eyebrow: "Social proof",
      title: "Trusted by modern clinics",
      description: "Placeholder proof blocks for rollout. Swap these with real names, logos, and outcome metrics once case studies are approved.",
      stats: [
        { value: "92%", label: "reply rate" },
        { value: "3x", label: "faster intake" },
        { value: "24/7", label: "coverage" },
      ],
      testimonials: [
        {
          quote: "We stopped losing WhatsApp inquiries after hours. Patients now get answers and book before my team even opens the clinic.",
          name: "Dr. Sofia Ramirez",
          role: "Testimonial - Dental clinic",
        },
        {
          quote: "The biggest win is speed. Evolvian qualifies the patient and offers times instantly, so we spend less time on routine admin.",
          name: "Dr. Ethan Brooks",
          role: "Testimonial - Psychology practice",
        },
        {
          quote: "It feels like having a reliable receptionist that never misses a lead, even when the whole staff is busy with consultations.",
          name: "Dr. Valeria Torres",
          role: "Testimonial - General practice",
        },
      ],
    },
    finalCta: {
      eyebrow: "Final CTA",
      title: "Start capturing more patients today",
      description: "Set up once, stay available across channels, and let every inquiry move toward a booked appointment.",
    },
    footer: {
      description: "Multi-channel patient capture and booking for modern clinics.",
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
      demo: "Demo",
      rights: "All rights reserved.",
    },
  },
  es: {
    cta: {
      primary: "Empieza prueba gratis",
      secondary: "Ver demo",
    },
    header: {
      brand: "Evolvian AI",
      subtitle: "Para clinicas modernas",
      trusted: "Confiado por clinicas modernas",
      langLabel: "Lang",
      nav: {
        problem: "Problema",
        solution: "Solucion",
        howItWorks: "Como funciona",
        pricing: "Planes",
        proof: "Prueba social",
      },
    },
    hero: {
      specialties: ["Dentistas", "Psicologos", "Medicos generales"],
      title: "Convierte cada consulta de paciente en una cita agendada, automaticamente.",
      description: "Captura, califica y agenda pacientes 24/7 sin necesitar una asistente.",
      channels: ["WhatsApp", "Chat web", "Email"],
      metrics: [
        { value: "24/7", label: "captura" },
        { value: "3", label: "canales" },
        { value: "0", label: "contrataciones" },
      ],
      conversionLabel: "Enfoque de conversion",
      conversionValue: "Mas citas",
      cardTitle: "Captacion por WhatsApp",
      cardSubtitle: "Vista previa de respuesta",
      online: "En linea ahora",
      conversationTitle: "Conversacion con paciente",
      conversationSubtitle: "Capturado desde web y WhatsApp",
      messageCount: "2 mensajes",
      patientLabel: "Paciente",
      patientMessage: "Tienen citas disponibles manana?",
      aiLabel: "Evolvian AI",
      aiMessage: "Si, tenemos disponibilidad a las 10am y 2pm. Te gustaria agendar?",
      suggestedTitle: "Siguiente paso sugerido",
      suggestedDescription: "Ofrece horarios, confirma datos de contacto y reserva el espacio al instante.",
      slots: ["10am", "2pm"],
      automationLabel: "Automatizacion",
      automationValue: "Menos trabajo manual",
    },
    problem: {
      eyebrow: "El problema",
      title: "Estas perdiendo pacientes todos los dias",
      description:
        "La mayoria de las clinicas no pierde demanda por falta de interes. La pierde entre el primer mensaje y la cita confirmada.",
      items: [
        {
          title: "Respuestas lentas = pacientes perdidos",
          description: "Los pacientes escriben a la primera clinica que parece disponible. Si tardas horas en responder, reservan en otro lado.",
        },
        {
          title: "Agenda manual = tiempo desperdiciado",
          description: "El trabajo de recepcion le quita tiempo a la atencion, al seguimiento y al crecimiento cuando cada consulta se gestiona a mano.",
        },
        {
          title: "Seguimientos perdidos = ingresos perdidos",
          description: "Mensajes sin responder, recordatorios olvidados y conversaciones inconclusas dejan citas y visitas repetidas sobre la mesa.",
        },
      ],
    },
    solution: {
      eyebrow: "La solucion",
      title: "Evolvian resuelve esto automaticamente",
      description:
        "Cada consulta entrante recibe un siguiente paso claro: una respuesta rapida, la calificacion correcta y un camino directo a la cita confirmada.",
      items: [
        {
          icon: "message",
          title: "Respuestas instantaneas",
          description: "Responde en segundos por WhatsApp, chat web y email con mensajes utiles y naturales.",
          points: ["Responde fuera de horario", "Atiende preguntas repetitivas", "Mantiene caliente cada lead"],
        },
        {
          icon: "spark",
          title: "Calificacion inteligente",
          description: "Recoge sintomas, intencion, especialidad, seguro y horario preferido antes de que intervenga tu equipo.",
          points: ["Hace las preguntas correctas", "Captura datos del lead", "Enruta cada paciente correctamente"],
        },
        {
          icon: "calendar",
          title: "Agendamiento automatico",
          description: "Ofrece horarios disponibles, confirma la visita y mueve la agenda sin ida y vuelta manual.",
          points: ["Comparte disponibilidad real", "Confirma mas rapido", "Reduce trabajo administrativo"],
        },
      ],
    },
    howItWorks: {
      eyebrow: "Como funciona",
      title: "Del primer mensaje a la visita confirmada",
      description: "Un recorrido simple para el paciente, sin perseguir inboxes, sin seguimientos perdidos y sin cuellos de botella al agendar.",
      items: [
        {
          step: "01",
          title: "Paciente envia mensaje",
          description: "Una nueva consulta llega por WhatsApp, chat web o email.",
        },
        {
          step: "02",
          title: "Evolvian responde al instante",
          description: "El asistente responde, califica al lead y propone el siguiente paso en tiempo real.",
        },
        {
          step: "03",
          title: "Evolvian agenda la cita",
          description: "El paciente elige una hora y la cita queda confirmada automaticamente.",
        },
      ],
      stepLabel: "Paso",
    },
    benefits: {
      eyebrow: "Beneficios",
      title: "Resultados que tu clinica siente de inmediato",
      description:
        "El producto no es la AI. El producto es una agenda mas llena, respuestas mas rapidas para pacientes y menos trabajo administrativo para tu equipo.",
      items: [
        {
          title: "Mas pacientes sin anuncios",
          description: "Convierte la demanda que ya tienes antes de gastar en mas trafico.",
        },
        {
          title: "Sin necesidad de asistentes",
          description: "Mantiene una recepcion ligera mientras sigues respondiendo rapido y de forma consistente.",
        },
        {
          title: "Disponibilidad 24/7",
          description: "Captura consultas de noche, durante consulta y en fines de semana.",
        },
        {
          title: "Reduce no-shows",
          description: "Confirmaciones y recordatorios automaticos mantienen la agenda mas firme.",
        },
      ],
    },
    pricing: {
      ...PUBLIC_PRICING_COPY.es,
    },
    operations: {
      eyebrow: "Por que equipos operativos eligen Evolvian",
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
          description:
            "Recolecta nombre, email y telefono para que tu equipo actue mas rapido.",
        },
        {
          title: "Centraliza tu comunicacion con clientes con Evolvian",
          description:
            "Gestiona la comunicacion con clientes y los datos capturados desde Evolvian para tu operacion diaria.",
        },
      ],
    },
    proof: {
      eyebrow: "Prueba social",
      title: "Confiado por clinicas modernas",
      description: "Bloques de prueba para esta version. Sustituyelos por nombres, logos y metricas reales cuando los casos de estudio esten aprobados.",
      stats: [
        { value: "92%", label: "tasa de respuesta" },
        { value: "3x", label: "captacion mas rapida" },
        { value: "24/7", label: "cobertura" },
      ],
      testimonials: [
        {
          quote: "Dejamos de perder consultas de WhatsApp fuera de horario. Ahora los pacientes reciben respuesta y agendan antes de que el equipo abra la clinica.",
          name: "Dra. Sofia Ramirez",
          role: "Testimonial - Clinica dental",
        },
        {
          quote: "La mayor ganancia es la velocidad. Evolvian califica al paciente y ofrece horarios al instante, asi pasamos menos tiempo en administracion rutinaria.",
          name: "Dr. Ethan Brooks",
          role: "Testimonial - Consultorio de psicologia",
        },
        {
          quote: "Se siente como tener una recepcionista confiable que nunca deja escapar un lead, incluso cuando todo el personal esta ocupado en consulta.",
          name: "Dra. Valeria Torres",
          role: "Testimonial - Medicina general",
        },
      ],
    },
    finalCta: {
      eyebrow: "CTA final",
      title: "Empieza a captar mas pacientes hoy",
      description: "Configura una vez, mantente disponible en todos tus canales y haz que cada consulta avance hacia una cita agendada.",
    },
    footer: {
      description: "Captacion y agendamiento de pacientes en multiples canales para clinicas modernas.",
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
      demo: "Demo",
      rights: "Todos los derechos reservados.",
    },
  },
};

function getSolutionIcon(icon) {
  if (icon === "spark") return SparkIcon;
  if (icon === "calendar") return CalendarIcon;
  return MessageIcon;
}

function Container({ className, children }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

function SectionReveal({ className, delay = 0, children }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </MotionDiv>
  );
}

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="font-sans text-sm font-semibold uppercase tracking-[0.24em] text-[#4a90e2]">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-[#274472] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}

function IconBadge({ className, children }) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white text-[#274472] shadow-[0_18px_45px_-28px_rgba(39,68,114,0.65)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Header({ t, language, onLanguageChange }) {
  const navLinks = [
    { href: "#problem", label: t.header.nav.problem },
    { href: "#solution", label: t.header.nav.solution },
    { href: "#how-it-works", label: t.header.nav.howItWorks },
    { href: "#plans", label: t.header.nav.pricing },
    { href: "#proof", label: t.header.nav.proof },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-3">
        <a
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => trackEvent({ name: "Healthcare_Landing_Logo_Click", category: "Navigation", label: "Header" })}
        >
          <img src="/logo-evolvian.svg" alt={t.header.brand} className="h-11 w-11 rounded-2xl border border-white bg-white p-1.5 shadow-sm" />
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold tracking-[-0.03em] text-[#274472]">{t.header.brand}</p>
            <p className="truncate text-xs font-medium uppercase tracking-[0.24em] text-slate-500">{t.header.subtitle}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#274472]"
              onClick={() => trackEvent({ name: "Healthcare_Landing_Nav_Click", category: "Navigation", label: link.label })}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-[#d8e4ef] bg-white/90 px-3 py-2 shadow-sm">
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:inline">{t.header.langLabel}</span>
            <select
              aria-label={t.header.langLabel}
              value={language}
              onChange={onLanguageChange}
              className="bg-transparent text-sm font-semibold text-[#274472] focus:outline-none"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            href={DEMO_URL}
            variant="secondary"
            className="hidden md:inline-flex"
            onClick={() => trackEvent({ name: "Healthcare_Landing_Header_Demo_Click", category: "CTA", label: "Header" })}
          >
            {t.cta.secondary}
          </Button>

          <Button
            href={START_TRIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="px-4 sm:px-5"
            onClick={() => trackEvent({ name: "Healthcare_Landing_Header_Trial_Click", category: "CTA", label: "Header" })}
          >
            {t.cta.primary}
          </Button>
        </div>
      </Container>
    </header>
  );
}

function HeroSection({ t }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#f9fcfb_0%,_#eef6fb_48%,_#ffffff_100%)]">
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(163,217,177,0.48),_transparent_44%),radial-gradient(circle_at_top_right,_rgba(74,144,226,0.24),_transparent_36%)]" />
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
        <SectionReveal className="max-w-xl" delay={0.05}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_18px_45px_-34px_rgba(39,68,114,0.8)] backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#a3d9b1]" />
            {t.header.trusted}
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-2">
              {t.hero.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full border border-[#dce7ef] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[#274472] sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>

            <p className="max-w-lg text-lg leading-8 text-slate-600">{t.hero.description}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={START_TRIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => trackEvent({ name: "Healthcare_Landing_Hero_Trial_Click", category: "CTA", label: "Hero" })}
              >
                {t.cta.primary}
                <ArrowUpRightIcon className="h-4 w-4" />
              </Button>
              <Button
                href={DEMO_URL}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => trackEvent({ name: "Healthcare_Landing_Hero_Demo_Click", category: "CTA", label: "Hero" })}
              >
                {t.cta.secondary}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              {t.hero.channels.map((channel) => (
                <span key={channel} className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-2 ring-1 ring-[#e1ebf3]">
                  <CheckIcon className="h-3.5 w-3.5 text-[#4a90e2]" />
                  {channel}
                </span>
              ))}
            </div>

            <div className="grid max-w-md grid-cols-3 gap-3 pt-3">
              {t.hero.metrics.map((metric) => (
                <Card key={metric.label} className="border-[#dce7ef] bg-white/85">
                  <CardContent className="p-4">
                    <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#274472]">{metric.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="relative" delay={0.15}>
          <div className="absolute -left-4 top-10 hidden rounded-2xl border border-[#d4e7da] bg-white/90 px-4 py-3 shadow-[0_24px_60px_-36px_rgba(39,68,114,0.55)] md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t.hero.conversionLabel}</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em] text-[#274472]">{t.hero.conversionValue}</p>
          </div>

          <Card className="relative overflow-hidden border-[#dce7ef] bg-white/90 p-5">
            <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,_rgba(163,217,177,0.22),_rgba(74,144,226,0.12))]" />

            <div className="relative flex items-center justify-between rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e9f6ec] text-[#274472]">
                  <MessageIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold tracking-[-0.03em] text-[#274472]">{t.hero.cardTitle}</p>
                  <p className="text-sm text-slate-500">{t.hero.cardSubtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[#f4faf6] px-3 py-1.5 text-xs font-semibold text-[#274472]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#a3d9b1]" />
                {t.hero.online}
              </div>
            </div>

            <MotionDiv
              className="relative mt-5 space-y-4 rounded-[28px] border border-[#d8e4ef] bg-[#f8fbfd] p-4 sm:p-5"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="flex items-center justify-between border-b border-[#e2ebf2] pb-3">
                <div>
                  <p className="text-sm font-semibold text-[#274472]">{t.hero.conversationTitle}</p>
                  <p className="text-xs text-slate-500">{t.hero.conversationSubtitle}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-[#e3edf4]">
                  {t.hero.messageCount}
                </span>
              </div>

              <div className="space-y-3">
                <MotionDiv
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                  className="max-w-[82%] rounded-[22px] rounded-bl-md bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-[#e3edf4]"
                >
                  <p className="font-medium text-slate-500">{t.hero.patientLabel}</p>
                  <p className="mt-1">{t.hero.patientMessage}</p>
                </MotionDiv>

                <MotionDiv
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="ml-auto max-w-[88%] rounded-[22px] rounded-br-md bg-[#dcf3e4] px-4 py-3 text-sm leading-6 text-[#24445d] shadow-sm ring-1 ring-[#cbe8d5]"
                >
                  <p className="font-medium text-[#366383]">{t.hero.aiLabel}</p>
                  <p className="mt-1">{t.hero.aiMessage}</p>
                </MotionDiv>
              </div>

              <div className="grid gap-3 rounded-3xl bg-white p-4 ring-1 ring-[#e3edf4] sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-[#274472]">{t.hero.suggestedTitle}</p>
                  <p className="mt-1 text-sm text-slate-500">{t.hero.suggestedDescription}</p>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-full bg-[#eef6fb] px-3 py-2 text-sm font-semibold text-[#274472]">{t.hero.slots[0]}</span>
                  <span className="rounded-full bg-[#fff5e6] px-3 py-2 text-sm font-semibold text-[#7a5410]">{t.hero.slots[1]}</span>
                </div>
              </div>
            </MotionDiv>
          </Card>

          <div className="absolute -bottom-4 right-2 hidden rounded-2xl border border-[#e9d9b6] bg-white/95 px-4 py-3 shadow-[0_24px_60px_-36px_rgba(39,68,114,0.55)] md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t.hero.automationLabel}</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em] text-[#274472]">{t.hero.automationValue}</p>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function ProblemSection({ t }) {
  return (
    <section id="problem" className="border-y border-[#e4edf3] bg-white py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading eyebrow={t.problem.eyebrow} title={t.problem.title} description={t.problem.description} />
        </SectionReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {t.problem.items.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.08}>
              <Card className="h-full border-[#e4edf3] bg-[#fbfcfe]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <IconBadge className="h-11 w-11 rounded-2xl border-[#f3dfbd] bg-[#fff6e8] text-[#a1680d]">
                      <AlertIcon className="h-5 w-5" />
                    </IconBadge>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SolutionSection({ t }) {
  return (
    <section id="solution" className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(74,144,226,0.12),_transparent_55%)]" />
      <Container className="relative">
        <SectionReveal>
          <SectionHeading eyebrow={t.solution.eyebrow} title={t.solution.title} description={t.solution.description} />
        </SectionReveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {t.solution.items.map((item, index) => {
            const Icon = getSolutionIcon(item.icon);

            return (
              <SectionReveal key={item.title} delay={index * 0.08}>
                <Card className="h-full border-[#dce7ef]">
                  <CardHeader>
                    <IconBadge className="bg-[#f6fbff] text-[#4a90e2] ring-1 ring-[#dbe9f8]">
                      <Icon className="h-5 w-5" />
                    </IconBadge>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                          <CheckIcon className="h-4 w-4 text-[#4a90e2]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function HowItWorksSection({ t }) {
  return (
    <section id="how-it-works" className="bg-[#f6fafc] py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading eyebrow={t.howItWorks.eyebrow} title={t.howItWorks.title} description={t.howItWorks.description} />
        </SectionReveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {t.howItWorks.items.map((item, index) => (
            <SectionReveal key={item.step} delay={index * 0.08}>
              <Card className="relative h-full border-[#dce7ef] bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#274472]">{item.step}</span>
                    <span className="rounded-full bg-[#e9f6ec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#274472]">
                      {t.howItWorks.stepLabel} {index + 1}
                    </span>
                  </div>
                  <CardTitle className="mt-2">{item.title}</CardTitle>
                  <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BenefitsSection({ t }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading eyebrow={t.benefits.eyebrow} title={t.benefits.title} description={t.benefits.description} />
        </SectionReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.benefits.items.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <Card className="h-full border-[#dce7ef] bg-white">
                <CardHeader>
                  <IconBadge className={index === 0 ? "bg-[#e9f6ec] text-[#274472]" : "bg-[#f6fbff] text-[#4a90e2]"}>
                    {index === 0 ? <GrowthIcon className="h-5 w-5" /> : <CheckIcon className="h-5 w-5" />}
                  </IconBadge>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SocialProofSection({ t }) {
  return (
    <section id="proof" className="border-y border-[#e4edf3] bg-white py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading eyebrow={t.proof.eyebrow} title={t.proof.title} description={t.proof.description} />
        </SectionReveal>

        <SectionReveal delay={0.08} className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="border-[#dce7ef] bg-[linear-gradient(180deg,_#f9fcfb_0%,_#ffffff_100%)]">
            <CardContent className="grid grid-cols-3 gap-4 p-6 text-center">
              {t.proof.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#274472]">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </SectionReveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {t.proof.testimonials.map((testimonial, index) => (
            <SectionReveal key={testimonial.name} delay={index * 0.08}>
              <Card className="h-full border-[#dce7ef] bg-[#fbfcfe]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f6ec] font-display text-lg font-semibold text-[#274472]">
                      {testimonial.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-7 text-slate-700">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function OperationsSection({ t }) {
  return (
    <section className="border-b border-[#e4edf3] bg-[linear-gradient(180deg,_#ffffff_0%,_#f6fafc_100%)] py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading eyebrow={t.operations.eyebrow} title={t.operations.title} description={t.operations.description} />
        </SectionReveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {t.operations.cards.map((feature, index) => (
            <SectionReveal key={feature.title} delay={index * 0.07}>
              <Card className="h-full overflow-hidden border-[#dce7ef] bg-white">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[#e6eef5] bg-[linear-gradient(135deg,_#eef6fb_0%,_#f9fcfb_100%)]">
                  <img
                    src={OPERATIONS_FEATURE_ILLUSTRATIONS[index]}
                    alt={feature.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-7">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection({ t }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <Card className="overflow-hidden border-[#d6e7de] bg-[linear-gradient(135deg,_#274472_0%,_#345d8f_55%,_#4a90e2_100%)]">
            <div className="grid gap-8 p-8 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">{t.finalCta.eyebrow}</p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{t.finalCta.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{t.finalCta.description}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  href={START_TRIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="accent"
                  className="w-full lg:w-auto"
                  onClick={() => trackEvent({ name: "Healthcare_Landing_Final_Trial_Click", category: "CTA", label: "Footer" })}
                >
                  {t.cta.primary}
                </Button>
                <Button
                  href={DEMO_URL}
                  variant="secondary"
                  size="lg"
                  className="w-full border-white/20 bg-white/15 text-white ring-1 ring-white/25 hover:bg-white/20 lg:w-auto"
                  onClick={() => trackEvent({ name: "Healthcare_Landing_Final_Demo_Click", category: "CTA", label: "Footer" })}
                >
                  {t.cta.secondary}
                </Button>
              </div>
            </div>
          </Card>
        </SectionReveal>
      </Container>
    </section>
  );
}

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

function Footer({ t, language, onOpenPrivacyPreferences }) {
  return (
    <footer className="main-footer">
      <Container className="footer-grid">
        <div>
          <p>{t.footer.description}</p>
          <h4>{t.footer.locationTitle}</h4>
          <p>{t.footer.locationLine1}</p>
          <p>{t.footer.locationLine2}</p>
        </div>

        <div>
          <h4>{t.footer.contactTitle}</h4>
          <a href="mailto:sales@evolvianai.com" onClick={() => trackEvent({ name: "Healthcare_Footer_Contact_Click", category: "Footer", label: language })}>
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
                  onClick={() => trackEvent({ name: `Healthcare_Footer_${social.label}_Click`, category: "Footer", label: language })}
                >
                  <FooterSocialIcon kind={social.key} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4>{t.footer.legalTitle}</h4>
          <a href="/terms" onClick={() => trackEvent({ name: "Healthcare_Footer_Terms_Click", category: "Footer", label: language })}>
            {t.footer.terms}
          </a>
          <a href="/privacy" onClick={() => trackEvent({ name: "Healthcare_Footer_Privacy_Click", category: "Footer", label: language })}>
            {t.footer.privacy}
          </a>
          <button
            type="button"
            className="footer-privacy-btn"
            onClick={() => {
              trackEvent({ name: "Healthcare_Footer_Privacy_Choices_Click", category: "Footer", label: language });
              onOpenPrivacyPreferences();
            }}
          >
            {t.footer.privacyChoices}
          </button>
        </div>

        <div>
          <h4>{t.footer.getStarted}</h4>
          <a
            href={START_TRIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent({ name: "Healthcare_Footer_Register_Click", category: "Footer", label: language })}
          >
            {t.footer.createAccount}
          </a>
          <a href={DEMO_URL} onClick={() => trackEvent({ name: "Healthcare_Footer_Demo_Click", category: "Footer", label: language })}>
            {t.footer.demo}
          </a>
        </div>
      </Container>
      <p className="footer-bottom">© {new Date().getFullYear()} Evolvian AI. {t.footer.rights}</p>
    </footer>
  );
}

export default function LandingPage() {
  const { language, setLanguage } = usePublicLanguage();
  const { openPreferences } = usePublicConsent();
  const t = COPY[language] || COPY.en;

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    setLanguage(nextLanguage);
    trackEvent({ name: "Healthcare_Landing_Language_Change", category: "UX", label: nextLanguage });
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-900">
      <Header t={t} language={language} onLanguageChange={handleLanguageChange} />
      <main>
        <HeroSection t={t} />
        <ProblemSection t={t} />
        <SolutionSection t={t} />
        <HowItWorksSection t={t} />
        <BenefitsSection t={t} />
        <PublicPricingSection copy={t.pricing} language={language} />
        <OperationsSection t={t} />
        <SocialProofSection t={t} />
        <FinalCtaSection t={t} />
      </main>
      <Footer t={t} language={language} onOpenPrivacyPreferences={openPreferences} />
    </div>
  );
}

function ArrowUpRightIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m5 12 4 4L19 7" />
    </svg>
  );
}

function AlertIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

function MessageIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 10h10" />
      <path d="M7 14h6" />
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.7 0-3.28-.5-4.61-1.36L3 20l1.35-4.38A8.45 8.45 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
    </svg>
  );
}

function SparkIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
      <path d="M5 18.5 6 21l1-2.5L9.5 17 7 16l-1-2.5L5 16l-2.5 1L5 18.5Z" />
      <path d="M18 17.5 19 20l1-2.5 2.5-1.5L20 14.5 19 12l-1 2.5-2.5 1.5L18 17.5Z" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function GrowthIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 17 9 11l4 4 7-8" />
      <path d="M14 7h6v6" />
    </svg>
  );
}
