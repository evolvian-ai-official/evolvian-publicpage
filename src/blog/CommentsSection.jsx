// 💬 CommentsSection.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentsSection({ slug }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/blog/comments?slug=${slug}`)
      .then((res) => setComments(res.data.comments || []))
      .catch((err) => console.error("Error loading comments:", err));
  }, [slug]);

  if (!comments.length)
    return (
      <p className="mt-12 text-sm text-gray-400">Sé el primero en comentar ✨</p>
    );

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4 text-a3d9b1">Comentarios</h3>
      {comments.map((c) => (
        <div
          key={c.id}
          className="border border-gray-700 rounded-xl p-4 mb-3 bg-[#1b2a41]"
        >
          <p className="text-gray-300 mb-1">{c.comment}</p>
          <p className="text-xs text-gray-500">
            — {c.name} ({new Date(c.created_at).toLocaleDateString()})
          </p>
        </div>
      ))}
    </div>
  );
}
