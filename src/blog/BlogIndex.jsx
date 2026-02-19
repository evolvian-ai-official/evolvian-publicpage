import React from "react";
import { Link } from "react-router-dom";
import posts from "./posts/posts-index.json";
import { trackEvent } from "../utils/tracking";
import BlogChrome from "./BlogChrome";

export default function BlogIndex() {
  return (
    <BlogChrome>
      <main className="blog-page">
        <section className="blog-hero">
          <div className="section-shell blog-hero-inner">
            <p className="blog-kicker">Evolvian Blog</p>
            <h1>Guides and insights to help you launch AI assistants that convert</h1>
            <p>
              Explore practical tutorials, implementation ideas, and product updates to scale support, sales, and
              customer conversations.
            </p>
            <a
              href="https://www.evolvianai.net/register"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
              onClick={() => trackEvent({ name: "Register_Click_From_BlogIndex", category: "Blog" })}
            >
              Create your Evolvian Assistant
            </a>
          </div>
        </section>

        <section className="section-base">
          <div className="section-shell blog-grid">
            <div className="blog-main-column">
              <div className="blog-breadcrumb">
                <a href="/" onClick={() => trackEvent({ name: "Breadcrumb_Home_Click", category: "Blog" })}>
                  Home
                </a>
                <span>/</span>
                <span>Blog</span>
              </div>

              <div className="blog-post-list">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    onClick={() => trackEvent({ name: "Blog_Open_Post", category: "Blog", label: post.slug })}
                    className="blog-post-card card-lift"
                  >
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span>Read article</span>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="blog-aside">
              <article className="blog-aside-card card-lift">
                <img
                  src="/loginstorytelling4.png"
                  alt="Evolvian AI workflow preview"
                  onClick={() => trackEvent({ name: "Blog_Sidebar_Image1_Click", category: "Blog" })}
                />
                <h3>Need help implementing this in your business?</h3>
                <p>Send us your use case and we will propose the best setup for your channels and team.</p>
                <a href="/#contact" onClick={() => trackEvent({ name: "Blog_Aside_Contact_Click", category: "Blog" })}>
                  Talk to the team
                </a>
              </article>
            </aside>
          </div>
        </section>
      </main>
    </BlogChrome>
  );
}
