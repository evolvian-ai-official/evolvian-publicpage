// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";   // ← Esto es lo importante
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { trackPageView } from "./utils/tracking";
import { PublicLanguageProvider } from "./contexts/PublicLanguageContext";
import { PublicConsentProvider } from "./contexts/PublicConsentContext";
import PrivacyConsentManager from "./components/PrivacyConsentManager";

// Blog
import BlogLayout from "./blog/BlogLayout";
import BlogIndex from "./blog/BlogIndex"; // ✅ página que lista todos los posts

function AnalyticsPageTracker() {
  const location = useLocation();

  React.useEffect(() => {
    const path = `${location.pathname}${location.search || ""}`;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PublicLanguageProvider>
      <PublicConsentProvider>
        <BrowserRouter>
          <AnalyticsPageTracker />
          <Routes>
            {/* 🏠 Home */}
            <Route path="/" element={<App />} />

            {/* 📰 Blog - listado */}
            <Route path="/blog" element={<BlogIndex />} />

            {/* 📰 Blog - post individual */}
            <Route path="/blog/:slug" element={<BlogLayout />} />

            {/* ⚖️ Legal */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
          <PrivacyConsentManager />
        </BrowserRouter>
      </PublicConsentProvider>
    </PublicLanguageProvider>
  </React.StrictMode>
);
