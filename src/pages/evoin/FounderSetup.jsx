import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./evoin-tokens.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8001";

const DEPTH_OPTIONS = [
  { value: 6, label: "Exploratoria", time: "~10 min" },
  { value: 10, label: "Estándar", time: "~20 min" },
  { value: 15, label: "Profunda", time: "~30 min" },
];

export default function FounderSetup() {
  const navigate = useNavigate();
  const [hypothesis, setHypothesis] = useState("");
  const [segment, setSegment] = useState("");
  const [depth, setDepth] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!hypothesis.trim() || !segment.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const founderToken = localStorage.getItem("evoin_founder_token") || null;
      const res = await fetch(`${API}/api/evoin/interviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hypothesis, segment, depth, founder_token: founderToken }),
      });
      if (!res.ok) throw new Error("Error al generar la entrevista");
      const data = await res.json();
      localStorage.setItem("evoin_founder_token", data.founder_token);
      navigate(`/evoin/dashboard`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--ei-bg)", padding: "40px 16px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--ei-green-50)", color: "var(--ei-green-800)", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 20, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ei-green-600)", display: "inline-block" }} />
            EvoIn · Discovery Agent
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "var(--ei-text)", marginBottom: 6 }}>Nueva entrevista</h1>
          <p style={{ fontSize: 14, color: "var(--ei-text-2)" }}>Define tu hipótesis y el segmento — la IA genera las preguntas Mom Test automáticamente.</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Hypothesis card */}
          <div style={cardStyle}>
            <div style={labelStyle}>Tu hipótesis de producto</div>
            <div style={{ marginBottom: 16 }}>
              <label style={fieldLabelStyle}>¿Qué problema crees que resuelve tu idea?</label>
              <p style={{ fontSize: 12, color: "var(--ei-text-3)", marginBottom: 8 }}>Sé específico. La IA nunca mencionará esto en las preguntas.</p>
              <textarea
                value={hypothesis}
                onChange={e => setHypothesis(e.target.value)}
                placeholder="Ej: Los doctores pierden demasiado tiempo respondiendo mensajes de pacientes en lugar de dar consultas..."
                rows={3}
                required
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={fieldLabelStyle}>Segmento a entrevistar</label>
              <input
                value={segment}
                onChange={e => setSegment(e.target.value)}
                placeholder="Ej: Doctores particulares, dueños de clínicas"
                required
                style={inputStyle}
              />
            </div>
          </div>

          {/* Depth card */}
          <div style={cardStyle}>
            <div style={labelStyle}>Profundidad de entrevista</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {DEPTH_OPTIONS.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setDepth(opt.value)}
                  style={{
                    border: `1.5px solid ${depth === opt.value ? "var(--ei-text)" : "var(--ei-border)"}`,
                    borderRadius: "var(--ei-radius-sm)",
                    padding: "14px 10px",
                    textAlign: "center",
                    background: depth === opt.value ? "var(--ei-surface)" : "var(--ei-surface-2)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <span style={{ fontSize: 22, fontWeight: 700, display: "block", color: "var(--ei-text)" }}>{opt.value}</span>
                  <span style={{ fontSize: 12, color: depth === opt.value ? "var(--ei-text)" : "var(--ei-text-2)", fontWeight: depth === opt.value ? 700 : 400 }}>{opt.label}</span>
                  <span style={{ fontSize: 11, color: "var(--ei-text-3)", display: "block" }}>{opt.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info card */}
          <div style={{ ...cardStyle, background: "var(--ei-blue-50)", border: "1px solid #C5DCED" }}>
            <div style={{ ...labelStyle, color: "var(--ei-blue-800)" }}>Cómo funciona</div>
            <p style={{ fontSize: 13, color: "var(--ei-blue-800)", lineHeight: 1.6 }}>
              La IA genera las preguntas siguiendo la metodología Mom Test — nunca mencionará tu producto. Recibirás un link único para compartir con tu segmento por WhatsApp, email o LinkedIn.
            </p>
          </div>

          {error && (
            <div style={{ background: "var(--ei-coral-50)", border: "1px solid var(--ei-coral-600)", borderRadius: "var(--ei-radius-sm)", padding: "12px 16px", fontSize: 13, color: "var(--ei-coral-800)", marginBottom: 12 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !hypothesis.trim() || !segment.trim()}
            style={{
              width: "100%",
              background: loading ? "var(--ei-text-3)" : "var(--ei-text)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--ei-radius-sm)",
              padding: "14px",
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}
          >
            {loading ? "Generando preguntas..." : "Generar preguntas y crear link →"}
          </button>
        </form>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "var(--ei-surface)",
  border: "1px solid var(--ei-border)",
  borderRadius: "var(--ei-radius-md)",
  padding: "20px 22px",
  marginBottom: 12,
};
const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--ei-text-3)",
  textTransform: "uppercase",
  letterSpacing: ".07em",
  marginBottom: 14,
};
const fieldLabelStyle = {
  fontSize: 13,
  color: "var(--ei-text-2)",
  fontWeight: 600,
  display: "block",
  marginBottom: 6,
};
const textareaStyle = {
  width: "100%",
  background: "var(--ei-surface-2)",
  border: "1px solid var(--ei-border)",
  borderRadius: "var(--ei-radius-sm)",
  padding: "11px 13px",
  fontSize: 14,
  color: "var(--ei-text)",
  fontFamily: "inherit",
  resize: "none",
  boxSizing: "border-box",
};
const inputStyle = {
  width: "100%",
  background: "var(--ei-surface-2)",
  border: "1px solid var(--ei-border)",
  borderRadius: "var(--ei-radius-sm)",
  padding: "11px 13px",
  fontSize: 14,
  color: "var(--ei-text)",
  fontFamily: "inherit",
  boxSizing: "border-box",
};
