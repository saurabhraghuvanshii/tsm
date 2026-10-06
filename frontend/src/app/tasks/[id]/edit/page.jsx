import { Suspense } from "react";
import { TaskEditView, TaskFormSkeleton } from "@/components/TaskEditView";

export default function EditTaskPage() {
  return (
    <Suspense fallback={<TaskFormSkeleton />}>
      <TaskEditView />
    </Suspense>
  );
}
