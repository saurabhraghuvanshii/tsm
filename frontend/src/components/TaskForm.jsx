"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { PRIORITY_LABELS, STATUS_LABELS } from "@/utils/format";
import { validateTask } from "@/utils/validate";
import { Button } from "./Button";
import { Field, controlClasses } from "./Field";
import { Select } from "./Select";

const EMPTY_TASK = { title: "", description: "", status: "pending", priority: "medium", dueDate: "" };

const toPayload = (values) => ({
  title: values.title.trim(),
  description: values.description.trim(),
  status: values.status,
  priority: values.priority,
  dueDate: values.dueDate || null,
});

export function TaskForm({ initialValues, submitLabel, onSubmit, cancelHref = "/" }) {
  const [values, setValues] = useState(() => ({ ...EMPTY_TASK, ...initialValues, dueDate: initialValues?.dueDate ?? "" }));
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateTask({ ...values, [name]: value })[name] }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setErrors((current) => ({ ...current, [name]: validateTask(values)[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateTask(values);
    setErrors(nextErrors);
    setBanner("");
    if (Object.keys(nextErrors).length > 0) {
      event.currentTarget.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(toPayload(values));
    } catch (error) {
      const fieldErrors = Object.fromEntries(
        (Array.isArray(error.details) ? error.details : [])
          .filter((detail) => detail.field in EMPTY_TASK)
          .map((detail) => [detail.field, detail.message]),
      );
      setErrors(fieldErrors);
      if (Object.keys(fieldErrors).length === 0) setBanner(error.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const fieldProps = (name) => ({ name, value: values[name], onChange: handleChange, onBlur: handleBlur });

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
      {banner && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm text-danger"
          style={{
            borderColor: "color-mix(in srgb, var(--danger) 35%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--danger) 8%, transparent)",
          }}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {banner}
        </div>
      )}

      <div className="flex flex-col gap-5">
        <Field label="Title" required error={errors.title}>
          <input {...fieldProps("title")} type="text" maxLength={120} className={`${controlClasses} h-10`} placeholder="e.g. Prepare sprint demo" />
        </Field>

        <Field label="Description" required error={errors.description} hint={`${values.description.trim().length}/1000`}>
          <textarea {...fieldProps("description")} rows={5} maxLength={1000} className={`${controlClasses} min-h-28 resize-y py-2`} placeholder="Add details, context, or acceptance criteria" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Status" error={errors.status}>
            <Select {...fieldProps("status")}>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </Field>
          <Field label="Priority" error={errors.priority}>
            <Select {...fieldProps("priority")}>
              {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Due date" error={errors.dueDate} hint="Optional" className="sm:max-w-[calc(50%-10px)]">
          <input {...fieldProps("dueDate")} type="date" className={`${controlClasses} h-10`} />
        </Field>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button href={cancelHref}>Cancel</Button>
        <Button type="submit" variant="primary" loading={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
