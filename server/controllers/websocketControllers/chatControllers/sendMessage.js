const { logger } = require('../../../logger');
const { db } = require('../../../db');

const sendMessage = async (messageText, chatId, userId) => {
  try {
    await db('messages')
      .insert({
        messageText,
        chat_id: chatId,
        user_id: userId,
      });
  } catch (e) {
    logger.error(e.message);

    throw new Error(e.message);
  }
};

module.exports = {
  sendMessage,
};
