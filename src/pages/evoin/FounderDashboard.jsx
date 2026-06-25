import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./evoin-tokens.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8001";

const STATUS_COLORS = {
  active: { bg: "var(--ei-green-50)", color: "var(--ei-green-800)", label: "Activa" },
  closed: { bg: "var(--ei-surface-2)", color: "var(--ei-text-3)", label: "Cerrada" },
};

export default function FounderDashboard() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const founderToken = localStorage.getItem("evoin_founder_token");

  useEffect(() => {
    if (!founderToken) { navigate("/evoin"); return; }
    fetch(`${API}/api/evoin/interviews?founder_token=${founderToken}`)
      .then(r => r.json())
      .then(d => { setInterviews(d.interviews || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [founderToken, navigate]);

  function copyLink(interviewId) {
    const url = `${window.location.origin}/i/${interviewId}`;
    navigator.clipboard.writeText(url);
  }

  function completedCount(interview) {
    return (interview.evoin_sessions || []).filter(s => s.completed_at).length;
  }

  function totalCount(interview) {
    return (interview.evoin_sessions || []).length;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--ei-bg)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "var(--ei-surface)", borderBottom: "1px solid var(--ei-border)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ei-green-600)", display: "inline-block" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ei-text)" }}>EvoIn</span>
          <span style={{ fontSize: 13, color: "var(--ei-text-3)" }}>Discovery Agent</span>
        </div>
        <button
          onClick={() => navigate("/evoin")}
          style={{ background: "var(--ei-text)", color: "#fff", border: "none", borderRadius: "var(--ei-radius-sm)", padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
        >
          + Nueva entrevista
        </button>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--ei-text)", marginBottom: 4 }}>Tus entrevistas</h2>
        <p style={{ fontSize: 14, color: "var(--ei-text-2)", marginBottom: 24 }}>Comparte el link con tu segmento para recibir respuestas de forma asíncrona.</p>

        {loading && <p style={{ color: "var(--ei-text-3)", fontSize: 14 }}>Cargando...</p>}

        {!loading && interviews.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ei-text-3)" }}>
            <p style={{ fontSize: 15, marginBottom: 16 }}>Aún no tienes entrevistas.</p>
            <button onClick={() => navigate("/evoin")} style={{ background: "var(--ei-text)", color: "#fff", border: "none", borderRadius: "var(--ei-radius-sm)", padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Crear primera entrevista →
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {interviews.map(iv => {
            const done = completedCount(iv);
            const total = totalCount(iv);
            const statusStyle = STATUS_COLORS[iv.status] || STATUS_COLORS.active;
            return (
              <div key={iv.id} style={{ background: "var(--ei-surface)", border: "1px solid var(--ei-border)", borderRadius: "var(--ei-radius-md)", padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, color: "var(--ei-text-3)", marginBottom: 4 }}>{iv.segment}</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ei-text)", lineHeight: 1.4, marginBottom: 10 }}>{iv.hypothesis}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, background: statusStyle.bg, color: statusStyle.color, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{statusStyle.label}</span>
                      <span style={{ fontSize: 12, color: "var(--ei-text-3)" }}>{iv.depth} preguntas</span>
                      <span style={{ fontSize: 12, color: "var(--ei-text-2)", fontWeight: 600 }}>{done} completadas / {total} iniciadas</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => copyLink(iv.id)}
                      style={{ background: "var(--ei-surface-2)", border: "1px solid var(--ei-border)", borderRadius: "var(--ei-radius-sm)", padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "var(--ei-text)", fontFamily: "inherit" }}
                    >
                      Copiar link
                    </button>
                    <Link
                      to={`/evoin/interview/${iv.id}`}
                      style={{ background: "var(--ei-text)", color: "#fff", textDecoration: "none", borderRadius: "var(--ei-radius-sm)", padding: "8px 14px", fontSize: 12, fontWeight: 600 }}
                    >
                      Ver insights →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
