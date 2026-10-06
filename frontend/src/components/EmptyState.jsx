import { Inbox } from "lucide-react";

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-surface px-6 py-14 text-center">
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-surface-2 text-muted">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
