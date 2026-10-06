import { Suspense } from "react";
import { DashboardContent, NewTaskButton } from "@/components/DashboardContent";
import { PageHeading } from "@/components/PageHeading";
import { TaskListSkeleton } from "@/components/TaskList";

function DashboardFallback() {
  return (
    <>
      <PageHeading title="Tasks" description="Loading tasks…" backHref={null} actions={<NewTaskButton />} />
      <TaskListSkeleton />
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent />
    </Suspense>
  );
}
