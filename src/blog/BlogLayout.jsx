// 📰 BlogLayout.jsx — Completo con Header, Breadcrumb y Footer
import React from "react";
import BlogPost from "./BlogPost";
import { useParams } from "react-router-dom";
import { trackEvent } from "../utils/tracking";

export default function BlogLayout() {
  const { slug } = useParams();

  return (
    <>
      {/* ⬆️ HEADER (exacto de App.jsx) */}
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

      {/* 📄 BLOG POST CONTENT */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          color: "#111",
          minHeight: "100vh",
          padding: "4rem 0",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "0 1rem",
          }}
        >

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
              style={{
                color: "#274472",
                textDecoration: "none",
              }}
            >
              Home
            </a>
            {"  "}→{"  "}
            <a
              href="/blog"
              onClick={() => trackEvent({ name: "Breadcrumb_Blog_Click" })}
              style={{
                color: "#274472",
                textDecoration: "none",
              }}
            >
              Blog
            </a>
            {"  "}→{"  "}
            <span style={{ color: "#4a90e2" }}>{slug.replace(/-/g, " ")}</span>
          </div>

          {/* 📝 BLOG POST */}
          <BlogPost />
        </div>
      </div>

      {/* ⬇️ FOOTER (idéntico al de App.jsx) */}
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
                onClick={() => trackEvent({ name: "Footer_Contact_Click", label: "Email" })}
                style={{ color: "#333", textDecoration: "none" }}
              >
                support@evolvianai.com
              </a>
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


