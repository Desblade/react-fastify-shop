const { logger } = require('../../../logger');
const { db } = require('../../../db');

const getAllMessages = async (chatId) => {
  try {
    const allMessages = await db('messages as m')
      .innerJoin('users as u', 'u.id', 'm.user_id')
      .leftJoin('usersAvatars as ua', 'ua.user_id', 'u.id')
      .where('m.chat_id', chatId)
      .select(['m.id', 'm.messageText', 'u.name', 'u.email', 'ua.path']);

    return allMessages;
  } catch (e) {
    logger.error(e.message);

    throw new Error(e.message);
  }
};

module.exports = {
  getAllMessages,
};
