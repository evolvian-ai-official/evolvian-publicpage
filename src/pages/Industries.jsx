import React from "react";
import BlogChrome from "../blog/BlogChrome";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";
import { trackEvent } from "../utils/tracking";
import "./Industries.css";

const DIRECT_LOGIN_URL = "https://www.evolvianai.net/login";

const COPY = {
  en: {
    kicker: "Industries",
    title: "Built for the businesses that live on appointments",
    description:
      "Evolvian adapts to your industry's vocabulary, services, and booking flow so every conversation feels like it came from your own front desk.",
    ctaLabel: "Start free",
    items: [
      {
        id: "medical",
        name: "Medical clinics",
        image: "/industries/medical.svg",
        description:
          "Answer patient questions, confirm appointments, and send pre-visit reminders automatically.",
        bullets: [
          "Answers common patient questions 24/7",
          "Books and confirms appointments in real time",
          "Sends pre-visit reminders to cut no-shows",
        ],
      },
      {
        id: "psychology",
        name: "Psychology & therapy",
        image: "/industries/psychology.svg",
        description:
          "Handle intake questions with care, schedule sessions, and reduce no-shows with timely reminders.",
        bullets: [
          "Responds to intake questions with a calm, on-brand tone",
          "Schedules sessions without back-and-forth messages",
          "Reduces missed sessions with automatic reminders",
        ],
      },
      {
        id: "veterinary",
        name: "Veterinary clinics",
        image: "/industries/veterinary.svg",
        description:
          "Book check-ups and vaccinations, answer pet-care questions, and follow up after visits.",
        bullets: [
          "Books check-ups, vaccinations, and grooming",
          "Answers common pet-care questions instantly",
          "Follows up with owners after every visit",
        ],
      },
      {
        id: "orthodontics",
        name: "Orthodontics & dental",
        image: "/industries/orthodontics.svg",
        description:
          "Qualify new patients, schedule consultations, and remind them before every appointment.",
        bullets: [
          "Qualifies new patients before the first visit",
          "Schedules consultations and treatment follow-ups",
          "Reminds patients before every appointment",
        ],
      },
      {
        id: "aesthetics",
        name: "Aesthetics & wellness",
        image: "/industries/aesthetics.svg",
        description:
          "Convert inquiries into booked treatments and keep clients coming back with automated follow-ups.",
        bullets: [
          "Turns WhatsApp inquiries into booked treatments",
          "Shares pricing and service details automatically",
          "Keeps clients coming back with follow-up campaigns",
        ],
      },
      {
        id: "legal",
        name: "Legal & professional services",
        image: "/industries/legal.svg",
        description:
          "Capture new case inquiries, schedule consultations, and keep clients informed automatically.",
        bullets: [
          "Captures new case inquiries around the clock",
          "Schedules consultations with qualified leads",
          "Keeps clients informed without extra staff time",
        ],
      },
    ],
  },
  es: {
    kicker: "Industrias",
    title: "Hecho para negocios que viven de las citas",
    description:
      "Evolvian se adapta al vocabulario, servicios y flujo de agendamiento de tu industria, para que cada conversacion se sienta como si viniera de tu propia recepcion.",
    ctaLabel: "Empieza gratis",
    items: [
      {
        id: "medical",
        name: "Clinicas medicas",
        image: "/industries/medical.svg",
        description:
          "Responde preguntas de pacientes, confirma citas y envia recordatorios antes de cada visita, automaticamente.",
        bullets: [
          "Responde preguntas frecuentes de pacientes las 24 horas",
          "Agenda y confirma citas en tiempo real",
          "Envia recordatorios antes de la visita para reducir ausencias",
        ],
      },
      {
        id: "psychology",
        name: "Psicologia y terapia",
        image: "/industries/psychology.svg",
        description:
          "Atiende preguntas de admision con cuidado, agenda sesiones y reduce ausencias con recordatorios oportunos.",
        bullets: [
          "Responde preguntas de admision con un tono cuidadoso",
          "Agenda sesiones sin idas y vueltas de mensajes",
          "Reduce sesiones perdidas con recordatorios automaticos",
        ],
      },
      {
        id: "veterinary",
        name: "Clinicas veterinarias",
        image: "/industries/veterinary.svg",
        description:
          "Agenda chequeos y vacunas, responde preguntas sobre el cuidado de mascotas y da seguimiento despues de cada visita.",
        bullets: [
          "Agenda chequeos, vacunas y estetica para mascotas",
          "Responde preguntas comunes sobre cuidado animal",
          "Da seguimiento a los duenos despues de cada visita",
        ],
      },
      {
        id: "orthodontics",
        name: "Ortodoncia y dental",
        image: "/industries/orthodontics.svg",
        description:
          "Califica nuevos pacientes, agenda consultas y recuerdales cada cita.",
        bullets: [
          "Califica nuevos pacientes antes de la primera visita",
          "Agenda consultas y seguimientos de tratamiento",
          "Recuerda a los pacientes antes de cada cita",
        ],
      },
      {
        id: "aesthetics",
        name: "Estetica y bienestar",
        image: "/industries/aesthetics.svg",
        description:
          "Convierte consultas en tratamientos agendados y haz que los clientes regresen con seguimiento automatizado.",
        bullets: [
          "Convierte consultas de WhatsApp en tratamientos agendados",
          "Comparte precios y detalles de servicio automaticamente",
          "Hace que los clientes regresen con campanas de seguimiento",
        ],
      },
      {
        id: "legal",
        name: "Servicios legales y profesionales",
        image: "/industries/legal.svg",
        description:
          "Captura nuevas consultas de casos, agenda reuniones y mantiene informados a tus clientes automaticamente.",
        bullets: [
          "Captura nuevas consultas de casos las 24 horas",
          "Agenda consultas con leads calificados",
          "Mantiene informados a los clientes sin personal extra",
        ],
      },
    ],
  },
};

export default function Industries() {
  const { language } = usePublicLanguage();
  const t = COPY[language] || COPY.en;

  return (
    <BlogChrome>
      <main className="industries-page">
        <section className="section-base industries-hero">
          <div className="section-shell section-heading">
            <p className="section-kicker">{t.kicker}</p>
            <h1>{t.title}</h1>
            <p>{t.description}</p>
          </div>
        </section>

        <section className="section-base">
          <div className="section-shell industries-rows">
            {t.items.map((item, index) => (
              <article
                key={item.id}
                className={`industries-row ${index % 2 === 1 ? "industries-row-reverse" : ""}`}
              >
                <div className="industries-row-text">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <a
                    href={DIRECT_LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    onClick={() =>
                      trackEvent({ name: "Industries_CTA_Click", category: "Industries", label: `${item.id}_${language}` })
                    }
                  >
                    {t.ctaLabel}
                  </a>
                </div>
                <div className="industries-row-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </BlogChrome>
  );
}
