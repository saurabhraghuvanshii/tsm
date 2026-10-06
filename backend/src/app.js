const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { env } = require('./config/env');
const { taskRouter } = require('./routes/task.routes');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: '100kb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const openapiPath = path.join(__dirname, '../../docs/openapi.yaml');
if (fs.existsSync(openapiPath)) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load(openapiPath)));
}

app.use('/api/tasks', taskRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = { app };
