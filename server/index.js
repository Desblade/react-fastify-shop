const path = require('path');
const fastify = require('fastify');
const fastifyStatic = require('@fastify/static');
const fastifyCors = require('@fastify/cors');
require('dotenv').config();
const NodeCache = require('node-cache');
const router = require('./routers/index');
const { logger } = require('./logger');
const { db } = require('./db');

const app = fastify();

const port = process.env.PORT || 5300;
const middlewaresOptions = [
  {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'UPDATE', 'DELETE'],
  },
  {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads',
  },
];

const cache = new NodeCache();
global.cache = cache;

db.migrate.latest();

app.register(fastifyCors, middlewaresOptions[0]);
app.register(fastifyStatic, middlewaresOptions[1]);
app.register(router, { prefix: '/api' });

const start = async () => {
  await app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      logger.error(err.message);
      process.exit(1);
    }
    logger.info(address);
  });
};

module.exports = {
  app,
};

start();