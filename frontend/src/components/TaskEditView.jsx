"use client";

import { useParams, useRouter } from "next/navigation";
import { updateTask } from "@/api/tasks";
import { useTask } from "@/hooks/useTasks";
import { PageHeading } from "./PageHeading";
import { Skeleton } from "./Skeleton";
import { TaskForm } from "./TaskForm";
import { TaskLoadError } from "./TaskLoadError";
import { useToast } from "./Toast";

export function TaskFormSkeleton() {
  return (
    <div role="status" aria-label="Loading task" className="space-y-6">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-48" />
      <div className="space-y-5 rounded-lg border border-border bg-surface p-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-28 w-full" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

export function TaskEditView() {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const { task, loading, error, refetch } = useTask(id);

  if (loading) return <TaskFormSkeleton />;
  if (error) return <TaskLoadError error={error} onRetry={refetch} />;
  if (!task) return null;

  const handleSubmit = async (values) => {
    const { data } = await updateTask(task.id, values);
    toast.success(`Updated “${data.title}”`);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeading title="Edit task" backHref={`/tasks/${task.id}`} backLabel="Back to task" />
      <TaskForm key={task.updatedAt} initialValues={task} submitLabel="Save changes" onSubmit={handleSubmit} cancelHref={`/tasks/${task.id}`} />
    </div>
  );
}
