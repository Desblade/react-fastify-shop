const { logger } = require('../../logger');
const { db } = require('../../db');

const getAllChats = async (request, reply) => {
  try {
    const chats = await db('chats as c')
      .innerJoin('users as u', 'u.id', 'c.user_id')
      .select(['c.id as chatId', 'u.email', 'u.name']);

    if (!chats.length) {
      return reply
        .code(404)
        .send({ message: 'Ни 1 чат еще не был начат' });
    }

    return reply.send(chats);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось получить чаты' });
  }
};

module.exports = {
  getAllChats,
};
