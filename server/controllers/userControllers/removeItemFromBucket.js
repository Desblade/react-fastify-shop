const { logger } = require('../../logger');
const { db } = require('../../db');

const removeItemFromBucket = async (request, reply) => {
  try {
    const { id } = request.query;
    const { user } = request;

    const [item] = await db('items')
      .select('id')
      .where({ groceires_id: id })
      .limit(1);

    if (!item) {
      return reply
        .code(500)
        .send({ message: 'Товар не найден' });
    }

    await db('items as i')
      .innerJoin('carts as c', 'i.cart_id', 'c.id')
      .where('c.user_id', user.id)
      .andWhere({ groceires_id: id })
      .delete();

    return reply.code(200);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось убрать товар из корзины' });
  }
};

module.exports = {
  removeItemFromBucket,
};
