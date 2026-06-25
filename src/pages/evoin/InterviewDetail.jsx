import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./evoin-tokens.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8001";

const SIGNAL_STYLES = {
  pain:  { bg: "var(--ei-coral-50)",  color: "var(--ei-coral-800)",  dot: "var(--ei-coral-600)",  emoji: "🔴", label: "Pain real" },
  job:   { bg: "var(--ei-green-50)",  color: "var(--ei-green-800)",  dot: "var(--ei-green-600)",  emoji: "✅", label: "Job-to-be-done" },
  buy:   { bg: "var(--ei-blue-50)",   color: "var(--ei-blue-800)",   dot: "var(--ei-blue-600)",   emoji: "💡", label: "Señal de compra" },
  quote: { bg: "var(--ei-purple-50)", color: "var(--ei-purple-800)", dot: "var(--ei-purple-600)", emoji: "💬", label: "Quote clave" },
  warn:  { bg: "var(--ei-amber-50)",  color: "var(--ei-amber-800)",  dot: "var(--ei-amber-600)",  emoji: "⚠️", label: "Alerta" },
};

const HYPOTHESIS_STATUS = {
  validates:    { bg: "var(--ei-green-50)",  color: "var(--ei-green-800)",  label: "Hipótesis validada" },
  invalidates:  { bg: "var(--ei-coral-50)",  color: "var(--ei-coral-800)",  label: "Hipótesis invalidada" },
  pivot_needed: { bg: "var(--ei-amber-50)",  color: "var(--ei-amber-800)",  label: "Hipótesis requiere pivote" },
  validated:    { bg: "var(--ei-green-50)",  color: "var(--ei-green-800)",  label: "Hipótesis validada" },
  invalidated:  { bg: "var(--ei-coral-50)",  color: "var(--ei-coral-800)",  label: "Hipótesis invalidada" },
};

export default function InterviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const founderToken = localStorage.getItem("evoin_founder_token");

  useEffect(() => {
    if (!founderToken) { navigate("/evoin"); return; }
    fetch(`${API}/api/evoin/interviews/${id}?founder_token=${founderToken}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id, founderToken, navigate]);

  async function runAggregateAnalysis() {
    setAnalyzing(true);
    try {
      const res = await fetch(`${API}/api/evoin/interviews/${id}/analyze?founder_token=${founderToken}`, { method: "POST" });
      const d = await res.json();
      if (res.ok) {
        setData(prev => ({ ...prev, analyses: [d.analysis, ...(prev.analyses || [])] }));
      }
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--ei-text-3)", fontFamily: "inherit" }}>Cargando...</div>;
  if (!data) return null;

  const { interview, sessions, analyses } = data;
  const completed = (sessions || []).filter(s => s.completed_at);
  const aggregateAnalysis = (analyses || []).find(a => a.type === "aggregate");
  const individualAnalyses = (analyses || []).filter(a => a.type === "individual");

  const shareUrl = `${window.location.origin}/i/${interview.id}`;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ei-bg)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "var(--ei-surface)", borderBottom: "1px solid var(--ei-border)", padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link to="/evoin/dashboard" style={{ fontSize: 13, color: "var(--ei-text-3)", textDecoration: "none" }}>← Dashboard</Link>
        <span style={{ color: "var(--ei-border)" }}>|</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ei-text)" }}>{interview.segment}</span>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 16px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--ei-green-800)", background: "var(--ei-green-50)", fontWeight: 700, padding: "4px 12px", borderRadius: 20, marginBottom: 10, display: "inline-block" }}>
              {completed.length} entrevista{completed.length !== 1 ? "s" : ""} completada{completed.length !== 1 ? "s" : ""}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--ei-text)", marginBottom: 4 }}>{interview.segment}</h2>
            <p style={{ fontSize: 13, color: "var(--ei-text-2)", maxWidth: 500, lineHeight: 1.5 }}>{interview.hypothesis}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              style={{ background: "var(--ei-surface)", border: "1px solid var(--ei-border)", borderRadius: "var(--ei-radius-sm)", padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              Copiar link
            </button>
            {completed.length >= 2 && (
              <button
                onClick={runAggregateAnalysis}
                disabled={analyzing}
                style={{ background: analyzing ? "var(--ei-text-3)" : "var(--ei-text)", color: "#fff", border: "none", borderRadius: "var(--ei-radius-sm)", padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: analyzing ? "not-allowed" : "pointer", fontFamily: "inherit" }}
              >
                {analyzing ? "Analizando..." : "Analizar todo →"}
              </button>
            )}
          </div>
        </div>

        {/* Stat grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Entrevistas", value: `${completed.length} / ${(sessions || []).length}` },
            aggregateAnalysis && { label: "Pain confirmado", value: `${aggregateAnalysis.result.pain_confirmed_count ?? "—"} / ${completed.length}`, color: "var(--ei-coral-800)" },
            aggregateAnalysis && { label: "Ya pagan", value: `${aggregateAnalysis.result.already_paying_count ?? "—"} / ${completed.length}`, color: "var(--ei-green-800)" },
            aggregateAnalysis?.result.avg_spend && { label: "Gasto promedio", value: aggregateAnalysis.result.avg_spend },
          ].filter(Boolean).map((s, i) => (
            <div key={i} style={{ background: "var(--ei-surface-2)", borderRadius: "var(--ei-radius-sm)", padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "var(--ei-text-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color || "var(--ei-text)" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Aggregate analysis */}
        {aggregateAnalysis && (
          <div style={{ background: "var(--ei-surface)", border: "1px solid var(--ei-border)", borderRadius: "var(--ei-radius-md)", padding: "18px 20px", marginBottom: 14 }}>
            <div style={sectionLabelStyle}>Análisis agregado · IA</div>

            {/* Hypothesis banner */}
            {(() => {
              const s = HYPOTHESIS_STATUS[aggregateAnalysis.result.hypothesis_status] || HYPOTHESIS_STATUS.pivot_needed;
              return (
                <div style={{ background: s.bg, borderRadius: "var(--ei-radius-sm)", padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: s.color, lineHeight: 1.5 }}>{aggregateAnalysis.result.hypothesis_evidence}</div>
                  {aggregateAnalysis.result.pivot_suggestion && (
                    <div style={{ fontSize: 12, color: s.color, marginTop: 6, opacity: .85 }}>Pivote sugerido: {aggregateAnalysis.result.pivot_suggestion}</div>
                  )}
                </div>
              );
            })()}

            {/* Signals */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "var(--ei-text-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Señales detectadas</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(aggregateAnalysis.result.patterns || []).map((p, i) => {
                  const st = SIGNAL_STYLES[p.signal_type] || SIGNAL_STYLES.warn;
                  return (
                    <span key={i} style={{ background: st.bg, color: st.color, fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 5 }}>
                      {st.emoji} {p.text} {p.count && `(${p.count}/${p.total})`}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* WTP */}
            {aggregateAnalysis.result.wtp_estimate && (
              <div style={{ background: "var(--ei-green-50)", borderRadius: "var(--ei-radius-sm)", padding: "10px 14px", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ei-green-800)", marginBottom: 3 }}>Willingness to pay estimado</div>
                <div style={{ fontSize: 13, color: "var(--ei-green-800)" }}>{aggregateAnalysis.result.wtp_estimate}</div>
              </div>
            )}

            {/* Next actions */}
            {(aggregateAnalysis.result.next_actions || []).length > 0 && (
              <div>
                <div style={{ fontSize: 11, color: "var(--ei-text-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Próximas acciones recomendadas</div>
                {aggregateAnalysis.result.next_actions.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--ei-text)", lineHeight: 1.5, marginBottom: 8 }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--ei-surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--ei-text-2)", flexShrink: 0 }}>{i + 1}</span>
                    {a}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sessions list */}
        <div style={{ background: "var(--ei-surface)", border: "1px solid var(--ei-border)", borderRadius: "var(--ei-radius-md)", padding: "18px 20px", marginBottom: 14 }}>
          <div style={sectionLabelStyle}>Entrevistas ({(sessions || []).length})</div>
          {(sessions || []).length === 0 && (
            <p style={{ fontSize: 13, color: "var(--ei-text-3)" }}>
              Aún no hay respuestas. Comparte este link: <code style={{ background: "var(--ei-surface-2)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>{shareUrl}</code>
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(sessions || []).map((s, i) => {
              const indAnalysis = individualAnalyses.find(a => a.session_id === s.id);
              const isSelected = selectedSession === s.id;
              return (
                <div key={s.id}>
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "var(--ei-surface-2)", borderRadius: "var(--ei-radius-sm)", cursor: "pointer" }}
                    onClick={() => setSelectedSession(isSelected ? null : s.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--ei-purple-50)", color: "var(--ei-purple-800)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ei-text)" }}>Entrevistado {i + 1}</div>
                        <div style={{ fontSize: 11, color: "var(--ei-text-3)" }}>{(s.responses || []).length} respuestas · {s.completed_at ? "Completada" : "En progreso"}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: s.completed_at ? "var(--ei-green-50)" : "var(--ei-amber-50)", color: s.completed_at ? "var(--ei-green-800)" : "var(--ei-amber-800)" }}>
                      {s.completed_at ? "Completada" : "En progreso"}
                    </span>
                  </div>

                  {isSelected && indAnalysis && (
                    <div style={{ background: "var(--ei-surface)", border: "1px solid var(--ei-border)", borderRadius: "var(--ei-radius-sm)", padding: "16px", marginTop: 4 }}>
                      <p style={{ fontSize: 13, color: "var(--ei-text)", lineHeight: 1.65, marginBottom: 12 }}>{indAnalysis.result.summary}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                        {(indAnalysis.result.signals || []).map((sig, j) => {
                          const st = SIGNAL_STYLES[sig.type] || SIGNAL_STYLES.warn;
                          return (
                            <span key={j} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: st.bg, color: st.color, fontWeight: 600 }}>
                              {st.emoji} {sig.text}
                            </span>
                          );
                        })}
                      </div>
                      {indAnalysis.result.wtp_estimate && (
                        <p style={{ fontSize: 12, color: "var(--ei-green-800)", background: "var(--ei-green-50)", padding: "8px 12px", borderRadius: "var(--ei-radius-sm)" }}>
                          WTP estimado: {indAnalysis.result.wtp_estimate}
                        </p>
                      )}
                    </div>
                  )}

                  {isSelected && !indAnalysis && s.completed_at && (
                    <div style={{ padding: "12px 16px", fontSize: 13, color: "var(--ei-text-3)", background: "var(--ei-surface-2)", borderRadius: "var(--ei-radius-sm)", marginTop: 4 }}>
                      Análisis individual en proceso...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!aggregateAnalysis && completed.length >= 2 && (
          <div style={{ background: "var(--ei-blue-50)", border: "1px solid #C5DCED", borderRadius: "var(--ei-radius-md)", padding: "16px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "var(--ei-blue-800)", marginBottom: 10 }}>
              Tienes {completed.length} entrevistas completadas — ya puedes ver el análisis agregado de patrones, willingness to pay y validación de hipótesis.
            </p>
            <button
              onClick={runAggregateAnalysis}
              disabled={analyzing}
              style={{ background: "var(--ei-blue-800)", color: "#fff", border: "none", borderRadius: "var(--ei-radius-sm)", padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: analyzing ? "not-allowed" : "pointer", fontFamily: "inherit" }}
            >
              {analyzing ? "Analizando..." : "Ver análisis agregado →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const sectionLabelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--ei-text-3)",
  textTransform: "uppercase",
  letterSpacing: ".06em",
  marginBottom: 14,
};
