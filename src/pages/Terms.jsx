import React from "react";
import BlogChrome from "../blog/BlogChrome";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";

const COPY = {
  en: {
    kicker: "Legal",
    title: "Terms and Conditions",
    updated: "Last updated: October 2025",
    intro:
      "Welcome to Evolvian (\"we,\" \"our,\" or \"us\"). These Terms and Conditions (\"Terms\") govern your access and use of the Evolvian platform, tools, and related services (collectively, the \"Service\"). By accessing or using the Service, you agree to these Terms.",
    sections: [
      {
        title: "1. Eligibility and Use",
        body:
          "You must be at least 18 years of age to use the Service. You agree to use Evolvian only for lawful purposes and in accordance with these Terms and applicable laws.",
      },
      {
        title: "2. Account and Security",
        body:
          "You are responsible for safeguarding your login credentials and all activities under your account. If you suspect unauthorized access, notify us immediately at",
      },
      {
        title: "3. Confidentiality and Document Privacy",
        body:
          "Documents uploaded to Evolvian are stored securely and are not shared with third parties for external model training. Access is limited to support, troubleshooting, or legal compliance needs.",
      },
      {
        title: "4. Ownership and Intellectual Property",
        body:
          "Evolvian retains ownership of its software, platform, and brand assets. You retain ownership of your uploaded files and data. You grant Evolvian a limited license to process content solely to operate the Service.",
      },
      {
        title: "5. Acceptable Use",
        bullets: [
          "Do not upload or transmit malicious, illegal, or infringing content.",
          "Do not attempt to hack, modify, or reverse-engineer the platform.",
          "Do not violate privacy rights or applicable regulations.",
          "Do not exceed usage limits or bypass plan restrictions.",
        ],
      },
      {
        title: "6. Service Availability",
        body:
          "We aim for high availability but do not guarantee uninterrupted uptime. Temporary interruptions may occur due to maintenance, updates, or external dependencies.",
      },
      {
        title: "7. Disclaimer and Limitation of Liability",
        body:
          "To the extent permitted by law, Evolvian is not liable for indirect, incidental, or consequential damages related to use of the Service. Our total liability is limited to the amount paid by you for the Service in the previous 12 months.",
      },
      {
        title: "8. Modifications",
        body:
          "We may update these Terms at any time. Changes are effective upon posting to this page. Continued use of the Service after updates constitutes acceptance of the revised Terms.",
      },
      {
        title: "9. Contact",
        body: "For legal or compliance inquiries, contact us at",
      },
    ],
  },
  es: {
    kicker: "Legal",
    title: "Terminos y Condiciones",
    updated: "Ultima actualizacion: Octubre 2025",
    intro:
      "Bienvenido a Evolvian (\"nosotros\"). Estos Terminos y Condiciones regulan tu acceso y uso de la plataforma, herramientas y servicios relacionados de Evolvian (el \"Servicio\"). Al usar el Servicio, aceptas estos terminos.",
    sections: [
      {
        title: "1. Elegibilidad y uso",
        body:
          "Debes tener al menos 18 anos para usar el Servicio. Aceptas usar Evolvian solo con fines legales y conforme a estos terminos y leyes aplicables.",
      },
      {
        title: "2. Cuenta y seguridad",
        body:
          "Eres responsable de proteger tus credenciales y toda actividad en tu cuenta. Si detectas acceso no autorizado, notificalo de inmediato a",
      },
      {
        title: "3. Confidencialidad y privacidad de documentos",
        body:
          "Los documentos subidos a Evolvian se almacenan de forma segura y no se comparten con terceros para entrenamiento externo. El acceso se limita a soporte, diagnostico o cumplimiento legal.",
      },
      {
        title: "4. Propiedad intelectual",
        body:
          "Evolvian conserva la propiedad de su software, plataforma y marca. Tu conservas la propiedad de tus archivos y datos. Otorgas a Evolvian una licencia limitada para procesar contenido solo para operar el Servicio.",
      },
      {
        title: "5. Uso aceptable",
        bullets: [
          "No subas contenido malicioso, ilegal o que infrinja derechos.",
          "No intentes hackear, modificar o hacer ingenieria inversa de la plataforma.",
          "No vulneres privacidad ni regulaciones aplicables.",
          "No excedas limites de uso ni evadas restricciones del plan.",
        ],
      },
      {
        title: "6. Disponibilidad del servicio",
        body:
          "Buscamos alta disponibilidad, pero no garantizamos continuidad total. Puede haber interrupciones temporales por mantenimiento, actualizaciones o dependencias externas.",
      },
      {
        title: "7. Descargo y limitacion de responsabilidad",
        body:
          "En la medida permitida por la ley, Evolvian no sera responsable por danos indirectos, incidentales o consecuenciales. La responsabilidad total se limita al monto pagado por el Servicio en los ultimos 12 meses.",
      },
      {
        title: "8. Modificaciones",
        body:
          "Podemos actualizar estos terminos en cualquier momento. Los cambios son efectivos al publicarse en esta pagina. El uso continuo del Servicio implica aceptacion de los terminos actualizados.",
      },
      {
        title: "9. Contacto",
        body: "Para consultas legales o de cumplimiento, escribenos a",
      },
    ],
  },
};

export default function Terms() {
  const { language } = usePublicLanguage();
  const t = COPY[language] || COPY.en;

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
                      {(section.title.includes("Account") || section.title.includes("Cuenta") || section.title.includes("Contact") || section.title.includes("Contacto")) ? (
                        <a href="mailto:support@evolvianai.com">support@evolvianai.com</a>
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
            </article>
          </div>
        </section>
      </main>
    </BlogChrome>
  );
}
