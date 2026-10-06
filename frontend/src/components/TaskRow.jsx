import Link from "next/link";
import { formatDate } from "@/utils/format";
import { Badge } from "./Badge";
import { DueDate, TaskActions } from "./TaskActions";

export const ROW_GRID =
  "grid grid-cols-[minmax(0,1fr)_116px_128px] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_112px_136px_112px_104px_128px]";

export function TaskRow({ task, onDelete }) {
  return (
    <li className={`${ROW_GRID} border-t border-border px-4 py-3 first:border-t-0 hover:bg-surface-2`}>
      <div className="min-w-0">
        <Link href={`/tasks/${task.id}`} className="block truncate rounded-sm font-medium text-ink hover:text-accent">
          {task.title}
        </Link>
        <p className="truncate text-sm text-muted">{task.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 lg:hidden">
          <Badge type="status" value={task.status} />
          <Badge type="priority" value={task.priority} />
        </div>
      </div>
      <div className="hidden lg:block">
        <Badge type="status" value={task.status} />
      </div>
      <div className="hidden lg:block">
        <Badge type="priority" value={task.priority} />
      </div>
      <DueDate task={task} />
      <span className="hidden text-sm text-muted lg:block">{formatDate(task.createdAt)}</span>
      <TaskActions task={task} onDelete={onDelete} />
    </li>
  );
}
