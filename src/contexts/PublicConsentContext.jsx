import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { syncThirdPartyConsent } from "../utils/thirdPartyScripts";
import { trackPageView } from "../utils/tracking";

const CONSENT_STORAGE_KEY = "evolvian_public_consent_v1";
const CONSENT_VERSION = "2026-02";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const DEFAULT_PREFERENCES = {
  necessary: true,
  analytics: false,
  marketing: false,
  saleShareOptOut: false,
};

const CONSENT_SOURCE_PARAM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid"];
const MAX_CONSENT_SOURCE_PATH_LENGTH = 250;

function detectGpc() {
  if (typeof navigator === "undefined") return false;
  return navigator.globalPrivacyControl === true;
}

function buildConsentSourcePath() {
  if (typeof window === "undefined") return "/";

  try {
    const url = new URL(window.location.href);
    const query = new URLSearchParams();

    for (const key of CONSENT_SOURCE_PARAM_KEYS) {
      const value = url.searchParams.get(key);
      if (value) query.set(key, value.slice(0, 80));
    }

    if (typeof document !== "undefined" && document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        if (referrer.hostname) query.set("ref", referrer.hostname.slice(0, 80));
      } catch {
        // Ignore malformed referrers and keep the consent log moving.
      }
    }

    const sourcePath = `${url.pathname}${query.toString() ? `?${query.toString()}` : ""}`;
    return sourcePath.slice(0, MAX_CONSENT_SOURCE_PATH_LENGTH) || "/";
  } catch {
    return typeof window.location?.pathname === "string" ? window.location.pathname.slice(0, MAX_CONSENT_SOURCE_PATH_LENGTH) || "/" : "/";
  }
}

function getInitialConsentState() {
  const gpcEnabled = detectGpc();
  const defaults = {
    hasConsent: false,
    version: CONSENT_VERSION,
    updatedAt: null,
    globalPrivacyControl: gpcEnabled,
    preferences: {
      ...DEFAULT_PREFERENCES,
      saleShareOptOut: gpcEnabled,
    },
  };

  if (typeof window === "undefined") return defaults;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== CONSENT_VERSION) return defaults;

    const safePreferences = {
      necessary: true,
      analytics: Boolean(parsed?.preferences?.analytics),
      marketing: Boolean(parsed?.preferences?.marketing),
      saleShareOptOut: gpcEnabled ? true : Boolean(parsed?.preferences?.saleShareOptOut),
    };

    if (safePreferences.saleShareOptOut && safePreferences.marketing) {
      safePreferences.marketing = false;
    }

    return {
      hasConsent: Boolean(parsed?.hasConsent),
      version: CONSENT_VERSION,
      updatedAt: parsed?.updatedAt || null,
      globalPrivacyControl: gpcEnabled,
      preferences: safePreferences,
    };
  } catch (error) {
    console.warn("Failed to parse stored consent:", error);
    return defaults;
  }
}

const PublicConsentContext = createContext({
  consent: getInitialConsentState(),
  isBannerOpen: true,
  isPreferencesOpen: false,
  acceptAll: () => {},
  rejectAll: () => {},
  savePreferences: () => {},
  openPreferences: () => {},
  closePreferences: () => {},
});

async function logConsentRecord(consent) {
  try {
    await fetch(`${API_BASE}/api/public/privacy/consent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consent_version: consent.version,
        language: typeof document !== "undefined" ? document.documentElement.lang || "en" : "en",
        necessary: true,
        analytics: consent.preferences.analytics,
        marketing: consent.preferences.marketing,
        sale_share_opt_out: consent.preferences.saleShareOptOut,
        global_privacy_control: consent.globalPrivacyControl,
        source_path: buildConsentSourcePath(),
      }),
    });
  } catch (error) {
    console.warn("Consent log request failed:", error);
  }
}

export function PublicConsentProvider({ children }) {
  const [consent, setConsent] = useState(getInitialConsentState);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(!consent.hasConsent);
  const previousAnalyticsEnabledRef = useRef(false);
  const analyticsBootstrapTrackedRef = useRef(false);

  const persistConsent = (nextConsent) => {
    setConsent(nextConsent);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextConsent));
    }
    logConsentRecord(nextConsent);
  };

  const acceptAll = () => {
    const next = {
      hasConsent: true,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
      globalPrivacyControl: detectGpc(),
      preferences: {
        necessary: true,
        analytics: true,
        marketing: detectGpc() ? false : true,
        saleShareOptOut: detectGpc(),
      },
    };

    persistConsent(next);
    setIsBannerOpen(false);
    setIsPreferencesOpen(false);
  };

  const rejectAll = () => {
    const next = {
      hasConsent: true,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
      globalPrivacyControl: detectGpc(),
      preferences: {
        necessary: true,
        analytics: false,
        marketing: false,
        saleShareOptOut: true,
      },
    };

    persistConsent(next);
    setIsBannerOpen(false);
    setIsPreferencesOpen(false);
  };

  const savePreferences = (prefs) => {
    const globalPrivacyControl = detectGpc();
    const saleShareOptOut = globalPrivacyControl ? true : Boolean(prefs.saleShareOptOut);
    const marketing = saleShareOptOut ? false : Boolean(prefs.marketing);

    const next = {
      hasConsent: true,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
      globalPrivacyControl,
      preferences: {
        necessary: true,
        analytics: Boolean(prefs.analytics),
        marketing,
        saleShareOptOut,
      },
    };

    persistConsent(next);
    setIsBannerOpen(false);
    setIsPreferencesOpen(false);
  };

  const openPreferences = () => {
    setIsPreferencesOpen(true);
    setIsBannerOpen(false);
  };
  const closePreferences = () => {
    setIsPreferencesOpen(false);
    if (!consent.hasConsent) setIsBannerOpen(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__evolvianConsent = consent;
    }
  }, [consent]);

  useEffect(() => {
    let cancelled = false;
    const analyticsEnabled = Boolean(consent.preferences.analytics);
    const shouldReplayCurrentPageView =
      analyticsEnabled && (!analyticsBootstrapTrackedRef.current || !previousAnalyticsEnabledRef.current);

    async function syncConsent() {
      await syncThirdPartyConsent(consent);

      if (!cancelled && shouldReplayCurrentPageView) {
        const currentPath = typeof window !== "undefined" ? `${window.location.pathname}${window.location.search || ""}` : "/";
        trackPageView(currentPath);
        analyticsBootstrapTrackedRef.current = true;
      }

      previousAnalyticsEnabledRef.current = analyticsEnabled;
    }

    syncConsent();

    return () => {
      cancelled = true;
    };
  }, [consent]);

  const contextValue = useMemo(
    () => ({
      consent,
      isBannerOpen,
      isPreferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
    }),
    [consent, isBannerOpen, isPreferencesOpen]
  );

  return <PublicConsentContext.Provider value={contextValue}>{children}</PublicConsentContext.Provider>;
}

export function usePublicConsent() {
  return useContext(PublicConsentContext);
}

export const PUBLIC_CONSENT_VERSION = CONSENT_VERSION;
