// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";   // ← Esto es lo importante
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Blog
import BlogLayout from "./blog/BlogLayout";
import BlogIndex from "./blog/BlogIndex"; // ✅ página que lista todos los posts

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </React.StrictMode>
);
