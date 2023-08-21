const { logger } = require('../../logger');
const { db } = require('../../db');

const addItemController = async (request, reply) => {
  try {
    const { name, description, price } = request.body;
    const { originalname, filename, size } = request.file;
    const serverUrl = process.env.SERVER_URL;
    const path = `${serverUrl}/uploads/itemsImages/${filename}`;

    const groceier = await db.transaction(async (trx) => {
      const [file] = await trx('files')
        .insert({
          filename,
          originalName: originalname,
          size,
          path,
        })
        .returning('id');

      const [groceier] = await trx('groceires')
        .insert({
          file_id: file.id,
          name,
          description,
          price,
        })
        .returning(['file_id', 'name', 'description', 'price']);

      return groceier;
    });

    return reply.send({ groceier, message: 'Товар успешно добавлен' });
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось добавить товар в список' });
  }
};

module.exports = {
  addItemController,
};
