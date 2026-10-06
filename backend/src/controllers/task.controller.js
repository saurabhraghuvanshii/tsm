const taskService = require('../services/task.service');

const listTasks = (req, res) => {
  const { items, meta } = taskService.list(req.validatedQuery);
  res.json({ data: items, meta });
};

const getTask = (req, res) => {
  res.json({ data: taskService.getById(req.params.id) });
};

const createTask = (req, res) => {
  res.status(201).json({ data: taskService.create(req.body) });
};

const updateTask = (req, res) => {
  res.json({ data: taskService.update(req.params.id, req.body) });
};

const deleteTask = (req, res) => {
  taskService.remove(req.params.id);
  res.json({ message: 'Task deleted successfully' });
};

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
