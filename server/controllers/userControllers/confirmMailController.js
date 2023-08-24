const { logger } = require('../../logger');
const { generateConfirmationCode } = require('../../utils/generateConfirmationCode');
const { createNodemailerConfig } = require('../../utils/createNodemailerConfig');
const { db } = require('../../db');

const confirmMailController = async (request, reply) => {
  try {
    const { email } = request.body;
    const timeLifeCache = process.env.TIME_LIFE_CACHE;

    if (!email) {
      return reply
        .code(400)
        .send({ message: 'Не указана почта' });
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

    const confirmCode = await generateConfirmationCode();
    global.cache.set(email, confirmCode, timeLifeCache);

    const { transporter, mailOptions } = await createNodemailerConfig(email, confirmCode);
    await transporter.sendMail(mailOptions);

    return reply
      .code(200)
      .send();
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось подтвердить почту' });
  }
};

module.exports = {
  confirmMailController,
};
