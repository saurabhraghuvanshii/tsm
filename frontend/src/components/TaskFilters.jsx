"use client";

import { Search, X } from "lucide-react";
import { SORT_OPTIONS } from "@/hooks/useTaskQuery";
import { PRIORITY_LABELS, STATUS_LABELS } from "@/utils/format";
import { controlClasses } from "./Field";

const SELECT = `${controlClasses} h-10`;

function FilterSelect({ label, value, onChange, options, allLabel }) {
  return (
    <label className="flex flex-col">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={SELECT}>
        {allLabel && <option value="">{allLabel}</option>}
        {Object.entries(options).map(([key, option]) => (
          <option key={key} value={key}>
            {typeof option === "string" ? option : option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TaskFilters({ searchInput, onSearchChange, query, onFilterChange, hasActiveFilters, onClear }) {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="flex flex-col gap-2 lg:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search tasks</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search title or description"
            className={`${controlClasses} h-10 pl-9 pr-10 [&::-webkit-search-cancel-button]:hidden`}
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex">
          <FilterSelect label="Filter by status" value={query.status} onChange={(v) => onFilterChange("status", v)} options={STATUS_LABELS} allLabel="All statuses" />
          <FilterSelect label="Filter by priority" value={query.priority} onChange={(v) => onFilterChange("priority", v)} options={PRIORITY_LABELS} allLabel="All priorities" />
          <div className="col-span-2 sm:col-span-1">
            <FilterSelect label="Sort tasks" value={query.sort} onChange={(v) => onFilterChange("sort", v)} options={SORT_OPTIONS} />
          </div>
        </div>
      </div>
      {hasActiveFilters && (
        <button type="button" onClick={onClear} className="self-start rounded-sm text-sm font-medium text-accent hover:underline">
          Clear filters
        </button>
      )}
    </div>
  );
}
