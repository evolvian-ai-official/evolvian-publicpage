const VALID_VARIANTS = new Set(["generic", "healthcare"]);

export function getPublicLandingVariant() {
  const envVariant = String(
    import.meta.env.VITE_PUBLIC_PAGE_VARIANT || import.meta.env.VITE_PUBLIC_LANDING_VARIANT || "healthcare"
  ).toLowerCase();

  if (typeof window !== "undefined") {
    const override = new URLSearchParams(window.location.search).get("landing");
    if (override && VALID_VARIANTS.has(override.toLowerCase())) {
      return override.toLowerCase();
    }
  }

  return VALID_VARIANTS.has(envVariant) ? envVariant : "healthcare";
}
