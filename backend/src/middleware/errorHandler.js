const { AppError } = require('../utils/AppError');
const { env } = require('../config/env');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    const body = { message: err.message };
    if (err.details) body.details = err.details;
    return res.status(err.statusCode).json({ error: body });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { message: 'Malformed JSON in request body' } });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: { message: 'Request body too large' } });
  }

  if (env.NODE_ENV !== 'test') console.error(err);

  const body = { message: 'Internal server error' };
  if (env.NODE_ENV === 'development') body.details = err.stack;
  return res.status(500).json({ error: body });
};

module.exports = { errorHandler };
