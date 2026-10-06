"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { deleteTask } from "@/api/tasks";
import { useTask } from "@/hooks/useTasks";
import { formatDate, formatDateTime, isOverdue } from "@/utils/format";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { ConfirmDialog } from "./ConfirmDialog";
import { PageHeading } from "./PageHeading";
import { Skeleton } from "./Skeleton";
import { TaskLoadError } from "./TaskLoadError";
import { useToast } from "./Toast";

function MetaItem({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{children}</dd>
    </div>
  );
}

export function TaskDetailSkeleton() {
  return (
    <div role="status" aria-label="Loading task" className="space-y-6">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-2/3" />
      <div className="space-y-3 rounded-lg border border-border bg-surface p-6">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function TaskDetailView() {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const { task, loading, error, refetch } = useTask(id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (loading) return <TaskDetailSkeleton />;
  if (error) return <TaskLoadError error={error} onRetry={refetch} />;
  if (!task) return null;

  const overdue = isOverdue(task);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTask(task.id);
      toast.success(`Deleted “${task.title}”`);
      router.push("/");
    } catch (err) {
      toast.error(err.message);
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <PageHeading
        title={task.title}
        actions={
          <>
            <Button href={`/tasks/${task.id}/edit`}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit
            </Button>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </Button>
          </>
        }
      />

      <article className="rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex flex-wrap gap-1.5 border-b border-border px-5 py-4 sm:px-6">
          <Badge type="status" value={task.status} />
          <Badge type="priority" value={task.priority} />
          {overdue && <Badge label="Overdue" color="var(--danger)" />}
        </div>
        <div className="px-5 py-5 sm:px-6">
          <h2 className="sr-only">Description</h2>
          <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-ink">{task.description}</p>
        </div>
        <dl className="grid gap-5 border-t border-border px-5 py-5 sm:grid-cols-3 sm:px-6">
          <MetaItem label="Due date">
            {task.dueDate ? formatDate(task.dueDate) : <span className="text-muted">No due date</span>}
            {overdue && <span className="mt-0.5 block text-xs text-danger">This task is past its due date</span>}
          </MetaItem>
          <MetaItem label="Created">{formatDateTime(task.createdAt)}</MetaItem>
          <MetaItem label="Last updated">{formatDateTime(task.updatedAt)}</MetaItem>
        </dl>
        <p className="break-all border-t border-border px-5 py-3 font-mono text-xs text-muted sm:px-6">ID: {task.id}</p>
      </article>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this task?"
        description={`“${task.title}” will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete task"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
