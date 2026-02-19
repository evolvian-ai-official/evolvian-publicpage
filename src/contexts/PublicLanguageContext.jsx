import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANGUAGE_KEY = "evolvian_public_lang";
const ALLOWED = ["en", "es"];

function detectInitialLanguage() {
  if (typeof window !== "undefined") {
    const persisted = window.localStorage.getItem(LANGUAGE_KEY);
    if (persisted && ALLOWED.includes(persisted)) return persisted;
  }

  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es")) {
    return "es";
  }

  return "en";
}

const PublicLanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
});

export function PublicLanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectInitialLanguage);

  const setLanguage = (nextLanguage) => {
    const safeLanguage = ALLOWED.includes(nextLanguage) ? nextLanguage : "en";
    setLanguageState(safeLanguage);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_KEY, safeLanguage);
    }
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return <PublicLanguageContext.Provider value={value}>{children}</PublicLanguageContext.Provider>;
}

export function usePublicLanguage() {
  return useContext(PublicLanguageContext);
}
