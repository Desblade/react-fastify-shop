const queryString = require('node:querystring');
const { logger } = require('../../logger');

const firstStepGoogleAuth = async (request, reply) => {
  try {
    const userFormUrl = process.env.GOOGLE_USER_FORM_URL;
    const queryParams = queryString.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_CALLBACK_URI,
      response_type: 'code',
      scope: 'email profile',
    });

    const userFormUrlWithParams = `${userFormUrl}?${queryParams}`;

    return reply.send(userFormUrlWithParams);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось пройти google аутентификацию' });
  }
};

module.exports = {
  firstStepGoogleAuth,
};
