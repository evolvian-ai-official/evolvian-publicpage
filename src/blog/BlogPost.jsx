// src/blog/BlogPost.jsx
import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();

  // ======== States ========
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    wants_news: false,
    accept_privacy: false,
    accepted_terms: false,
    phone: "",
  });

  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

  // ======== Load post ========
  const Post = useMemo(
  () =>
    React.lazy(() =>
      import(`./posts/${slug}.mdx`).catch(() => ({
        default: () => (
          <div style={{ textAlign: "center", marginTop: "100px", color: "#274472" }}>
            <p>🕮 Post not found or coming soon.</p>
          </div>
        ),
      }))
    ),
  [slug] // solo cambia cuando cambia el slug
);


  // ======== Fetch comments ========
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await fetch(`${API_BASE}/api/blog/comments?slug=${slug}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error("❌ Error fetching comments:", err);
      setError("Comments could not be loaded.");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (slug) fetchComments();
  }, [slug]);

  // ======== Submit comment ========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.accept_privacy) {
      setMessage("⚠️ You must accept the Privacy Policy.");
      return;
    }
    if (!form.accepted_terms) {
      setMessage("⚠️ You must accept the Terms & Conditions.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        post_slug: slug,
        name: form.name.trim(),
        email: form.email.trim(),
        comment: form.comment.trim(),
        wants_news: form.wants_news,
        accepted_privacy_policy: form.accept_privacy,
        accepted_terms: form.accepted_terms,
        phone: form.phone || null,
      };

      const res = await fetch(`${API_BASE}/api/blog/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Comment submitted. Pending approval.");

        setForm({
          name: "",
          email: "",
          comment: "",
          wants_news: false,
          accept_privacy: false,
          accepted_terms: false,
          phone: "",
        });

        // Local fallback preview
        if (window.location.origin.includes("localhost")) {
          setComments((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: payload.name,
              comment: payload.comment,
              created_at: new Date().toISOString(),
            },
          ]);
        } else {
          fetchComments();
        }
      } else {
        setMessage(data.detail || "❌ Error submitting the comment.");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setMessage("❌ Error submitting the comment.");
    } finally {
      setSubmitting(false);
    }
  };

  // ======== Render ========
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3rem 1rem",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* POST */}
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <article
          style={{
            background: "#FFFFFF",
            color: "#111",
            padding: "2.5rem",
            borderRadius: "18px",
            border: "1px solid #EDEDED",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <Post />
        </article>
      </Suspense>

      <div
        style={{
          height: "1px",
          background: "#EDEDED",
          margin: "3rem 0",
        }}
      />

      {/* COMMENTS */}
      <section>
        <h3
          style={{
            color: "#4A90E2",
            fontSize: "1.4rem",
            fontWeight: 700,
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          💬 Comments ({comments.length})
        </h3>

        {loadingComments && <p style={{ color: "#274472" }}>Loading…</p>}
        {error && <p style={{ color: "#F5A623" }}>{error}</p>}

        {/* LIST */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {comments.map((c) => (
            <li
              key={c.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #EDEDED",
                borderRadius: "14px",
                padding: "1.2rem",
                marginBottom: "1rem",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ color: "#111", marginBottom: "0.4rem" }}>{c.comment}</p>
              <p style={{ fontSize: "0.9rem", color: "#274472" }}>
                — {c.name}
                <span style={{ color: "#4A90E2" }}>
                  {" "}
                  ({new Date(c.created_at).toLocaleDateString()})
                </span>
              </p>
            </li>
          ))}
        </ul>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "2rem",
            background: "#FFFFFF",
            padding: "2rem",
            borderRadius: "18px",
            border: "1px solid #EDEDED",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h3 style={{ color: "#274472", marginBottom: "0.5rem", fontWeight: 700 }}>
            Write your comment
          </h3>

          <input
            type="text"
            placeholder="Your name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Your email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Your phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
          />

          <textarea
            placeholder="Write your comment…"
            required
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
          />

          <label style={{ fontSize: "0.95rem", color: "#111" }}>
            <input
              type="checkbox"
              checked={form.wants_news}
              onChange={(e) =>
                setForm({ ...form, wants_news: e.target.checked })
              }
              style={{ marginRight: "6px" }}
            />
            I want to receive news and updates from Evolvian.
          </label>

          <label style={{ fontSize: "0.95rem", color: "#111" }}>
            <input
              type="checkbox"
              checked={form.accept_privacy}
              onChange={(e) =>
                setForm({ ...form, accept_privacy: e.target.checked })
              }
              required
              style={{ marginRight: "6px" }}
            />
            I accept the{" "}
            <a href="/privacy" target="_blank" style={{ color: "#4A90E2" }}>
              Privacy Policy
            </a>
            .
          </label>

          <label style={{ fontSize: "0.95rem", color: "#111" }}>
            <input
              type="checkbox"
              checked={form.accepted_terms}
              onChange={(e) =>
                setForm({ ...form, accepted_terms: e.target.checked })
              }
              required
              style={{ marginRight: "6px" }}
            />
            I accept the{" "}
            <a href="/terms" target="_blank" style={{ color: "#4A90E2" }}>
              Terms & Conditions
            </a>
            .
          </label>

          <button
            type="submit"
            disabled={
              submitting ||
              !form.email.trim() ||
              !form.comment.trim() ||
              !form.accept_privacy ||
              !form.accepted_terms
            }
            style={{
              background:
                submitting ||
                !form.email.trim() ||
                !form.comment.trim() ||
                !form.accept_privacy ||
                !form.accepted_terms
                  ? "#9BBCE6"
                  : "#4A90E2",
              color: "#FFFFFF",
              padding: "12px 20px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor:
                submitting ||
                !form.email.trim() ||
                !form.comment.trim() ||
                !form.accept_privacy ||
                !form.accepted_terms
                  ? "not-allowed"
                  : "pointer",
              border: "none",
              opacity:
                submitting ||
                !form.name.trim() ||
                !form.email.trim() ||
                !form.comment.trim() ||
                !form.accept_privacy ||
                !form.accepted_terms
                  ? 0.7
                  : 1,
              transition: "0.15s ease-in-out",
            }}
          >
            {submitting ? "Sending…" : "Comment–Subscribe"}
          </button>

          {message && (
            <p
              style={{
                marginTop: "0.5rem",
                color: message.includes("✅") ? "#2EB39A" : "#F5A623",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

/* 🎨 INPUT STYLE (Evolvian Premium) */
const inputStyle = {
  padding: "12px",
  border: "1px solid #CFE1F7",
  borderRadius: "10px",
  fontSize: "1rem",
  color: "#111",
  background: "#FFFFFF",
};



