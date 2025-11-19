import React, { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { trackEvent } from "./utils/tracking";
import "./App.css";


export default function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {/* 🧭 HEADER */}
      <header className="main-header" style={{ width: "100%", backgroundColor: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
        <div
          className="header-container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LOGO */}
          <a
            href="/"
            onClick={() => trackEvent({ name: "Logo_Click" })}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="/logo-evolvian.svg"
              alt="Evolvian logo"
              style={{ height: "40px" }}
            />
          </a>

          {/* DESKTOP NAV */}
          <nav
            className="nav-links"
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <a href="#plans">Services</a>
            <a href="#contact">Contact</a>
            <a href="#about-us">About</a>
            <a href="/blog">Blog</a>
          </nav>

          {/* CTA DESKTOP */}
          <div className="header-cta" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <a
              href="https://www.evolvianai.net"
              target="_blank"
              rel="noopener noreferrer"
              className="login-button"
              style={{ padding: "0.4rem 1rem", backgroundColor: "#274472", color: "#fff", borderRadius: "6px" }}
            >
              Log in
            </a>

            <a
              href="https://www.evolvianai.net/register"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "1rem", marginTop: "0.3rem", color: "#4a90e2", textDecoration: "underline" }}
            >
              Register here
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-menu-btn"
            onClick={() => setOpenMenu(!openMenu)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span style={{ width: "25px", height: "3px", backgroundColor: "#274472" }}></span>
            <span style={{ width: "25px", height: "3px", backgroundColor: "#274472" }}></span>
            <span style={{ width: "25px", height: "3px", backgroundColor: "#274472" }}></span>
          </button>
        </div>

        {/* MOBILE NAV */}
        {openMenu && (
          <div
            className="mobile-nav"
            style={{
              backgroundColor: "#fff",
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              borderTop: "1px solid #eee",
            }}
          >
            <a href="#plans">Services</a>
            <a href="#contact">Contact</a>
            <a href="#about-us">About</a>
            <a href="/blog">Blog</a>

            <a href="https://www.evolvianai.net" className="login-button" style={{ backgroundColor: "#4a90e2", color: "#fff", padding: "0.5rem", textAlign: "center", borderRadius: "6px" }}>
              Log in
            </a>

            <a href="https://www.evolvianai.net/register" style={{ textAlign: "center", color: "#4a90e2", textDecoration: "underline" }}>
              Register here
            </a>
          </div>
        )}
      </header>






      {/* 🚀 HERO */}
      <div className="w-full flex justify-center">
      <section className="hero-split">

        <div className="hero-content">
          <h1>Welcome to Your AI Assistant Hub</h1>
          <p>
            Create custom AI assistants with your own documents — no code
            required.
          </p>
          <a
            href="#plans"
            className="hero-button"
            onClick={() => trackEvent({ name: "GetStarted_Click", label: "Hero" })}
          >
            Get Started
          </a>
        </div>
        <div className="hero-media">
          <img
            src="/Efficiency.gif"
            alt="Evolvian in action"
            style={{ width: "400px", height: "auto" }}
          />
        </div>
      </section>
      </div>




      {/* 💼 PLANS SECTION */}
      <section className="plans" id="plans">
        <h2 className="plans-title">Choose the plan that fits your business</h2>
        <div className="plan-grid">

          {/* Free Plan */}
          <div className="plan-card">
            <div className="plan-content">
              <div className="plan-header">
                <h3>Free</h3>
                <span className="price">$0/mo</span>
              </div>
              <p className="plan-description">Test Evolvian with no cost.</p>
              <ul>
                <li>✅ 100 messages / month</li>
                <li>✅ 1 document</li>
                <li>✅ Basic dashboard</li>
                <li>✅ Evolvian Chat Support</li>
              </ul>
            </div>
            <a
              href="https://www.evolvianai.net/register"
              className="plan-cta yellow"
              onClick={() =>
                trackEvent({ name: "StartForFree_Click", label: "Free Plan" })
              }
            >
              Start for Free
            </a>
          </div>

          {/* Starter Plan */}
          <div className="plan-card">
            <div className="plan-content">
              <div className="plan-header">
                <h3>Starter</h3>
                <span className="price">$29/mo</span>
              </div>
              <p className="plan-description">Perfect for small businesses.</p>
              <ul>
                <li>✅ enjoy 1,000 monthly messages (soon 500)</li>
                <li>✅ 1 document</li>
                <li>✅ Evolvian Chat Support</li>
              </ul>
            </div>
            <a
              href="https://www.evolvianai.net/settings"
              className="plan-cta"
              onClick={() =>
                trackEvent({ name: "Email_Click", label: "Starter Plan" })
              }
            >
              Get starter plan
            </a>
          </div>

          {/* Premium Plan */}
          <div className="plan-card highlighted">
            <div className="plan-content">
              <div className="plan-header">
                <h3>
                  Premium <span className="badge">Most Popular</span>
                </h3>
                <span className="price">$49/mo <small>(soon $79)</small></span>
              </div>
              <p className="plan-description">Best for growth and automation.</p>
              <ul>
                <li>✅ 5,000 messages / month</li>
                <li>✅ 3 documents</li>
                <li>✅ Custom Prompt</li>
                <li>✅ Evolvian Chat Support</li>
                <li>✅ Email Automation Support</li>
                <li>✅ Calendar Automation</li>
              </ul>
            </div>
            <a
              href="https://www.evolvianai.net/settings"
              className="plan-cta"
              onClick={() =>
                trackEvent({ name: "Email_Click", label: "Premium Plan" })
              }
            >
              Get Premium plan
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className="plan-card">
            <div className="plan-content">
              <div className="plan-header">
                <h3>Enterprise</h3>
                <span className="price">Custom</span>
              </div>
              <p className="plan-description">
                Designed for enterprises & agencies.
              </p>
              <ul>
                <li>✅ Unlimited messages & documents</li>
                <li>✅ Dedicated support & onboarding</li>
              </ul>
            </div>
            <a
              href="#contact"
              className="plan-cta"
              onClick={() =>
                trackEvent({ name: "Email_Click", label: "Enterprise Plan" })
              }
            >
              Send us an email
            </a>
          </div>
        </div>
      </section>



      {/* 🌟 WHY EVOLVIAN — versión final Tailwind */}
      <section className="w-full py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-6 text-center">

          {/* TITLE */}
          <h2 className="text-4xl font-bold text-[#274472] mb-16">
            Why Evolvian AI?
          </h2>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* CARD TEMPLATE */}
            {[
              {
                title: "Efficiency",
                back: "Automate 70% of repetitive questions.",
                color: "bg-[#274472] text-white",
                event: "Why_Click_Efficiency",
              },
              {
                title: "Smart Assistant",
                back: "Built with your own documents using RAG.",
                color: "bg-[#4a90e2] text-white",
                event: "Why_Click_SmartAssistant",
              },
              {
                title: "Fast Setup",
                back: "Create your assistant in minutes — no code needed.",
                color: "bg-[#f5a623] text-white",
                event: "Why_Click_FastSetup",
              },
              {
                title: "Multi-Channel",
                back: "Works on website, WhatsApp or email.",
                color: "bg-[#a3d9b1] text-[#274472]",
                event: "Why_Click_MultiChannel",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => trackEvent({ name: item.event, label: item.title })}
                className="group cursor-pointer perspective"
              >
                <div className="
                  relative h-48 w-full rounded-xl shadow-lg 
                  transition-transform duration-700 transform-style-3d 
                  group-hover:rotate-y-180 bg-white
                ">
                  
                  {/* FRONT */}
                  <div className="
                    absolute inset-0 flex items-center justify-center 
                    backface-hidden bg-white rounded-xl border border-gray-200
                  ">
                    <p className="text-xl font-semibold text-[#274472]">
                      {item.title}
                    </p>
                  </div>

                  {/* BACK */}
                  <div className={`
                    absolute inset-0 flex items-center justify-center 
                    rotate-y-180 backface-hidden rounded-xl p-4 text-sm ${item.color}
                  `}>
                    {item.back}
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      


      {/* CONTACT SECTION — Evolvian Premium */}
<section id="contact" className="w-full py-24 bg-[#f8fafc]">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
    
    {/* LEFT — Form */}
    <div>
      <h2 className="text-4xl font-bold text-[#274472] mb-8">
        Contact Us
      </h2>

      <p className="text-gray-600 mb-10 max-w-md leading-relaxed">
        Tell us about your project, team, or the assistant you want to build.  
        We typically reply within 24 hours.
      </p>

      {/* FORM CARD */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-[#ededed]">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const plan = document.getElementById("plan").value;
            const usage = document.getElementById("usage").value.trim();

            trackEvent({
              name: "Contact_Form_Submit",
              category: "Lead",
              label: plan,
              value: email,
            });

            const mailBody = `Name: ${name}\nEmail: ${email}\nInterested Plan: ${plan}\n\nWhat would you use Evolvian for:\n${usage}`;
            const encodedSubject = encodeURIComponent(subject || "Evolvian Inquiry");
            const encodedBody = encodeURIComponent(mailBody);

            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=support@evolvianai.com&su=${encodedSubject}&body=${encodedBody}`;
            const outlookUrl = `https://outlook.live.com/mail/deeplink/compose?to=support@evolvianai.com&subject=${encodedSubject}&body=${encodedBody}`;
            const mailtoUrl = `mailto:support@evolvianai.com?subject=${encodedSubject}&body=${encodedBody}`;

            const gmailTab = window.open(gmailUrl, "_blank");

            setTimeout(() => {
              if (!gmailTab || gmailTab.closed || typeof gmailTab.closed === "undefined") {
                const outlookTab = window.open(outlookUrl, "_blank");
                setTimeout(() => {
                  if (!outlookTab || outlookTab.closed || typeof outlookTab.closed === "undefined") {
                    window.location.href = mailtoUrl;
                  }
                }, 800);
              }
            }, 800);
          }}
        >

          {/* Name */}
          <div>
            <Label.Root htmlFor="name" className="text-[#274472] font-medium">
              Name
            </Label.Root>
            <input
              id="name"
              type="text"
              required
              placeholder="Your name"
              className="
                mt-2 w-full p-3 rounded-lg border border-[#274472]/40 
                focus:border-[#4a90e2] focus:ring-2 focus:ring-[#4a90e2]/20 
                transition shadow-sm outline-none
              "
            />
          </div>

          {/* Email */}
          <div>
            <Label.Root htmlFor="email" className="text-[#274472] font-medium">
              Email
            </Label.Root>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="
                mt-2 w-full p-3 rounded-lg border border-[#274472]/40 
                focus:border-[#4a90e2] focus:ring-2 focus:ring-[#4a90e2]/20 
                transition shadow-sm outline-none
              "
            />
          </div>

          {/* Subject */}
          <div>
            <Label.Root htmlFor="subject" className="text-[#274472] font-medium">
              Subject
            </Label.Root>
            <input
              id="subject"
              type="text"
              required
              placeholder="What's your message about?"
              className="
                mt-2 w-full p-3 rounded-lg border border-[#274472]/40 
                focus:border-[#4a90e2] focus:ring-2 focus:ring-[#4a90e2]/20 
                transition shadow-sm outline-none
              "
            />
          </div>

          {/* Plan */}
          <div>
            <Label.Root htmlFor="plan" className="text-[#274472] font-medium">
              What plan are you interested in?
            </Label.Root>
            <select
              id="plan"
              required
              defaultValue=""
              className="
                mt-2 w-full p-3 rounded-lg border border-[#274472]/40 
                focus:border-[#4a90e2] focus:ring-2 focus:ring-[#4a90e2]/20 
                bg-white shadow-sm outline-none cursor-pointer
              "
            >
              <option value="" disabled>Select a plan</option>
              <option value="Starter">Starter</option>
              <option value="Premium">Premium</option>
              <option value="White Label">White Label</option>
            </select>
          </div>

          {/* Usage */}
          <div>
            <Label.Root htmlFor="usage" className="text-[#274472] font-medium">
              What would you use Evolvian for?
            </Label.Root>
            <textarea
              id="usage"
              rows="5"
              required
              placeholder="Tell us a bit about your use case..."
              className="
                mt-2 w-full p-3 rounded-lg border border-[#274472]/40 
                focus:border-[#4a90e2] focus:ring-2 focus:ring-[#4a90e2]/20 
                bg-white shadow-sm outline-none resize-y
              "
            ></textarea>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button
              type="submit"
              onClick={() => trackEvent({ name: "SendMessage_Click", label: "Form Button" })}
              className="
                w-full bg-[#f5a623] text-white py-3 rounded-xl 
                font-semibold shadow-md hover:shadow-lg 
                transition-transform hover:-translate-y-0.5
              "
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* RIGHT — Information */}
    <div className="flex flex-col justify-center">
      <h3 className="text-2xl font-semibold text-[#274472] mb-6">
        We're Here to Help
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        If you need more information about pricing, features, or want to start 
        with a full setup, feel free to send us your details using the form.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        You can also open the chat widget (bottom right) and ask our Evolvian Assistant 
        anything — it’s powered entirely by the same technology you’ll use.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Let’s build something great together.
      </p>
    </div>

  </div>
</section>


      <section
        id="about-us"
        style={{
          backgroundColor: "#ffffff",
          padding: "4rem 2rem",
          borderTop: "1px solid #ededed",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Video Placeholder */}
          <div
            style={{
              flex: "1 1 500px",
              minHeight: "300px",
              backgroundColor: "#ededed",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => trackEvent({ name: "About_Image_Click" })}
          >
            <img
              src="/aboutuseai.gif"
              alt="Evolvian AI preview"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Text Content */}
          <div
            style={{ flex: "1 1 500px", cursor: "pointer" }}
            onClick={() => trackEvent({ name: "About_Text_Click" })}
          >
            <h2
              style={{ fontSize: "2rem", marginBottom: "1rem", color: "#274472" }}
            >
              About Evolvian
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#333" }}>
              Evolvian empowers businesses to create their own intelligent
              assistants trained on their documents — no code required. Our
              platform automates support, improves communication, and boosts
              productivity across channels. Whether you're a startup or an
              enterprise, Evolvian helps you scale efficiently with AI tailored
              to your needs.
            </p>
          </div>
        </div>
      </section>

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

        {/* Footer bottom text */}
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
