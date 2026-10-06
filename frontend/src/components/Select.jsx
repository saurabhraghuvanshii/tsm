import { ChevronDown } from "lucide-react";

export function Select({ icon: Icon, active = false, className = "", children, ...props }) {
  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <Icon
          className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${active ? "text-accent" : "text-muted"}`}
          aria-hidden="true"
        />
      )}
      <select
        {...props}
        className={`h-10 w-full cursor-pointer appearance-none truncate rounded-lg border bg-surface pr-9 text-sm shadow-sm
          hover:border-muted aria-[invalid=true]:border-danger ${Icon ? "pl-9" : "pl-3"}
          ${active ? "border-accent font-medium text-ink" : "border-border text-ink"}`}
        style={active ? { backgroundColor: "color-mix(in srgb, var(--accent) 8%, var(--surface))" } : undefined}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}
