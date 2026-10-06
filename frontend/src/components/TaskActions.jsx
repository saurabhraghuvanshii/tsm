import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDate, isOverdue } from "@/utils/format";

const ICON_BUTTON =
  "flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink";

export function TaskActions({ task, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link href={`/tasks/${task.id}`} className={ICON_BUTTON} aria-label={`View ${task.title}`} title="View">
        <Eye className="h-4 w-4" aria-hidden="true" />
      </Link>
      <Link href={`/tasks/${task.id}/edit`} className={ICON_BUTTON} aria-label={`Edit ${task.title}`} title="Edit">
        <Pencil className="h-4 w-4" aria-hidden="true" />
      </Link>
      <button
        type="button"
        onClick={() => onDelete(task)}
        className={`${ICON_BUTTON} hover:text-danger`}
        aria-label={`Delete ${task.title}`}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function DueDate({ task }) {
  if (!task.dueDate) return <span className="text-sm text-muted">No due date</span>;
  const overdue = isOverdue(task);
  return (
    <span className={`text-sm ${overdue ? "font-medium text-danger" : "text-ink"}`}>
      {formatDate(task.dueDate)}
      {overdue && <span className="block text-xs font-normal">Overdue</span>}
    </span>
  );
}
