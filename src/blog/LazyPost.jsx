// src/blog/LazyPost.jsx
import React, { Suspense } from "react";

export default function LazyPost({ slug }) {
  const Post = React.lazy(() =>
    import(`./posts/${slug}.mdx`).catch(() => ({
      default: () => (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <p>🕮 Post not found or in preparation.</p>
        </div>
      ),
    }))
  );

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Post />
    </Suspense>
  );
}
