import { useState } from "react";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";
import { trackEvent } from "../utils/tracking";

const DIRECT_LOGIN_URL = "https://www.evolvianai.net/login";
const DEMO_URL = "/demo";

const HealthcareSection = () => {
  const { language } = usePublicLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const content = {
    en: {
      hero: {
        title: "AI Receptionist for Your Clinic",
        description:
          "Answer patients 24/7, schedule appointments automatically, and reduce no-shows. Without hiring extra staff.",
        cta1: "Free trial for clinics",
        cta2: "See how it works",
      },
      usecases: {
        title: "Automate what consumes the most time",
        subtitle:
          "Evolvian handles repetitive tasks so you can focus on caring for patients",
        cards: [
          {
            icon: "📱",
            title: "WhatsApp Inquiries",
            description:
              "Automatically answer questions about services, prices, and availability. Patients get answers in seconds.",
          },
          {
            icon: "🗓️",
            title: "Automatic Scheduling",
            description:
              "AI syncs with your Google Calendar and confirms appointments in the conversation. No phone calls.",
          },
          {
            icon: "⏰",
            title: "Automatic Reminders",
            description:
              "Send WhatsApp reminders before each appointment. Reduces no-shows by up to 40%.",
          },
        ],
      },
      stats: {
        items: [
          {
            value: "70%",
            label: "of consultations come outside business hours",
          },
          {
            value: "40%+",
            label: "reduction in no-shows",
          },
          {
            value: "<15 min",
            label: "setup time",
          },
        ],
      },
      workflow: {
        title: "Set up in 3 steps",
        subtitle: "Your AI receptionist will be ready in less than an hour",
        steps: [
          {
            number: "1",
            title: "Upload your info",
            description: "Services, prices, hours, and FAQ from your clinic",
          },
          {
            number: "2",
            title: "Connect WhatsApp",
            description: "Sync your WhatsApp Business in one click",
          },
          {
            number: "3",
            title: "Start operating",
            description: "Your AI attends patients automatically",
          },
        ],
      },
      features: {
        title: "Designed for clinics",
        items: [
          {
            title: "Complete patient history",
            description:
              "All their conversations, calls, and appointments in one place. Your team always has context.",
          },
          {
            title: "Scale to your team when you need it",
            description:
              "AI escalates complex cases to your staff with full context. Never lose the thread.",
          },
          {
            title: "Google Calendar Sync",
            description:
              "AI sees your availability in real-time. Zero double-booking, zero chaos.",
          },
          {
            title: "Works in Spanish from day 1",
            description:
              "Configured for clinics in LATAM. Bilingual support included.",
          },
        ],
      },
      cta: {
        title: "Ready to automate your clinic?",
        description:
          "Try Evolvian free. No credit card. No commitments. Start today.",
        button: "Start your free trial",
      },
    },
    es: {
      hero: {
        title: "La Recepcionista AI para tu Clínica",
        description:
          "Responde pacientes 24/7, agenda citas automáticamente y reduce no-shows. Sin contratar personal extra.",
        cta1: "Prueba gratis para clínicas",
        cta2: "Ver cómo funciona",
      },
      usecases: {
        title: "Automatiza lo que más tiempo consume",
        subtitle:
          "Evolvian maneja las tareas repetitivas para que tú te enfoques en atender pacientes",
        cards: [
          {
            icon: "📱",
            title: "Consultas por WhatsApp",
            description:
              "Responde preguntas sobre servicios, precios y disponibilidad automáticamente. Los pacientes obtienen respuestas en segundos.",
          },
          {
            icon: "🗓️",
            title: "Agendamiento Automático",
            description:
              "El AI sincroniza con tu Google Calendar y confirma citas en la conversación. Sin llamadas telefónicas.",
          },
          {
            icon: "⏰",
            title: "Recordatorios Automáticos",
            description:
              "Envía recordatorios por WhatsApp antes de cada cita. Reduce no-shows hasta 40%.",
          },
        ],
      },
      stats: {
        items: [
          {
            value: "70%",
            label: "de consultas vienen fuera de horario",
          },
          {
            value: "40%+",
            label: "reducción en no-shows",
          },
          {
            value: "<15 min",
            label: "tiempo de setup",
          },
        ],
      },
      workflow: {
        title: "Configurado en 3 pasos",
        subtitle: "Tu recepcionista AI estará lista en menos de una hora",
        steps: [
          {
            number: "1",
            title: "Sube tu info",
            description: "Servicios, precios, horarios y FAQ de tu clínica",
          },
          {
            number: "2",
            title: "Conecta WhatsApp",
            description: "Sincroniza tu WhatsApp Business en un click",
          },
          {
            number: "3",
            title: "Empieza a operar",
            description: "Tu AI atiende pacientes automáticamente",
          },
        ],
      },
      features: {
        title: "Diseñado para clínicas",
        items: [
          {
            title: "Historial completo por paciente",
            description:
              "Todas sus conversaciones, llamadas y citas en un lugar. Tu equipo siempre tiene contexto.",
          },
          {
            title: "Escala a tu equipo cuando necesites",
            description:
              "El AI escala casos complejos a tu personal con contexto completo. Nunca pierden el hilo.",
          },
          {
            title: "Sincronización con Google Calendar",
            description:
              "El AI ve tu disponibilidad en tiempo real. Cero doble-booking, cero caos.",
          },
          {
            title: "Funciona en español desde el día 1",
            description:
              "Configurado para clínicas en LATAM. Soporte bilingüe incluido.",
          },
        ],
      },
      cta: {
        title: "¿Listo para automatizar tu clínica?",
        description:
          "Prueba Evolvian gratis. Sin tarjeta de crédito. Sin compromisos. Empieza hoy.",
        button: "Comienza tu prueba gratuita",
      },
    },
  };

  const t = content[language] || content.en;

  const slides = [
    // Slide 1: Hero
    {
      type: "hero",
      render: () => (
        <div style={{ background: "linear-gradient(135deg, #274472 0%, #4a90e2 100%)", minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" }} className="text-white px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-6xl block mb-4">🏥</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a
                href={DIRECT_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent({ name: "Healthcare_FreeTrialClick", category: "Healthcare", label: language })}
                style={{ backgroundColor: "#f5a623" }}
                className="px-8 py-3 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
              >
                {t.hero.cta1}
              </a>
              <a
                href={DEMO_URL}
                onClick={() => trackEvent({ name: "Healthcare_SeeHowClick", category: "Healthcare", label: language })}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-all inline-block"
              >
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 2: Use Cases
    {
      type: "usecases",
      render: () => (
        <div style={{ backgroundColor: "#f4f9ff", minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" }} className="px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p style={{ color: "#4a90e2", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }} className="mb-2">
                HEALTHCARE
              </p>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1b2a41" }} className="text-3xl md:text-4xl font-bold mb-4">
                {t.usecases.title}
              </h3>
              <p style={{ color: "#44556d" }} className="text-lg">
                {t.usecases.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.usecases.cards.map((card, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: "#ffffff", borderTop: "3px solid #4a90e2" }}
                  className="p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <span className="text-5xl block mb-4">{card.icon}</span>
                  <h4 style={{ color: "#1b2a41", fontFamily: "'Space Grotesk', sans-serif" }} className="text-xl font-bold mb-3">
                    {card.title}
                  </h4>
                  <p style={{ color: "#44556d" }} className="leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Slide 3: Stats
    {
      type: "stats",
      render: () => (
        <div style={{ backgroundColor: "#eef6ff", minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" }} className="px-4">
          <div className="max-w-4xl mx-auto">
            <p style={{ color: "#4a90e2", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }} className="mb-4">
              RESULTS
            </p>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {t.stats.items.map((stat, i) => (
                <div key={i}>
                  <div style={{ color: "#f5a623", fontFamily: "'Space Grotesk', sans-serif" }} className="text-5xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <p style={{ color: "#44556d" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Slide 4: Workflow
    {
      type: "workflow",
      render: () => (
        <div style={{ backgroundColor: "#ffffff", minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" }} className="px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p style={{ color: "#4a90e2", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }} className="mb-2">
                SETUP
              </p>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1b2a41" }} className="text-3xl md:text-4xl font-bold mb-4">
                {t.workflow.title}
              </h3>
              <p style={{ color: "#44556d" }} className="text-lg">
                {t.workflow.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.workflow.steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div
                    style={{ backgroundColor: "#4a90e2", color: "white" }}
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4"
                  >
                    {step.number}
                  </div>
                  <h4 style={{ color: "#1b2a41", fontFamily: "'Space Grotesk', sans-serif" }} className="text-xl font-bold mb-2">
                    {step.title}
                  </h4>
                  <p style={{ color: "#44556d" }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Slide 5: Features
    {
      type: "features",
      render: () => (
        <div style={{ backgroundColor: "#f4f9ff", minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" }} className="px-4">
          <div className="max-w-4xl mx-auto">
            <p style={{ color: "#4a90e2", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }} className="mb-4">
              FEATURES
            </p>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1b2a41" }} className="text-3xl md:text-4xl font-bold mb-12">
              {t.features.title}
            </h3>
            <div className="space-y-6">
              {t.features.items.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span style={{ color: "#a3d9b1" }} className="text-2xl flex-shrink-0 mt-1">
                    ✓
                  </span>
                  <div>
                    <h5 style={{ color: "#1b2a41", fontFamily: "'Space Grotesk', sans-serif" }} className="text-lg font-bold mb-2">
                      {feature.title}
                    </h5>
                    <p style={{ color: "#44556d" }}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Slide 6: Final CTA
    {
      type: "cta",
      render: () => (
        <div style={{ background: "linear-gradient(135deg, #274472 0%, #4a90e2 100%)", minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" }} className="text-white px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-3xl md:text-4xl font-bold mb-6">
              {t.cta.title}
            </h3>
            <p className="text-lg mb-8 opacity-90">{t.cta.description}</p>
            <a
              href={DIRECT_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ name: "Healthcare_CTAClick", category: "Healthcare", label: language })}
              style={{ backgroundColor: "#f5a623" }}
              className="px-8 py-3 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
            >
              {t.cta.button}
            </a>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    trackEvent({ name: "Healthcare_NextSlide", category: "Healthcare", label: `Slide ${currentSlide + 1}` });
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    trackEvent({ name: "Healthcare_PrevSlide", category: "Healthcare", label: `Slide ${currentSlide - 1}` });
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
    trackEvent({ name: "Healthcare_GoToSlide", category: "Healthcare", label: `Slide ${index + 1}` });
  };

  return (
    <section className="healthcare-carousel" style={{ marginBottom: "4rem" }}>
      {/* Slides */}
      <div className="relative overflow-hidden" style={{ minHeight: "450px" }}>
        {slides[currentSlide].render()}
      </div>

      {/* Navigation Controls */}
      <div style={{ backgroundColor: "#ffffff", borderTop: "1px solid #d5e0ee", paddingBottom: "2rem" }} className="flex items-center justify-center gap-6 py-8">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          style={{ borderColor: "#d5e0ee", color: "#4a90e2" }}
          className="p-2 rounded-full border-2 hover:bg-blue-50 transition-all text-xl font-bold"
          aria-label="Previous slide"
        >
          ←
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                backgroundColor: index === currentSlide ? "#4a90e2" : "#d5e0ee",
                width: index === currentSlide ? "32px" : "12px",
              }}
              className="h-3 rounded-full transition-all"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          style={{ borderColor: "#d5e0ee", color: "#4a90e2" }}
          className="p-2 rounded-full border-2 hover:bg-blue-50 transition-all text-xl font-bold"
          aria-label="Next slide"
        >
          →
        </button>

        {/* Slide Counter */}
        <span style={{ color: "#44556d" }} className="text-sm ml-4">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </section>
  );
};

export default HealthcareSection;
