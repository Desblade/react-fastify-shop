const { logger } = require('../../logger');
const { db } = require('../../db');

const addItemInBucket = async (request, reply) => {
  try {
    const { id } = request.query;
    const { count } = request.body;
    const { user } = request;

    const [item] = await db('items as i')
      .innerJoin('carts as c', 'i.cart_id', 'c.id')
      .select(['i.count', 'i.id'])
      .where('i.groceires_id', id)
      .andWhere('c.user_id', user.id)
      .limit(1);

    if (item) {
      await db('items')
        .where({ id: item.id })
        .update({ count: (item.count += count) });

      return reply
        .code(200)
        .send();
    }

    const [cart] = await db('carts')
      .select('id')
      .where({ user_id: user.id })
      .limit(1);

    if (!cart) {
      return reply
        .code(404)
        .send({ message: 'Корзина не найдена' });
    }

    await db('items')
      .insert({
        cart_id: cart.id,
        groceires_id: id,
        count,
      });

    return reply
      .code(200)
      .send();
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось добавить товар в корзину' });
  }
};

module.exports = {
  addItemInBucket,
};
