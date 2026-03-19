"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const THEME_EVENT = "qth-theme-change";

function readTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("qth-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const onStorage = () => callback();
  const onThemeEvent = () => callback();

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, onThemeEvent);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, onThemeEvent);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("qth-theme", theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("qth-theme", nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-200 transition hover:border-slate-500"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
