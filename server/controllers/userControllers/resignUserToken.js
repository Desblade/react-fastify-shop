const { createToken } = require('../../utils/createToken');
const { logger } = require('../../logger');

const resignUserToken = async (request, reply) => {
  try {
    const { user } = request;
    const token = await createToken(user);

    return reply.send({ token });
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'не удалось перезаписать токен ' });
  }
};

module.exports = {
  resignUserToken,
};
