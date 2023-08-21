const { logger } = require('../../logger');
const { db } = require('../../db');

const deleteItemController = async (request, reply) => {
  try {
    const { id } = request.query;
    const { user } = request;

    if (user.role !== 'admin') {
      return reply
        .code(400)
        .send({ message: 'Вы не являетесь администратором' });
    }

    await db('groceires')
      .where({ id })
      .delete();

    return reply.code(200);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось удалить товар из списка' });
  }
};

module.exports = {
  deleteItemController,
};
