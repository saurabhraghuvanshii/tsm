const dotenv = require('dotenv');

dotenv.config({ quiet: true });

const env = {
  PORT: Number(process.env.PORT) || 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

module.exports = { env };
