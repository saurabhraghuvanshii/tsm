"use client";

import { useCallback, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PRIORITY_LABELS, STATUS_LABELS } from "@/utils/format";
import { useDebounce } from "./useDebounce";

export const SORT_OPTIONS = {
  newest: { label: "Newest first", sortBy: "createdAt", order: "desc" },
  oldest: { label: "Oldest first", sortBy: "createdAt", order: "asc" },
  priority_desc: { label: "Priority: high → low", sortBy: "priority", order: "desc" },
  priority_asc: { label: "Priority: low → high", sortBy: "priority", order: "asc" },
  due_asc: { label: "Due: soonest", sortBy: "dueDate", order: "asc" },
  due_desc: { label: "Due: latest", sortBy: "dueDate", order: "desc" },
};

export const PAGE_SIZES = [10, 20, 50];

const DEFAULTS = { search: "", status: "", priority: "", sort: "newest", page: 1, limit: 10 };

const oneOf = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);

function parseQuery(params) {
  const page = Number.parseInt(params.get("page"), 10);
  return {
    search: params.get("search") ?? "",
    status: oneOf(params.get("status"), Object.keys(STATUS_LABELS), ""),
    priority: oneOf(params.get("priority"), Object.keys(PRIORITY_LABELS), ""),
    sort: oneOf(params.get("sort"), Object.keys(SORT_OPTIONS), DEFAULTS.sort),
    page: page > 0 ? page : DEFAULTS.page,
    limit: oneOf(Number(params.get("limit")), PAGE_SIZES, DEFAULTS.limit),
  };
}

export function useTaskQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = useMemo(() => parseQuery(searchParams), [searchParams]);

  const [searchInput, setSearchInput] = useState(query.search);
  const [urlSearch, setUrlSearch] = useState(query.search);
  const debouncedSearch = useDebounce(searchInput.trim(), 400);

  if (query.search !== urlSearch) {
    setUrlSearch(query.search);
    if (query.search !== debouncedSearch) setSearchInput(query.search);
  }

  const latestQuery = useRef(query);
  useEffect(() => {
    latestQuery.current = query;
  }, [query]);

  const update = useCallback(
    (patch) => {
      const next = { ...latestQuery.current, page: DEFAULTS.page, ...patch };
      latestQuery.current = next;
      const params = new URLSearchParams();
      Object.entries(next).forEach(([key, value]) => {
        if (value !== DEFAULTS[key]) params.set(key, String(value));
      });
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const syncSearch = useEffectEvent((value) => {
    if (value !== latestQuery.current.search) update({ search: value });
  });

  useEffect(() => {
    syncSearch(debouncedSearch);
  }, [debouncedSearch]);

  const setFilter = useCallback((name, value) => update({ [name]: value }), [update]);
  const setPage = useCallback((page) => update({ page }), [update]);
  const setLimit = useCallback((limit) => update({ limit }), [update]);

  const clearFilters = useCallback(() => {
    setSearchInput("");
    update({ search: "", status: "", priority: "" });
  }, [update]);

  const apiParams = useMemo(() => {
    const { sortBy, order } = SORT_OPTIONS[query.sort];
    return {
      search: query.search,
      status: query.status,
      priority: query.priority,
      sortBy,
      order,
      page: query.page,
      limit: query.limit,
    };
  }, [query]);

  return {
    query,
    apiParams,
    searchInput,
    setSearchInput,
    setFilter,
    setPage,
    setLimit,
    clearFilters,
    hasActiveFilters: Boolean(query.search || query.status || query.priority),
  };
}
