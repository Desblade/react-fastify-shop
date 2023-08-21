const bcrypt = require('bcrypt');
const { logger } = require('../../logger');
const { db } = require('../../db');
const { createToken } = require('../../utils/createToken');

const loginUserController = async (request, reply) => {
  try {
    const { email, password } = request.body;

    const [user] = await db('users as u')
      .leftJoin('chats as c', 'c.user_id', 'u.id')
      .where('u.email', email)
      .select(['u.id', 'u.email', 'u.password', 'u.role', 'c.id as chatId', 'u.name'])
      .limit(1);

    if (!user) {
      return reply
        .code(400)
        .send({ message: 'Неверный логин или пароль' });
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return reply
        .code(400)
        .send({ message: 'Неверный логин или пароль' });
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
      chatId: user.chatId,
      name: user.name
    });

    return reply.send({ token });
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось авторизоваться' });
  }
};

module.exports = {
  loginUserController,
};
