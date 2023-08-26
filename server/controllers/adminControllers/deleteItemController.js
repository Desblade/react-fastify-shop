const fs = require('fs');
const { logger } = require('../../logger');
const { db } = require('../../db');

const deleteItemController = async (request, reply) => {
  try {
    const { id } = request.query;

    const [groceier] = await db('groceires as g')
      .innerJoin('files as f', 'f.id', 'g.file_id')
      .select(['f.filename'])
      .where('g.id', id)
      .limit(1);

    if (!groceier) {
      return reply
        .code(404)
        .send({ message: 'Товар с таким ID не найден' });
    }

    await db('groceires')
      .where({ id })
      .delete();

    const pathToFile = `uploads/itemsImages/${groceier.filename}`;

    await fs.unlink(pathToFile, (err) => {
      if (err) {
        logger.error(err.message);

        throw new Error(err.message);
      }
      logger.info('Товар успешно удален с бэкэнда');
    });

    return reply.send({ message: `Товар под ID: ${id} успешно удален` });
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
