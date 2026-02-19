import React, { useMemo, useState } from "react";
import { trackEvent } from "../utils/tracking";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";
import { usePublicConsent } from "../contexts/PublicConsentContext";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Espanol" },
];

const COPY = {
  en: {
    nav: { features: "Features", plans: "Plans", contact: "Contact", about: "About", blog: "Blog" },
    auth: { login: "Log in", startFree: "Start free" },
    footer: {
      location: "Location",
      contact: "Contact",
      legal: "Legal",
      getStarted: "Get started",
      createAccount: "Create your account",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      privacyChoices: "Privacy choices / Do not sell or share",
      rights: "All rights reserved.",
    },
  },
  es: {
    nav: { features: "Funciones", plans: "Planes", contact: "Contacto", about: "Nosotros", blog: "Blog" },
    auth: { login: "Iniciar sesion", startFree: "Empieza gratis" },
    footer: {
      location: "Ubicacion",
      contact: "Contacto",
      legal: "Legal",
      getStarted: "Comenzar",
      createAccount: "Crear tu cuenta",
      terms: "Terminos y Condiciones",
      privacy: "Politica de Privacidad",
      privacyChoices: "Preferencias de privacidad / No vender ni compartir",
      rights: "Todos los derechos reservados.",
    },
  },
};

export default function BlogChrome({ children }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { language, setLanguage } = usePublicLanguage();
  const { openPreferences } = usePublicConsent();
  const t = COPY[language] || COPY.en;

  const navLinks = useMemo(
    () => [
      { href: "/#features", label: t.nav.features },
      { href: "/#plans", label: t.nav.plans },
      { href: "/#contact", label: t.nav.contact },
      { href: "/#about-us", label: t.nav.about },
      { href: "/blog", label: t.nav.blog },
    ],
    [t]
  );

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    setLanguage(nextLanguage);
    trackEvent({ name: "Language_Change", category: "UX", label: `blog_${nextLanguage}` });
  };

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
                onClick={() => trackEvent({ name: "Nav_Click", category: "Navigation", label: `Blog_${link.label}_${language}` })}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="desktop-actions">
            <div className="lang-group">
              <label htmlFor="blog-language-select" className="lang-label">Lang</label>
              <select
                id="blog-language-select"
                value={language}
                onChange={handleLanguageChange}
                className="lang-select"
              >
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
              onClick={() => trackEvent({ name: "Login_Click", category: "Navigation", label: `Blog_Header_${language}` })}
            >
              {t.auth.login}
            </a>
            <a
              href="https://www.evolvianai.net/register"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => trackEvent({ name: "Register_Click", category: "Navigation", label: `Blog_Header_${language}` })}
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
                    trackEvent({ name: "Nav_Click", category: "Navigation", label: `Blog_Mobile_${link.label}_${language}` });
                    setOpenMenu(false);
                  }}
                >
                  {link.label}
                </a>
              ))}

              <div className="mobile-lang-row">
                <label htmlFor="blog-language-select-mobile" className="lang-label">Lang</label>
                <select
                  id="blog-language-select-mobile"
                  value={language}
                  onChange={handleLanguageChange}
                  className="lang-select"
                >
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
                  trackEvent({ name: "Register_Click", category: "Navigation", label: `Blog_Header_Mobile_${language}` });
                  setOpenMenu(false);
                }}
              >
                {t.auth.startFree}
              </a>
            </div>
          </div>
        ) : null}
      </header>

      {children}

      <footer className="main-footer">
        <div className="section-shell footer-grid">
          <div>
            <h4>{t.footer.location}</h4>
            <p>1001 S Main St Ste 500</p>
            <p>Kalispell, MT 59901</p>
          </div>

          <div>
            <h4>{t.footer.contact}</h4>
            <a
              href="mailto:support@evolvianai.com"
              onClick={() => trackEvent({ name: "Footer_Contact_Click", category: "Footer", label: `Blog_${language}` })}
            >
              support@evolvianai.com
            </a>
          </div>

          <div>
            <h4>{t.footer.legal}</h4>
            <a href="/terms" onClick={() => trackEvent({ name: "Footer_Terms_Click", category: "Footer", label: `Blog_${language}` })}>
              {t.footer.terms}
            </a>
            <a href="/privacy" onClick={() => trackEvent({ name: "Footer_Privacy_Click", category: "Footer", label: `Blog_${language}` })}>
              {t.footer.privacy}
            </a>
            <button
              type="button"
              className="footer-privacy-btn"
              onClick={() => {
                trackEvent({ name: "Footer_Privacy_Choices_Click", category: "Footer", label: `Blog_${language}` });
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
              onClick={() => trackEvent({ name: "Footer_Register_Click", category: "Footer", label: `Blog_${language}` })}
            >
              {t.footer.createAccount}
            </a>
          </div>
        </div>
        <p className="footer-bottom">© {new Date().getFullYear()} Evolvian AI. {t.footer.rights}</p>
      </footer>
    </>
  );
}
