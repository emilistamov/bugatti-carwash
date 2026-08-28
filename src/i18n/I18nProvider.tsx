"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { locales, translations, type Locale, type Translation } from "./translations";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
};

const storageKey = "bugatti-carwash-locale";
const localeChangeEvent = "bugatti-carwash-locale-change";
let memoryLocale: Locale = "ru";
const I18nContext = createContext<I18nContextValue | null>(null);

function getLocaleSnapshot(): Locale {
  try {
    const savedLocale = window.localStorage?.getItem(storageKey);
    if (savedLocale && locales.includes(savedLocale as Locale)) memoryLocale = savedLocale as Locale;
    return memoryLocale;
  } catch {
    return memoryLocale;
  }
}

function subscribeToLocale(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(localeChangeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(localeChangeEvent, onChange);
  };
}

function getServerLocale(): Locale {
  return "ru";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocale, getLocaleSnapshot, getServerLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        memoryLocale = nextLocale;
        try {
          window.localStorage?.setItem(storageKey, nextLocale);
        } catch {
          // The active locale still remains available for the current session.
        }
        window.dispatchEvent(new Event(localeChangeEvent));
      },
      t: translations[locale],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
