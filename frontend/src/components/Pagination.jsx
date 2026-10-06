import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { controlClasses } from "./Field";

export function Pagination({ meta, pageSizes, onPageChange, onLimitChange }) {
  if (!meta || (meta.totalPages <= 1 && meta.total <= pageSizes[0])) return null;
  const { page, totalPages, total, limit } = meta;

  return (
    <nav aria-label="Pagination" className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted" aria-live="polite">
        Page {Math.min(page, Math.max(totalPages, 1))} of {Math.max(totalPages, 1)} · {total} {total === 1 ? "task" : "tasks"}
      </p>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="hidden sm:inline">Per page</span>
          <span className="sr-only sm:hidden">Tasks per page</span>
          <select value={limit} onChange={(event) => onLimitChange(Number(event.target.value))} className={`${controlClasses} h-10 w-auto pr-8`}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
        <Button onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Prev</span>
        </Button>
        <Button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} aria-label="Next page">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
