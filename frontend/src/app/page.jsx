"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { PageHeading } from "@/components/PageHeading";
import { TaskList, TaskListSkeleton } from "@/components/TaskList";
import { useToast } from "@/components/Toast";
import { useTasks } from "@/hooks/useTasks";

const NewTaskButton = ({ children = "New task" }) => (
  <Button href="/tasks/new" variant="primary">
    <Plus className="h-4 w-4" aria-hidden="true" />
    {children}
  </Button>
);

export default function DashboardPage() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const { tasks, meta, loading, error, refetch, remove } = useTasks({ page });
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await remove(pendingDelete.id);
      toast.success(`Deleted “${pendingDelete.title}”`);
      if (tasks.length === 1 && page > 1) setPage(page - 1);
      else refetch();
    } catch (err) {
      toast.error(err.message);
      if (err.status === 404) refetch();
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  };

  const total = meta?.total ?? 0;
  const countLabel = meta ? `${total} ${total === 1 ? "task" : "tasks"}` : error ? null : "Loading tasks…";

  let content;
  if (error) {
    content = <ErrorState title="Couldn't load tasks" message={error.message} onRetry={refetch} />;
  } else if (loading && !meta) {
    content = <TaskListSkeleton />;
  } else if (tasks.length === 0) {
    content = (
      <EmptyState
        title="No tasks yet"
        description="Create a task to start tracking your work."
        action={<NewTaskButton>Create your first task</NewTaskButton>}
      />
    );
  } else {
    content = <TaskList tasks={tasks} onDelete={setPendingDelete} busy={loading} />;
  }

  return (
    <>
      <PageHeading title="Tasks" description={countLabel} backHref={null} actions={<NewTaskButton />} />
      {content}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this task?"
        description={pendingDelete ? `“${pendingDelete.title}” will be permanently removed. This cannot be undone.` : undefined}
        confirmLabel="Delete task"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
