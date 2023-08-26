const fs = require('fs');
const { logger } = require('../../logger');
const { db } = require('../../db');

const saveAvatar = async (request, reply) => {
  try {
    const { user } = request;
    const { originalname, filename, size } = request.file;
    const path = `http://localhost:5100/uploads/usersAvatars/${filename}`;

    const [userAvatar] = await db('usersAvatars')
      .select(['id', 'filename'])
      .where({ user_id: user.id })
      .limit(1);

    if (userAvatar) {
      await db('usersAvatars')
        .where({ id: userAvatar.id })
        .delete();
      // удаление фото с бэка
      const pathToAvatar = `uploads/usersAvatars/${userAvatar.filename}`;

      await fs.unlink(pathToAvatar, (err) => {
        if (err) {
          logger.error(err.message);

          throw new Error(err.message);
        } else {
          logger.info('Фото успешно удалено');
        }
      });
    }

    const [pathAvatar] = await db('usersAvatars')
      .insert({
        user_id: user.id,
        filename,
        originalName: originalname,
        size,
        path,
      })
      .returning('path');

    return reply.send({ pathAvatar, message: 'Аватар успешно сохранен' });
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  saveAvatar,
};
