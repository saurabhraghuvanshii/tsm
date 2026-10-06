const { z } = require('zod');

const STATUSES = ['pending', 'in_progress', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];
const SORT_FIELDS = ['createdAt', 'priority', 'dueDate'];

const isRealDate = (value) => {
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
};

const dueDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'dueDate must be in YYYY-MM-DD format')
  .refine(isRealDate, 'dueDate must be a valid calendar date')
  .nullable()
  .optional();

const title = z
  .string({ error: 'title is required' })
  .trim()
  .min(1, 'title is required')
  .max(120, 'title must be at most 120 characters');

const description = z
  .string({ error: 'description is required' })
  .trim()
  .min(1, 'description is required')
  .max(1000, 'description must be at most 1000 characters');

const taskFields = {
  title,
  description,
  status: z.enum(STATUSES, { error: `status must be one of: ${STATUSES.join(', ')}` }).default('pending'),
  priority: z.enum(PRIORITIES, { error: `priority must be one of: ${PRIORITIES.join(', ')}` }).default('medium'),
  dueDate,
};

const createTaskSchema = z.object(taskFields);

const updateTaskSchema = z.object(taskFields);

const emptyToUndefined = (value) => (value === '' ? undefined : value);
const optionalQuery = (schema) => z.preprocess(emptyToUndefined, schema.optional());

const listQuerySchema = z.object({
  search: optionalQuery(z.string().trim()),
  status: optionalQuery(z.enum(STATUSES)),
  priority: optionalQuery(z.enum(PRIORITIES)),
  sortBy: z.preprocess(emptyToUndefined, z.enum(SORT_FIELDS).default('createdAt')),
  order: z.preprocess(emptyToUndefined, z.enum(['asc', 'desc']).default('desc')),
  page: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).default(1)),
  limit: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(50).default(10)),
});

module.exports = { createTaskSchema, updateTaskSchema, listQuerySchema, STATUSES, PRIORITIES };
