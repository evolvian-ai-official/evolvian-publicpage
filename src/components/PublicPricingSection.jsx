import React from "react";
import { trackEvent } from "../utils/tracking";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const FALLBACK_PLAN_PRICES = {
  free: "$0 USD/mo",
  starter: "$19 USD/mo",
  premium: "$49 USD/mo",
  white_label: null,
};

function formatMonthlyPrice(priceUsd) {
  const price = Number(priceUsd);
  if (!Number.isFinite(price)) return null;
  return Number.isInteger(price) ? `$${price.toFixed(0)} USD/mo` : `$${price.toFixed(2)} USD/mo`;
}

export default function PublicPricingSection({
  copy,
  language,
  id = "plans",
  sectionClassName = "section-base section-muted",
}) {
  const [planPrices, setPlanPrices] = React.useState(FALLBACK_PLAN_PRICES);

  const planCards = React.useMemo(
    () => [
      {
        id: "free",
        title: "Free",
        description: copy.descriptions.free,
        highlights: copy.highlights.free,
        ctaLabel: copy.ctas.free,
        ctaHref: "https://www.evolvianai.net/login",
        ctaEvent: "StartForFree_Click",
        theme: "soft",
      },
      {
        id: "starter",
        title: "Starter",
        description: copy.descriptions.starter,
        highlights: copy.highlights.starter,
        ctaLabel: copy.ctas.starter,
        ctaHref: "https://www.evolvianai.net/settings",
        ctaEvent: "StarterPlan_Click",
        theme: "dark",
      },
      {
        id: "premium",
        title: "Premium",
        description: copy.descriptions.premium,
        highlights: copy.highlights.premium,
        ctaLabel: copy.ctas.premium,
        ctaHref: "https://www.evolvianai.net/settings",
        ctaEvent: "PremiumPlan_Click",
        theme: "premium",
        badge: copy.mostPopular,
      },
      {
        id: "white_label",
        title: "White Label",
        description: copy.descriptions.white_label,
        highlights: copy.highlights.white_label,
        ctaLabel: copy.ctas.white_label,
        ctaHref: "#contact",
        ctaEvent: "WhiteLabel_Click",
        theme: "soft",
        customPrice: copy.customPriceLabel || "Custom",
      },
    ],
    [copy]
  );

  React.useEffect(() => {
    let cancelled = false;

    const loadPlanPrices = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/public/plans`);
        if (!res.ok) throw new Error(`status ${res.status}`);

        const data = await res.json();
        const nextPrices = { ...FALLBACK_PLAN_PRICES };

        for (const plan of data?.plans || []) {
          const rawId = String(plan?.id || "").trim().toLowerCase();
          const planId = rawId === "enterprise" ? "white_label" : rawId;
          if (!planId || planId === "white_label") continue;

          const formatted = formatMonthlyPrice(plan?.price_usd);
          if (formatted) nextPrices[planId] = formatted;
        }

        if (!cancelled) setPlanPrices(nextPrices);
      } catch (error) {
        console.error("Failed to load public plan prices:", error);
      }
    };

    loadPlanPrices();

    return () => {
      cancelled = true;
    };
  }, []);

  const getPlanPrice = (planId) => planPrices[planId] ?? FALLBACK_PLAN_PRICES[planId] ?? null;

  return (
    <section id={id} className={sectionClassName}>
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-kicker">{copy.kicker}</p>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>

        <div className="plan-grid">
          {planCards.map((plan) => {
            const price = plan.customPrice || getPlanPrice(plan.id);
            const cardClass = `plan-card card-lift ${plan.theme === "premium" ? "plan-card-premium" : ""}`;

            return (
              <article key={plan.id} className={cardClass}>
                <div>
                  <div className="plan-header">
                    <h3>{plan.title}</h3>
                    {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
                  </div>
                  <p className="plan-price">{price || copy.customPriceLabel || "Custom"}</p>
                  <p className="plan-description">{plan.description}</p>
                  <ul>
                    {plan.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plan.ctaHref}
                  target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={plan.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`btn ${plan.theme === "premium" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => trackEvent({ name: plan.ctaEvent, category: "Pricing", label: `${plan.title}_${language}` })}
                >
                  {plan.ctaLabel}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
