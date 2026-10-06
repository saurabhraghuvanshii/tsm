const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isRealDate = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
};

export function validateTask(values) {
  const errors = {};
  const title = (values.title || "").trim();
  const description = (values.description || "").trim();

  if (!title) errors.title = "Title is required";
  else if (title.length > 120) errors.title = "Title must be at most 120 characters";

  if (!description) errors.description = "Description is required";
  else if (description.length > 1000) errors.description = "Description must be at most 1000 characters";

  if (values.dueDate && (!DATE_PATTERN.test(values.dueDate) || !isRealDate(values.dueDate))) {
    errors.dueDate = "Enter a valid date (YYYY-MM-DD)";
  }

  return errors;
}
