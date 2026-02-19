import React, { useMemo, useState } from "react";
import { usePublicConsent } from "../contexts/PublicConsentContext";
import { usePublicLanguage } from "../contexts/PublicLanguageContext";

const COPY = {
  en: {
    bannerTitle: "Privacy and cookie preferences",
    bannerBody:
      "We use essential cookies to run the site and optional analytics/marketing technologies to improve performance and measure campaigns.",
    bannerBodyGpc:
      "Global Privacy Control is enabled in your browser. We will keep sale/share disabled unless you change your preferences.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    customize: "Customize",
    modalTitle: "Manage privacy choices",
    modalBody: "You can update your privacy preferences at any time.",
    necessaryTitle: "Necessary cookies",
    necessaryBody: "Required for security, routing, and core website functionality.",
    analyticsTitle: "Analytics",
    analyticsBody: "Helps us understand traffic and improve user experience.",
    marketingTitle: "Marketing",
    marketingBody: "Allows ad conversion measurement with Google and Meta.",
    saleShareTitle: "Do not sell or share my personal information",
    saleShareBody: "When enabled, we disable advertising sharing and marketing trackers.",
    save: "Save preferences",
    close: "Close",
  },
  es: {
    bannerTitle: "Preferencias de privacidad y cookies",
    bannerBody:
      "Usamos cookies esenciales para operar el sitio y tecnologias opcionales de analitica/marketing para mejorar rendimiento y medir campanas.",
    bannerBodyGpc:
      "Global Privacy Control esta habilitado en tu navegador. Mantendremos desactivada la venta/comparticion salvo que cambies tus preferencias.",
    acceptAll: "Aceptar todo",
    rejectAll: "Rechazar todo",
    customize: "Personalizar",
    modalTitle: "Administrar preferencias de privacidad",
    modalBody: "Puedes actualizar tus preferencias en cualquier momento.",
    necessaryTitle: "Cookies necesarias",
    necessaryBody: "Requeridas para seguridad, navegacion y funcionamiento base del sitio.",
    analyticsTitle: "Analitica",
    analyticsBody: "Nos ayuda a entender trafico y mejorar la experiencia de usuario.",
    marketingTitle: "Marketing",
    marketingBody: "Permite medir conversiones publicitarias con Google y Meta.",
    saleShareTitle: "No vender ni compartir mi informacion personal",
    saleShareBody: "Si esta activo, desactivamos comparticion publicitaria y trackers de marketing.",
    save: "Guardar preferencias",
    close: "Cerrar",
  },
};

function Toggle({ id, checked, disabled, onChange, title, body }) {
  return (
    <div className="consent-setting-row">
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
      <label className={`consent-switch ${disabled ? "is-disabled" : ""}`} htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
        <span />
      </label>
    </div>
  );
}

export default function PrivacyConsentManager() {
  const { language } = usePublicLanguage();
  const { consent, isBannerOpen, isPreferencesOpen, acceptAll, rejectAll, savePreferences, openPreferences, closePreferences } =
    usePublicConsent();
  const t = COPY[language] || COPY.en;

  const [draft, setDraft] = useState(consent.preferences);

  const effectiveDraft = useMemo(
    () => ({
      ...draft,
      saleShareOptOut: consent.globalPrivacyControl ? true : Boolean(draft.saleShareOptOut),
      marketing: consent.globalPrivacyControl || draft.saleShareOptOut ? false : Boolean(draft.marketing),
    }),
    [draft, consent.globalPrivacyControl]
  );

  const syncFromCurrentConsent = () => {
    setDraft(consent.preferences);
  };

  const handleCustomize = () => {
    syncFromCurrentConsent();
    openPreferences();
  };

  const handleSave = () => {
    savePreferences(effectiveDraft);
  };

  if (!isBannerOpen && !isPreferencesOpen) return null;

  return (
    <>
      {isBannerOpen ? (
        <div className="consent-banner" role="dialog" aria-live="polite" aria-label={t.bannerTitle}>
          <div className="section-shell consent-banner-inner">
            <div>
              <h3>{t.bannerTitle}</h3>
              <p>{t.bannerBody}</p>
              {consent.globalPrivacyControl ? <p className="consent-gpc-note">{t.bannerBodyGpc}</p> : null}
            </div>
            <div className="consent-banner-actions">
              <button type="button" className="btn btn-secondary" onClick={rejectAll}>
                {t.rejectAll}
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleCustomize}>
                {t.customize}
              </button>
              <button type="button" className="btn btn-primary" onClick={acceptAll}>
                {t.acceptAll}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isPreferencesOpen ? (
        <div className="consent-modal-overlay" role="dialog" aria-modal="true" aria-label={t.modalTitle}>
          <div className="consent-modal-card">
            <h3>{t.modalTitle}</h3>
            <p>{t.modalBody}</p>

            <div className="consent-setting-grid">
              <Toggle
                id="consent-necessary"
                checked
                disabled
                title={t.necessaryTitle}
                body={t.necessaryBody}
                onChange={() => {}}
              />
              <Toggle
                id="consent-analytics"
                checked={Boolean(effectiveDraft.analytics)}
                disabled={false}
                title={t.analyticsTitle}
                body={t.analyticsBody}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    analytics: event.target.checked,
                  }))
                }
              />
              <Toggle
                id="consent-marketing"
                checked={Boolean(effectiveDraft.marketing)}
                disabled={consent.globalPrivacyControl || Boolean(effectiveDraft.saleShareOptOut)}
                title={t.marketingTitle}
                body={t.marketingBody}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    marketing: event.target.checked,
                  }))
                }
              />
              <Toggle
                id="consent-sale-share"
                checked={Boolean(effectiveDraft.saleShareOptOut)}
                disabled={consent.globalPrivacyControl}
                title={t.saleShareTitle}
                body={t.saleShareBody}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    saleShareOptOut: event.target.checked,
                    marketing: event.target.checked ? false : prev.marketing,
                  }))
                }
              />
            </div>

            <div className="consent-modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closePreferences}>
                {t.close}
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                {t.save}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
