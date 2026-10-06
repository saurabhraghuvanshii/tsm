import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PageHeading({ title, description, backHref = "/", backLabel = "Back to tasks", actions }) {
  return (
    <div className="mb-6">
      {backHref && (
        <Link href={backHref} className="mb-3 inline-flex items-center gap-1.5 rounded-sm text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="break-words text-xl font-semibold tracking-tight text-ink sm:text-2xl">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
    </div>
  );
}
