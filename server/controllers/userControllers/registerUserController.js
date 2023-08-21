const bcrypt = require('bcrypt');
const { logger } = require('../../logger');
const { db } = require('../../db');
const { createToken } = require('../../utils/createToken');

const registerUserController = async (request, reply) => {
  try {
    const {
      email,
      password,
      userConfirmCode,
      name,
    } = request.body;
    const confirmCode = global.cache.get(email);

    if (!confirmCode) {
      return reply
        .code(400)
        .send({ message: 'Код подтверждения истек' });
    }

    if (confirmCode !== userConfirmCode) {
      return reply
        .code(400)
        .send({ message: 'Неправильный код подтверждения' });
    }

    const [user] = await db('users')
      .select('id')
      .where({ email })
      .limit(1);

    if (user) {
      return reply
        .code(400)
        .send({ message: 'Пользователь с такой почтой уже существует' });
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const registerUserWithChat = await db.transaction(async (trx) => {
      const [user] = await trx('users')
        .insert({
          email,
          password: hashPassword,
          role: 'user',
          name,
        })
        .returning(['id', 'email', 'role', 'name']);

      await trx('carts').insert({
        user_id: user.id,
      });

      const [chat] = await trx('chats')
        .insert({
          user_id: user.id,
        })
        .returning('id');

      return {
        user,
        chat,
      };
    });

    const token = await createToken({
      id: registerUserWithChat.user.id,
      email: registerUserWithChat.user.email,
      role: registerUserWithChat.user.role,
      chatId: registerUserWithChat.chat.id,
      name: registerUserWithChat.user.name,
    });

    return reply.send({ token });
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось пройти регистрацию' });
  }
};

module.exports = {
  registerUserController,
};
