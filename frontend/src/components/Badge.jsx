import { PRIORITY_LABELS, STATUS_LABELS } from "@/utils/format";

const STATUS_COLORS = {
  pending: "var(--warn)",
  in_progress: "var(--info)",
  completed: "var(--success)",
};

const PRIORITY_COLORS = {
  low: "var(--muted)",
  medium: "var(--warn)",
  high: "var(--danger)",
};

export function Badge({ type = "status", value, label, color }) {
  const tone = color || (type === "priority" ? PRIORITY_COLORS[value] : STATUS_COLORS[value]) || "var(--muted)";
  const text = label || (type === "priority" ? PRIORITY_LABELS[value] : STATUS_LABELS[value]) || value;

  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium"
      style={{ color: tone, backgroundColor: `color-mix(in srgb, ${tone} 14%, transparent)` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tone }} aria-hidden="true" />
      {type === "priority" && !label ? `${text} priority` : text}
    </span>
  );
}
