"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";

const subscribe = (callback) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

const getSnapshot = () => document.documentElement.getAttribute("data-theme") || "light";
const getServerSnapshot = () => null;

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  return { theme, toggle };
}
