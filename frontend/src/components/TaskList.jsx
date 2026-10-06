import { Skeleton } from "./Skeleton";
import { TaskCard } from "./TaskCard";
import { ROW_GRID, TaskRow } from "./TaskRow";

const HEADER_CELL = "text-xs font-medium uppercase tracking-wide text-muted";

function ListHeader() {
  return (
    <div className={`${ROW_GRID} border-b border-border bg-surface-2 px-4 py-2.5`} aria-hidden="true">
      <span className={HEADER_CELL}>Task</span>
      <span className={`${HEADER_CELL} hidden lg:block`}>Status</span>
      <span className={`${HEADER_CELL} hidden lg:block`}>Priority</span>
      <span className={HEADER_CELL}>Due</span>
      <span className={`${HEADER_CELL} hidden lg:block`}>Created</span>
      <span className={`${HEADER_CELL} text-right`}>Actions</span>
    </div>
  );
}

export function TaskList({ tasks, onDelete, busy = false }) {
  return (
    <div className={busy ? "opacity-60" : undefined} aria-busy={busy || undefined}>
      <div className="hidden overflow-hidden rounded-lg border border-border bg-surface shadow-sm sm:block">
        <ListHeader />
        <ul>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} onDelete={onDelete} />
          ))}
        </ul>
      </div>
      <ul className="flex flex-col gap-3 sm:hidden">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export function TaskListSkeleton({ rows = 5 }) {
  return (
    <div role="status" aria-label="Loading tasks">
      <div className="hidden overflow-hidden rounded-lg border border-border bg-surface sm:block">
        <ListHeader />
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className={`${ROW_GRID} border-t border-border px-4 py-4 first:border-t-0`}>
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-3 w-3/4" />
            </div>
            <Skeleton className="hidden h-5 w-20 lg:block" />
            <Skeleton className="hidden h-5 w-24 lg:block" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="hidden h-4 w-20 lg:block" />
            <Skeleton className="ml-auto h-8 w-28" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:hidden">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="space-y-3 rounded-lg border border-border bg-surface p-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-5 w-40" />
          </div>
        ))}
      </div>
    </div>
  );
}
