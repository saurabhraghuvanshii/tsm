const { randomUUID } = require('crypto');
const { AppError } = require('../utils/AppError');

const PRIORITY_RANK = { low: 0, medium: 1, high: 2 };

let tasks = [];

const findIndex = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) throw new AppError('Task not found', 404);
  return index;
};

const compareBy = (sortBy, order) => {
  const direction = order === 'asc' ? 1 : -1;
  return (a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate) * direction;
    }
    if (sortBy === 'priority') {
      return (PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]) * direction;
    }
    return a.createdAt.localeCompare(b.createdAt) * direction;
  };
};

const list = ({ search, status, priority, sortBy, order, page, limit }) => {
  const term = search?.toLowerCase();
  const filtered = tasks.filter(
    (task) =>
      (!term || task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term)) &&
      (!status || task.status === status) &&
      (!priority || task.priority === priority),
  );
  const sorted = [...filtered].sort(compareBy(sortBy, order));
  const total = sorted.length;
  const start = (page - 1) * limit;
  return {
    items: sorted.slice(start, start + limit),
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getById = (id) => tasks[findIndex(id)];

const create = ({ title, description, status, priority, dueDate }) => {
  const now = new Date().toISOString();
  const task = {
    id: randomUUID(),
    title,
    description,
    status,
    priority,
    dueDate: dueDate ?? null,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return task;
};

const update = (id, { title, description, status, priority, dueDate }) => {
  const index = findIndex(id);
  const updated = {
    ...tasks[index],
    title,
    description,
    status,
    priority,
    dueDate: dueDate ?? null,
    updatedAt: new Date().toISOString(),
  };
  tasks[index] = updated;
  return updated;
};

const remove = (id) => {
  const index = findIndex(id);
  tasks.splice(index, 1);
};

const reset = (items = []) => {
  tasks = [...items];
};

module.exports = { list, getById, create, update, remove, reset };
