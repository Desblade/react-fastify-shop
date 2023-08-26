const { logger } = require('../../logger');
const { db } = require('../../db');

const addItemController = async (request, reply) => {
  try {
    const { name, description, price } = request.body;
    const { originalname, filename, size } = request.file;
    const serverUrl = process.env.SERVER_URL;
    const path = `${serverUrl}/uploads/itemsImages/${filename}`;

    await db.transaction(async (trx) => {
      const [file] = await trx('files')
        .insert({
          filename,
          originalName: originalname,
          size,
          path,
        })
        .returning('id');

      await trx('groceires')
        .insert({
          file_id: file.id,
          name,
          description,
          price,
        });
    });

    return reply.send({ message: 'Товар успешно добавлен' });
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
