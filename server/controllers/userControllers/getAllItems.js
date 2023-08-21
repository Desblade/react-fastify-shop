const { logger } = require('../../logger');
const { db } = require('../../db');

const getAllItems = async (request, reply) => {
  try {
    const { user } = request;

    const [cart] = await db('carts')
      .select('id')
      .where({ user_id: user.id })
      .limit(1);

    if (!cart) {
      return reply
        .code(404)
        .send({ message: 'Не удалось найти корзину' });
    }

    const allItems = await db('groceires as g')
      .select(['g.id', 'i.count', 'g.name', 'g.description', 'g.price'])
      .innerJoin('items as i', 'g.id', 'i.groceires_id')
      .where('i.cart_id', cart.id);

    return reply.send(allItems);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось получить все товары из корзины' });
  }
};

module.exports = {
  getAllItems,
};
