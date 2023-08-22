const { logger } = require('../../logger');
const { db } = require('../../db');

const getAllItems = async (request, reply) => {
  try {
    const { user } = request;

    const items = await db('items as i')
      .innerJoin('carts as c', 'c.id', 'i.cart_id')
      .innerJoin('groceires as g', 'g.id', 'i.groceires_id')
      .innerJoin('files as f', 'f.id', 'g.file_id')
      .where('c.user_id', user.id)
      .select(['i.id', 'i.count', 'f.path', 'g.name', 'g.description', 'g.price']);

    const allItems = items.map(item => ({
      id: item.id,
      count: item.count,
      path: item.path,
      name: item.name,
      description: item.description,
      price: item.price * item.count,
    }));

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
