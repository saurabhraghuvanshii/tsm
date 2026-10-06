"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { deleteTask, getTask, listTasks } from "@/api/tasks";
import { isAbortError } from "@/api/client";

function useRequest(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const run = useCallback(
    async (...args) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      setLoading(true);
      setError(null);
      try {
        setData(await fetcher(...args, { signal: controller.signal }));
      } catch (err) {
        if (!isAbortError(err)) setError(err);
      } finally {
        if (controllerRef.current === controller) setLoading(false);
      }
    },
    [fetcher],
  );

  const abort = useCallback(() => controllerRef.current?.abort(), []);

  return { data, loading, error, run, abort };
}

export function useTasks(params = {}) {
  const { data, loading, error, run, abort } = useRequest(listTasks);
  const key = JSON.stringify(params);
  const paramsRef = useRef(params);

  const fetchTasks = useCallback(
    (nextParams) => {
      paramsRef.current = nextParams;
      return run(nextParams);
    },
    [run],
  );

  const refetch = useCallback(() => fetchTasks(paramsRef.current), [fetchTasks]);

  const remove = useCallback((id) => deleteTask(id), []);

  useEffect(() => {
    fetchTasks(JSON.parse(key));
    return abort;
  }, [key, fetchTasks, abort]);

  return { tasks: data?.data ?? [], meta: data?.meta ?? null, loading, error, fetchTasks, refetch, remove };
}

export function useTask(id) {
  const { data, loading, error, run, abort } = useRequest(getTask);

  const refetch = useCallback(() => run(id), [run, id]);

  useEffect(() => {
    run(id);
    return abort;
  }, [id, run, abort]);

  return { task: data?.data ?? null, loading, error, refetch };
}
