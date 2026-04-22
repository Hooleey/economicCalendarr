import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LOCALE_LABELS, LOCALES, STRINGS } from "./strings";

const STORAGE_KEY = "app_lang";

const I18nContext = createContext(null);

function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] !== undefined && vars[key] !== null ? String(vars[key]) : ""
  );
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved && LOCALES.includes(saved)) return saved;
    return "ru";
  });

  const setLang = useCallback((next) => {
    if (!LOCALES.includes(next)) return;
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key, vars) => {
      const table = STRINGS[lang] || STRINGS.ru;
      const fallback = STRINGS.en[key] ?? STRINGS.ru[key] ?? key;
      const raw = table[key] ?? fallback;
      return interpolate(raw, vars);
    },
    [lang]
  );

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      locales: LOCALES,
      localeLabels: LOCALE_LABELS
    }),
    [lang, setLang, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
