const axios = require('axios');
const bcrypt = require('bcrypt');
const { logger } = require('../../logger');
const { db } = require('../../db');
const { createToken } = require('../../utils/createToken');
const { generateRandomPassword } = require('../../utils/generateRandomPassword');

const secondStepGoogleAuth = async (request, reply) => {
  const { code } = request.query;
  const userTokenUrl = process.env.GOOGLE_USER_TOKEN_URL;
  const userInfoUrl = process.env.GOOGLE_USER_INFO_URL;
  const clientUrl = process.env.CLIENT_URL;

  try {
    const { data: { access_token } } = await axios.post(userTokenUrl, {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      redirect_uri: process.env.GOOGLE_CALLBACK_URI,
      grant_type: 'authorization_code',
    });

    const { data } = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const [user] = await db('users as u')
      .leftJoin('chats as c', 'c.user_id', 'u.id')
      .select(['u.id', 'u.email', 'c.id as chatId', 'u.name'])
      .where('u.email', data.email)
      .limit(1);

    if (user) {
      const token = await createToken({
        id: user.id,
        email: user.email,
        role: 'user',
        chatId: user.chatId,
        name: user.name,
      });

      return reply.redirect(`${clientUrl}/?token=${token}`);
    }

    const newUserWithChat = await db.transaction(async (trx) => {
      const newPassword = await generateRandomPassword(8);
      const newHashPassword = await bcrypt.hash(newPassword, 5);

      const [newRegisterUser] = await trx('users')
        .insert({
          email: data.email,
          role: 'user',
          name: data.name,
          password: newHashPassword,
        })
        .returning(['id', 'email', 'name']);

      await trx('carts')
        .insert({
          user_id: newRegisterUser.id,
        });

      const [chat] = await trx('chats')
        .insert({
          user_id: newRegisterUser.id,
        })
        .returning('id');

      return {
        newRegisterUser,
        chat,
      };
    });

    const token = await createToken({
      id: newUserWithChat.newRegisterUser.id,
      email: newUserWithChat.newRegisterUser.email,
      role: 'user',
      chatId: newUserWithChat.chat.id,
      name: newUserWithChat.newRegisterUser.name,
    });

    return reply.redirect(`${clientUrl}/?token=${token}`);
  } catch (e) {
    logger.error(e.message);

    return reply.redirect(`${clientUrl}/register`);
  }
};

module.exports = {
  secondStepGoogleAuth,
};
