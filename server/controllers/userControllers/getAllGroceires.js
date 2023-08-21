const axios = require('axios');
const { logger } = require('../../logger');
const { db } = require('../../db');
const { convertPriceItems } = require('../../utils/convertPriceItems');

const getAllGroceires = async (request, reply) => {
  try {
    const allGroceires = await db('groceires as g')
      .innerJoin('files as f', 'g.file_id', 'f.id')
      .select(['f.path', 'g.id', 'g.name', 'g.description', 'g.price']);

    const {
      data: {
        data: { RUB },
      },
    } = await axios.get(process.env.API_CURRENCY_CONVERT_URL);

    if (!allGroceires.length) {
      return reply
        .code(404)
        .send({ message: 'Не удалось найти товары' });
    }

    const convertedAllGroceires = await convertPriceItems(allGroceires, RUB);

    return reply.send(convertedAllGroceires);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось получить все товары' });
  }
};

module.exports = {
  getAllGroceires,
};
