const GA4_ID = import.meta.env.VITE_GA4_ID || "G-44VLLPV4F5";
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || "AW-17638350094";
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "805104092211918";

let googleInitialized = false;
let metaInitialized = false;

function addScriptOnce(id, src) {
  if (typeof document === "undefined") return Promise.resolve();

  const existing = document.getElementById(id);
  if (existing) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}

async function ensureGoogleTag() {
  if (googleInitialized || typeof window === "undefined") return;

  await addScriptOnce("evolvian-gtag", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  window.gtag("config", GA4_ID, { send_page_view: false, anonymize_ip: true });
  window.gtag("config", GOOGLE_ADS_ID, { send_page_view: false });
  googleInitialized = true;
}

async function ensureMetaPixel() {
  if (metaInitialized || typeof window === "undefined") return;

  if (!window.fbq) {
    window.fbq = function fbq() {
      if (window.fbq.callMethod) {
        window.fbq.callMethod.apply(window.fbq, arguments);
      } else {
        window.fbq.queue.push(arguments);
      }
    };
    window._fbq = window.fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = [];
  }

  await addScriptOnce("evolvian-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", META_PIXEL_ID);
  window.fbq("consent", "revoke");
  metaInitialized = true;
}

function updateGoogleConsent({ analytics, marketing }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });
}

function updateMetaConsent(marketing) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("consent", marketing ? "grant" : "revoke");
}

export async function syncThirdPartyConsent(consent) {
  try {
    const analytics = Boolean(consent?.preferences?.analytics);
    const marketing = Boolean(consent?.preferences?.marketing) && !Boolean(consent?.preferences?.saleShareOptOut);
    const needsGoogle = analytics || marketing;

    if (needsGoogle) {
      await ensureGoogleTag();
      updateGoogleConsent({ analytics, marketing });
    } else if (googleInitialized) {
      updateGoogleConsent({ analytics: false, marketing: false });
    }

    if (marketing) {
      await ensureMetaPixel();
      updateMetaConsent(true);
    } else if (metaInitialized) {
      updateMetaConsent(false);
    }
  } catch (error) {
    console.warn("Failed to sync third-party consent:", error);
  }
}
