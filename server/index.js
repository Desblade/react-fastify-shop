const path = require('path');
const fastify = require('fastify');
const fastifyStatic = require('@fastify/static');
const fastifyCors = require('@fastify/cors');
const socketIO = require('fastify-socket.io');
require('dotenv').config();
const NodeCache = require('node-cache');
const router = require('./routers/index');
const { logger } = require('./logger');
const { db } = require('./db');
const { getAllMessages } = require('./controllers/websocketControllers/chatControllers/getAllMessages');
const { sendMessage } = require('./controllers/websocketControllers/chatControllers/sendMessage');

const app = fastify();

const port = process.env.PORT || 5300;
const middlewaresOptions = [
  {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'UPDATE', 'DELETE'],
  },
  {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads',
  },
  {
    cors: {
      origin: '*',
    },
  },
];

const cache = new NodeCache();
global.cache = cache;

db.migrate.latest();

app.register(fastifyCors, middlewaresOptions[0]);
app.register(fastifyStatic, middlewaresOptions[1]);
app.register(socketIO, middlewaresOptions[2]);
app.register(router, { prefix: '/api' });

app.ready((err) => {
  if (err) {
    logger.error(err.message);

    throw new Error(err.message);
  }

  app.io.on('connection', (socket) => {

    socket.on('joinRoom', async (roomName, chatId) => {
      socket.join(roomName);

      const allMessages = await getAllMessages(chatId);
      const jsonAllMessages = JSON.stringify(allMessages);

      app.io.to(roomName).emit('allMessages', jsonAllMessages);
    });

    socket.on('message', async (dataJson) => {
      const data = JSON.parse(dataJson);
      await sendMessage(data.messageText, data.chatId, data.userId);

      app.io.to(data.roomName).emit('message', dataJson);
    });

    socket.on('disconnect', () => {
      socket.disconnect();
    });
  });
});

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