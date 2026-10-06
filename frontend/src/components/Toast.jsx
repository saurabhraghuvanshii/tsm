"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const TONES = {
  success: { color: "var(--success)", Icon: CheckCircle2 },
  error: { color: "var(--danger)", Icon: AlertCircle },
  info: { color: "var(--info)", Icon: Info },
};

const DURATION = 4000;

function ToastItem({ toast, onDismiss }) {
  const { color, Icon } = TONES[toast.type] || TONES.info;
  return (
    <li
      role={toast.type === "error" ? "alert" : "status"}
      className="pointer-events-auto flex w-full items-start gap-3 rounded-lg border border-border bg-surface p-3 shadow-md"
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
      <p className="flex-1 text-sm text-ink">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-ink"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </li>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (type, message) => {
      nextId.current += 1;
      const id = nextId.current;
      setToasts((current) => [...current.slice(-2), { id, type, message }]);
      setTimeout(() => dismiss(id), DURATION);
    },
    [dismiss],
  );

  const api = useMemo(
    () => ({
      success: (message) => show("success", message),
      error: (message) => show("error", message),
      info: (message) => show("info", message),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ol
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </ol>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
