import React from "react";
import { useParams } from "react-router-dom";
import { trackEvent } from "../utils/tracking";
import BlogPost from "./BlogPost";
import BlogChrome from "./BlogChrome";

export default function BlogLayout() {
  const { slug } = useParams();

  return (
    <BlogChrome>
      <main className="blog-page">
        <section className="section-base">
          <div className="section-shell blog-detail-shell">
            <div className="blog-breadcrumb">
              <a href="/" onClick={() => trackEvent({ name: "Breadcrumb_Home_Click", category: "Blog" })}>
                Home
              </a>
              <span>/</span>
              <a href="/blog" onClick={() => trackEvent({ name: "Breadcrumb_Blog_Click", category: "Blog" })}>
                Blog
              </a>
              <span>/</span>
              <span>{slug?.replace(/-/g, " ")}</span>
            </div>

            <BlogPost />
          </div>
        </section>
      </main>
    </BlogChrome>
  );
}
