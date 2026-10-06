"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/api/tasks";
import { PageHeading } from "@/components/PageHeading";
import { TaskForm } from "@/components/TaskForm";
import { useToast } from "@/components/Toast";

export default function NewTaskPage() {
  const router = useRouter();
  const toast = useToast();
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (values) => {
    const { data } = await createTask(values);
    toast.success(`Created “${data.title}”`);
    setFormKey((key) => key + 1);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeading title="New task" description="Add a task with a clear title and enough detail to act on." />
      <TaskForm key={formKey} submitLabel="Create task" onSubmit={handleSubmit} />
    </div>
  );
}
