import { cloneElement, isValidElement, useId } from "react";

export const controlClasses = `w-full rounded-lg border border-border bg-surface px-3 text-sm text-ink placeholder:text-muted
  hover:border-muted aria-[invalid=true]:border-danger`;

export function Field({ label, error, hint, required, children, className = "" }) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error || hint;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": message ? messageId : undefined,
        "aria-required": required || undefined,
      })
    : children;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[13px] font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-danger" aria-hidden="true">*</span>}
      </label>
      {control}
      {message && (
        <p id={messageId} className={`text-[13px] ${error ? "text-danger" : "text-muted"}`} role={error ? "alert" : undefined}>
          {message}
        </p>
      )}
    </div>
  );
}
