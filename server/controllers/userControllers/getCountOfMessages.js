const { logger } = require('../../logger');
const { db } = require('../../db');

const getCountOfMessages = async (request, reply) => {
  try {
    const { user } = request;

    const countOfMessages = await db('messages')
      .select('id')
      .where({ chat_id: user.chatId })
      .andWhereNot({ user_id: user.id });

    logger.info(countOfMessages.length);

    return reply.send(countOfMessages.length);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось получить количество сообщений' });
  }
};

module.exports = {
  getCountOfMessages,
};
