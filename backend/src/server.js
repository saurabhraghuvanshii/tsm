const { app } = require('./app');
const { env } = require('./config/env');
const { seedTasks } = require('./utils/seed');

if (env.NODE_ENV !== 'test') seedTasks();

app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});
