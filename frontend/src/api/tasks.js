import { request } from "./client";

const toQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  });
  const qs = query.toString();
  return qs ? `?${qs}` : "";
};

export const listTasks = (params, options) => request(`/tasks${toQueryString(params)}`, options);

export const getTask = (id, options) => request(`/tasks/${encodeURIComponent(id)}`, options);

export const createTask = (task, options) => request("/tasks", { ...options, method: "POST", body: task });

export const updateTask = (id, task, options) =>
  request(`/tasks/${encodeURIComponent(id)}`, { ...options, method: "PUT", body: task });

export const deleteTask = (id, options) =>
  request(`/tasks/${encodeURIComponent(id)}`, { ...options, method: "DELETE" });
