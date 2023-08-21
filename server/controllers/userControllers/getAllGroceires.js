const axios = require('axios');
const { logger } = require('../../logger');
const { db } = require('../../db');

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

    allGroceires.forEach((groceier) => {
      groceier.price = (groceier.price / RUB).toFixed(2);
    });

    return reply.send(allGroceires);
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
