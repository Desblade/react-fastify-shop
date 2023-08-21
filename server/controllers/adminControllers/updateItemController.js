const { logger } = require('../../logger');
const { db } = require('../../db');

const updateItemController = async (request, reply) => {
  try {
    const { name, description, price } = request.body;
    const { id } = request.query;
    const update = {};

    const [item] = await db('groceires')
      .select('id')
      .where({ id })
      .limit(1);

    if (!item) {
      return reply
        .code(404)
        .send({ message: 'Не удалось найти товар' });
    }

    if (name) {
      update.name = name;
    }

    if (description) {
      update.description = description;
    }

    if (price) {
      update.price = price;
    }

    const [updatedItem] = await db('groceires')
      .where({ id })
      .update(update)
      .returning(['id', 'name', 'description', 'price']);

    return reply.send(updatedItem);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось обновить товар' });
  }
};

module.exports = {
  updateItemController,
};
