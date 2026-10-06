const { Router } = require('express');
const controller = require('../controllers/task.controller');
const { validate } = require('../middleware/validate');
const { createTaskSchema, updateTaskSchema, listQuerySchema } = require('../validators/task.validator');

const taskRouter = Router();

taskRouter.get('/', validate(listQuerySchema, 'query'), controller.listTasks);
taskRouter.get('/:id', controller.getTask);
taskRouter.post('/', validate(createTaskSchema, 'body'), controller.createTask);
taskRouter.put('/:id', validate(updateTaskSchema, 'body'), controller.updateTask);
taskRouter.delete('/:id', controller.deleteTask);

module.exports = { taskRouter };
