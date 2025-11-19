// 📰 BlogIndex.jsx — con Sidebar de Imágenes + Header y Footer de App.jsx
import React from "react";
import { Link } from "react-router-dom";
import posts from "./posts/posts-index.json";
import { trackEvent } from "../utils/tracking";

export default function BlogIndex() {
  return (
    <>
      {/* ⬆️ HEADER (copiado de App.jsx) */}
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <a href="/" onClick={() => trackEvent({ name: "Logo_Click" })}>
              <img
                src="/logo-evolvian.svg"
                alt="Evolvian logo"
                style={{ height: "40px" }}
              />
            </a>
          </div>

          <nav className="nav-links">
            <a href="/#plans" onClick={() => trackEvent({ name: "Nav_Services_Click" })}>
              Services
            </a>

            <a href="/#contact" onClick={() => trackEvent({ name: "Nav_Contact_Click" })}>
              Contact
            </a>

            <a href="/#about-us" onClick={() => trackEvent({ name: "Nav_About_Click" })}>
              About
            </a>

            <a href="/blog" onClick={() => trackEvent({ name: "Nav_Blog_Click" })}>
              Blog
            </a>
          </nav>

          <div
            className="header-cta"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <a
              href="https://www.evolvianai.net"
              target="_blank"
              rel="noopener noreferrer"
              className="login-button"
              onClick={() => trackEvent({ name: "Login_Click" })}
            >
              Log in
            </a>

            <a
              href="https://www.evolvianai.net/register"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ name: "Register_Click" })}
              style={{
                fontSize: "1rem",
                marginTop: "0.3rem",
                color: "#4a90e2",
                textDecoration: "underline",
                fontWeight: "500",
              }}
            >
              Register here
            </a>
          </div>
        </div>
      </header>

      {/* 📄 BLOG INDEX CONTENT — 2 Columns */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "80px auto",
          padding: "0 20px",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT COLUMN — Posts */}
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h1 style={{ fontSize: "2.4rem", marginBottom: "20px", color: "#274472" }}>
            Evolvian Blog
          </h1>

          <p style={{ fontSize: "1.1rem", marginBottom: "40px", color: "#555" }}>
            Explore guides, updates, tutorials and insights about AI assistants.
          </p>

            {/* 🍞 BREADCRUMB */}
            {/* 🍞 BREADCRUMB */}
        <div
          style={{
            fontSize: "0.95rem",
            marginBottom: "1.4rem",
            color: "#274472",
            fontWeight: 500,
          }}
        >
          <a
            href="/"
            onClick={() => trackEvent({ name: "Breadcrumb_Home_Click" })}
            style={{ color: "#274472", textDecoration: "none" }}
          >
            Home
          </a>
          {"  "}→{"  "}
          <span style={{ color: "#4a90e2" }}>Blog</span>
        </div>

          <div style={{ display: "grid", gap: "24px" }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                onClick={() => trackEvent({ name: "Blog_Open_Post", label: post.slug })}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #eee",
                  textDecoration: "none",
                  color: "#111",
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                  transition: "0.2s ease",
                }}
              >
                <h2
                  style={{
                    marginBottom: "10px",
                    fontSize: "1.5rem",
                    color: "#274472",
                  }}
                >
                  {post.title}
                </h2>
                <p style={{ margin: 0, color: "#444" }}>{post.excerpt}</p>
              </Link>
            ))}
          </div>


          {/* CTA Button */}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a
              href="https://www.evolvianai.net/register"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ name: "Register_Click_From_BlogIndex" })}
              style={{
                display: "inline-block",
                backgroundColor: "#f5a623",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              Create your Evolvian Assistant
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN — Sidebar Images */}
        <div
          style={{
            flex: "1",
            minWidth: "250px",
            position: "sticky",
            top: "80px",
          }}
        >
          <img
            src="/loginstorytelling4.png"
            alt="Evolvian promo 1"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            onClick={() => trackEvent({ name: "Blog_Sidebar_Image1_Click" })}
          />

          
        </div>
      </div>

      {/* ⬇️ FOOTER */}
      <footer className="footer">
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "2rem",
            color: "#1b2a41",
          }}
        >
          {/* Location */}
          <div style={{ flex: "1 1 200px" }}>
            <h4
              style={{
                fontSize: "1.2rem",
                marginBottom: "1rem",
                color: "#274472",
              }}
            >
              Location
            </h4>
            <p style={{ lineHeight: "1.6", color: "#333" }}>
              1001 S Main St Ste 500
              <br />
              Kalispell, MT 59901
            </p>
          </div>

          {/* Contact */}
          <div style={{ flex: "1 1 200px" }}>
            <h4
              style={{
                fontSize: "1.2rem",
                marginBottom: "1rem",
                color: "#274472",
              }}
            >
              Contact
            </h4>
            <p style={{ lineHeight: "1.6", color: "#333" }}>
              <a
                href="mailto:support@evolvianai.com"
                onClick={() =>
                  trackEvent({ name: "Footer_Contact_Click", label: "Email" })
                }
                style={{ color: "#333", textDecoration: "none" }}
              >
                support@evolvianai.com
              </a>
              <br />
              
            </p>
          </div>

          {/* Legal */}
          <div style={{ flex: "1 1 200px" }}>
            <h4
              style={{
                fontSize: "1.2rem",
                marginBottom: "1rem",
                color: "#274472",
              }}
            >
              Legal
            </h4>
            <p style={{ lineHeight: "1.6" }}>
              <a
                href="/terms"
                onClick={() => trackEvent({ name: "Footer_Terms_Click" })}
                style={{
                  color: "#1b2a41",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy"
                onClick={() => trackEvent({ name: "Footer_Privacy_Click" })}
                style={{
                  color: "#1b2a41",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.9rem",
            color: "#666",
          }}
        >
          © {new Date().getFullYear()} Evolvian AI. All rights reserved.
        </div>
      </footer>
    </>
  );
}
