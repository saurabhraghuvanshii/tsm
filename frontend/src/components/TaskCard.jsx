import Link from "next/link";
import { formatDate } from "@/utils/format";
import { Badge } from "./Badge";
import { DueDate, TaskActions } from "./TaskActions";

export function TaskCard({ task, onDelete }) {
  return (
    <li className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <Link href={`/tasks/${task.id}`} className="block rounded-sm font-medium text-ink hover:text-accent">
        {task.title}
      </Link>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{task.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge type="status" value={task.status} />
        <Badge type="priority" value={task.priority} />
      </div>
      <p className="mt-2 text-xs text-muted">Created {formatDate(task.createdAt)}</p>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-2">
        <DueDate task={task} />
        <TaskActions task={task} onDelete={onDelete} />
      </div>
    </li>
  );
}
