import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "./Button";

export function ErrorState({ title = "Something went wrong", message, onRetry, action }) {
  return (
    <div role="alert" className="flex flex-col items-center rounded-lg border border-border bg-surface px-6 py-14 text-center">
      <span
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg text-danger"
        style={{ backgroundColor: "color-mix(in srgb, var(--danger) 12%, transparent)" }}
      >
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      {message && <p className="mt-1 max-w-sm text-sm text-muted">{message}</p>}
      {onRetry && (
        <Button className="mt-5" onClick={onRetry}>
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          Retry
        </Button>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
