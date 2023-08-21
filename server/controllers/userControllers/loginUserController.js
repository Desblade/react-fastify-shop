const bcrypt = require('bcrypt');
const { logger } = require('../../logger');
const { db } = require('../../db');
const { createToken } = require('../../utils/createToken');

const loginUserController = async (request, reply) => {
  try {
    const { email, password } = request.body;

    const [user] = await db('users')
      .select(['id', 'email', 'password', 'role'])
      .where({ email })
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
