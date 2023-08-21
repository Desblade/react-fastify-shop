const { logger } = require('../../logger');
const { db } = require('../../db');

const getAvatarForUser = async (request, reply) => {
  try {
    const { user } = request;

    const [userAvatar] = await db('usersAvatars')
      .select('path')
      .where({ user_id: user.id })
      .limit(1);

    if (!userAvatar.path) {
      return reply
        .code(404)
        .send({ message: 'Аватар не найден' });
    }

    return reply.send(userAvatar.path);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось получить аватар' });
  }
};

module.exports = {
  getAvatarForUser,
};
