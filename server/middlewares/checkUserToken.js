const { logger } = require('../logger');
const { verifyToken } = require('../utils/verifyToken');

const checkUserToken = async (request, reply) => {
  const token = request.headers?.authorization?.split(' ')[1];

  if (token) {
    try {
      const user = await verifyToken(token);

      request.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        chatId: user.chatId,
        name: user.name,
      };

      return;
    } catch (e) {
      logger.error(e.message);

      return reply
        .code(401)
        .send({ message: 'Вы не авторизованы' });
    }
  }
  return reply
    .code(401)
    .send({ message: 'Вы не авторизованы' });
};

module.exports = {
  checkUserToken,
};
