import { Suspense } from "react";
import { TaskDetailSkeleton, TaskDetailView } from "@/components/TaskDetailView";

export default function TaskDetailPage() {
  return (
    <Suspense fallback={<TaskDetailSkeleton />}>
      <TaskDetailView />
    </Suspense>
  );
}
