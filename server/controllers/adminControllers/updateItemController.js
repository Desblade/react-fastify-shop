const fs = require('fs');
const { logger } = require('../../logger');
const { db } = require('../../db');

const updateItemController = async (request, reply) => {
  try {
    const { name, description, price } = request.body;
    const { originalname, filename, size } = request.file;
    const { id } = request.query;
    const update = {};
    const serverUrl = process.env.SERVER_URL;

    if (!name && !description && !price && !filename) {
      return reply
        .code(404)
        .send({ message: 'Укажите как минимум 1 поле' });
    }

    const [item] = await db('groceires as g')
      .innerJoin('files as f', 'f.id', 'g.file_id')
      .select(['f.filename', 'g.file_id'])
      .where('g.id', id)
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

    if (filename || originalname || size) {
      await db('files')
        .where({ id: item.file_id })
        .update({
          originalName: originalname,
          filename,
          size,
          path: `${serverUrl}/uploads/itemsImages/${filename}`
        })
        .returning('path');

      const pathToFile = `uploads/itemsImages/${item.filename}`;
      await fs.unlink(pathToFile, (err) => {
        if (err) {
          logger.error(err.message);

          throw new Error(err.message);
        }
        logger.info('Изображение успешно изменено');
      });
    }

    if (!name && !description && !price && (filename || originalname || size)) {
      return reply.send({ message: 'Товар успешно изменен' });
    }

    await db('groceires')
      .where({ id })
      .update(update);

    return reply.send({ message: 'Товар успешно изменен' });

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
