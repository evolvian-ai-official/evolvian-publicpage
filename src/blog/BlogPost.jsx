import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { trackConversion, trackEvent } from "../utils/tracking";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const INITIAL_FORM = {
  name: "",
  email: "",
  comment: "",
  wants_news: false,
  accept_privacy: false,
  accepted_terms: false,
  phone: "",
};

export default function BlogPost() {
  const { slug } = useParams();

  const [comments, setComments] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState({ type: "idle", message: "" });

  const Post = useMemo(
    () =>
      React.lazy(() =>
        import(`./posts/${slug}.mdx`).catch(() => ({
          default: () => <p className="blog-post-not-found">Post not found or coming soon.</p>,
        }))
      ),
    [slug]
  );

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/blog/comments?slug=${slug}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Comments could not be loaded.");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (slug) fetchComments();
  }, [slug]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "idle", message: "" });

    if (!form.accept_privacy) {
      setFeedback({ type: "warning", message: "You must accept the Privacy Policy." });
      return;
    }

    if (!form.accepted_terms) {
      setFeedback({ type: "warning", message: "You must accept the Terms & Conditions." });
      return;
    }

    setSubmitting(true);
    trackEvent({ name: "Blog_Comment_Attempt", category: "Blog", label: slug || "unknown" });

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

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        trackEvent({ name: "Blog_Comment_Error", category: "Blog", label: slug || "unknown" });
        setFeedback({ type: "error", message: data.detail || "Error submitting the comment." });
        return;
      }

      trackEvent({ name: "Blog_Comment_Submit", category: "Blog", label: slug || "unknown" });
      trackConversion("Lead", {
        currency: "USD",
        value: 1,
        content_name: slug || "blog",
      });

      if (form.wants_news) {
        trackEvent({ name: "Blog_Newsletter_OptIn", category: "Blog", label: slug || "unknown" });
        trackConversion("Subscribe", { content_name: slug || "blog" });
      }

      setFeedback({ type: "success", message: "Comment submitted. It will appear after approval." });
      setForm(INITIAL_FORM);

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
    } catch (err) {
      console.error("Error submitting comment:", err);
      trackEvent({ name: "Blog_Comment_Error", category: "Blog", label: slug || "unknown" });
      setFeedback({ type: "error", message: "Error submitting the comment." });
    } finally {
      setSubmitting(false);
    }
  };

  const feedbackClass =
    feedback.type === "error"
      ? "status-error"
      : feedback.type === "warning"
      ? "status-warning"
      : "status-success";

  const submitDisabled =
    submitting ||
    !form.name.trim() ||
    !form.email.trim() ||
    !form.comment.trim() ||
    !form.accept_privacy ||
    !form.accepted_terms;

  return (
    <section className="blog-post-wrapper">
      <Suspense fallback={<p className="blog-post-loading">Loading article...</p>}>
        <article className="blog-post-article">
          <Post />
        </article>
      </Suspense>

      <div className="blog-divider" />

      <section className="blog-comments-section">
        <h3 className="blog-comments-heading">Comments ({comments.length})</h3>

        {loadingComments ? <p className="blog-comments-loading">Loading comments...</p> : null}
        {error ? <p className="status-message status-error">{error}</p> : null}

        <ul className="blog-comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="blog-comment-item">
              <p>{comment.comment}</p>
              <p className="blog-comment-meta">
                - {comment.name} <span>({new Date(comment.created_at).toLocaleDateString()})</span>
              </p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="blog-comment-form">
          <h3>Write your comment</h3>

          <input
            type="text"
            placeholder="Your name"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="form-control"
          />

          <input
            type="email"
            placeholder="Your email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="form-control"
          />

          <input
            type="text"
            placeholder="Your phone (optional)"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="form-control"
          />

          <textarea
            placeholder="Write your comment..."
            required
            value={form.comment}
            onChange={(event) => setForm({ ...form, comment: event.target.value })}
            className="form-control blog-textarea"
          />

          <label className="check-row">
            <input
              type="checkbox"
              checked={form.wants_news}
              onChange={(event) => setForm({ ...form, wants_news: event.target.checked })}
            />
            <span>I want to receive news and updates from Evolvian.</span>
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={form.accept_privacy}
              onChange={(event) => setForm({ ...form, accept_privacy: event.target.checked })}
              required
            />
            <span>
              I accept the{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={form.accepted_terms}
              onChange={(event) => setForm({ ...form, accepted_terms: event.target.checked })}
              required
            />
            <span>
              I accept the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
              .
            </span>
          </label>

          {feedback.message ? <p className={`status-message ${feedbackClass}`}>{feedback.message}</p> : null}

          <button type="submit" disabled={submitDisabled} className="btn btn-primary btn-large blog-submit-btn">
            {submitting ? "Sending..." : "Comment and subscribe"}
          </button>
        </form>
      </section>
    </section>
  );
}
