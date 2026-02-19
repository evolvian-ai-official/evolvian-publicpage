// utils/tracking.js

const GOOGLE_ADS_CONVERSION_ID = "AW-17638350094";
const GOOGLE_ADS_LEAD_LABEL = import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL || "";
const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS;
const CONSENT_STORAGE_KEY = "evolvian_public_consent_v1";

let lastPageViewPath = "";
let lastPageViewAt = 0;

function isLocalHost() {
  const hostname = globalThis?.location?.hostname || "";
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
}

function shouldTrack() {
  if (ENABLE_ANALYTICS === "false") return false;
  if (ENABLE_ANALYTICS === "true") return true;
  if (import.meta.env.DEV) return false;
  if (isLocalHost()) return false;
  return true;
}

function readConsent() {
  const runtime = globalThis?.__evolvianConsent;
  if (runtime && runtime.hasConsent) return runtime;

  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.hasConsent) return null;
    return parsed;
  } catch (error) {
    console.warn("Invalid consent state in storage:", error);
    return null;
  }
}

function isAnalyticsAllowed() {
  const consent = readConsent();
  return Boolean(consent?.preferences?.analytics);
}

function isMarketingAllowed() {
  const consent = readConsent();
  if (!consent) return false;
  return Boolean(consent?.preferences?.marketing) && !Boolean(consent?.preferences?.saleShareOptOut);
}

function shouldSkipDuplicatePageView(path) {
  const now = Date.now();
  if (lastPageViewPath === path && now - lastPageViewAt < 1200) return true;
  lastPageViewPath = path;
  lastPageViewAt = now;
  return false;
}

export function trackEvent({ name, category = "interaction", label = "", value = "" }) {
  try {
    if (!shouldTrack() || !isAnalyticsAllowed()) return;

    const gtagFn = globalThis?.gtag;
    const fbqFn = globalThis?.fbq;

    if (typeof gtagFn === "function") {
      gtagFn("event", name, {
        event_category: category,
        event_label: label,
        value,
      });
    }

    if (typeof fbqFn === "function") {
      fbqFn("trackCustom", name, { category, label, value });
    }
  } catch (error) {
    console.warn("Tracking error:", error);
  }
}

export function trackPageView(path = "") {
  try {
    if (!shouldTrack()) return;

    const safePath = path || globalThis?.location?.pathname || "/";
    if (shouldSkipDuplicatePageView(safePath)) return;

    const gtagFn = globalThis?.gtag;
    const fbqFn = globalThis?.fbq;
    const safeLocation = globalThis?.location?.href || "";
    const safeTitle = globalThis?.document?.title || "Evolvian";

    if (isAnalyticsAllowed() && typeof gtagFn === "function") {
      gtagFn("event", "page_view", {
        page_path: safePath,
        page_location: safeLocation,
        page_title: safeTitle,
      });
    }

    if (isMarketingAllowed() && typeof fbqFn === "function") {
      fbqFn("track", "PageView");
    }
  } catch (error) {
    console.warn("Page view tracking error:", error);
  }
}

export function trackConversion(type = "Lead", data = {}) {
  try {
    if (!shouldTrack()) return;

    const gtagFn = globalThis?.gtag;
    const fbqFn = globalThis?.fbq;
    const ga4EventName = type === "Lead" ? "generate_lead" : type;
    const analyticsAllowed = isAnalyticsAllowed();
    const marketingAllowed = isMarketingAllowed();

    if (analyticsAllowed && typeof gtagFn === "function") {
      gtagFn("event", ga4EventName, data);
    }

    if (marketingAllowed && typeof gtagFn === "function") {
      if (type === "Lead" && GOOGLE_ADS_LEAD_LABEL) {
        gtagFn("event", "conversion", {
          send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
          ...data,
        });
      } else {
        gtagFn("event", type, data);
      }
    }

    if (marketingAllowed && typeof fbqFn === "function") {
      fbqFn("track", type, data);
    }
  } catch (error) {
    console.warn("Conversion tracking error:", error);
  }
}
