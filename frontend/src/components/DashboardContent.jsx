"use client";

import { useEffect, useState } from "react";
import { Plus, SearchX } from "lucide-react";
import { useTaskQuery, PAGE_SIZES } from "@/hooks/useTaskQuery";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "./Button";
import { ConfirmDialog } from "./ConfirmDialog";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { PageHeading } from "./PageHeading";
import { Pagination } from "./Pagination";
import { TaskFilters } from "./TaskFilters";
import { TaskList, TaskListSkeleton } from "./TaskList";
import { useToast } from "./Toast";

export const NewTaskButton = ({ children = "New task" }) => (
  <Button href="/tasks/new" variant="primary">
    <Plus className="h-4 w-4" aria-hidden="true" />
    {children}
  </Button>
);

export function DashboardContent() {
  const toast = useToast();
  const filters = useTaskQuery();
  const { query, apiParams, hasActiveFilters, setPage } = filters;
  const { tasks, meta, loading, error, refetch, remove } = useTasks(apiParams);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const outOfRange = Boolean(meta && !loading && meta.totalPages > 0 && meta.page > meta.totalPages);
  useEffect(() => {
    if (outOfRange) setPage(meta.totalPages);
  }, [outOfRange, meta, setPage]);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await remove(pendingDelete.id);
      toast.success(`Deleted “${pendingDelete.title}”`);
      if (tasks.length === 1 && query.page > 1) setPage(query.page - 1);
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
  const countLabel = meta
    ? `${total} ${total === 1 ? "task" : "tasks"}${hasActiveFilters ? (total === 1 ? " matches your filters" : " match your filters") : ""}`
    : error ? null : "Loading tasks…";

  let content;
  if (error) {
    content = <ErrorState title="Couldn't load tasks" message={error.message} onRetry={refetch} />;
  } else if ((loading && !meta) || outOfRange) {
    content = <TaskListSkeleton />;
  } else if (tasks.length === 0 && hasActiveFilters) {
    content = (
      <EmptyState
        icon={SearchX}
        title="No tasks match your filters"
        description="Try a different search term or remove some filters."
        action={<Button onClick={filters.clearFilters}>Clear filters</Button>}
      />
    );
  } else if (tasks.length === 0) {
    content = (
      <EmptyState
        title="No tasks yet"
        description="Create a task to start tracking your work."
        action={<NewTaskButton>Create your first task</NewTaskButton>}
      />
    );
  } else {
    content = (
      <>
        <TaskList tasks={tasks} onDelete={setPendingDelete} busy={loading} />
        <Pagination meta={meta} pageSizes={PAGE_SIZES} onPageChange={setPage} onLimitChange={filters.setLimit} />
      </>
    );
  }

  return (
    <>
      <PageHeading title="Tasks" description={countLabel} backHref={null} actions={<NewTaskButton />} />
      <TaskFilters
        searchInput={filters.searchInput}
        onSearchChange={filters.setSearchInput}
        query={query}
        onFilterChange={filters.setFilter}
        hasActiveFilters={hasActiveFilters}
        onClear={filters.clearFilters}
      />
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
