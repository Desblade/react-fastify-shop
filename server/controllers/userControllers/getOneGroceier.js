const { logger } = require('../../logger');
const { db } = require('../../db');

const getOneGroceier = async (request, reply) => {
  try {
    const { id } = request.params;

    const [item] = await db('groceires as g')
      .innerJoin('files as f', 'g.file_id', 'f.id')
      .leftJoin('items as i', 'g.id', 'i.groceires_id')
      .select(['f.path', 'g.id', 'g.name', 'g.description', 'g.price', 'i.count'])
      .where('g.id', id)
      .limit(1);

    if (!item) {
      return reply
        .code(404)
        .send({ message: 'Нужный товар не найден' });
    }

    return reply.send(item);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось получить нужный товар' });
  }
};

module.exports = {
  getOneGroceier,
};
