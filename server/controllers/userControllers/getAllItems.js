const { logger } = require('../../logger');
const { db } = require('../../db');
const axios = require('axios');
const { convertPriceItems } = require('../../utils/convertPriceItems');
const { convertPriceItemsWithTotalPrice } = require('../../utils/convertPriceItemsWithTotalPrice');

const getAllItems = async (request, reply) => {
  try {
    let course = global.cache.get('course');
    const { user } = request;
    const allItems = await db('items as i')
      .innerJoin('carts as c', 'c.id', 'i.cart_id')
      .innerJoin('groceires as g', 'g.id', 'i.groceires_id')
      .innerJoin('files as f', 'f.id', 'g.file_id')
      .where('c.user_id', user.id)
      .select(['i.id', 'i.count', 'f.path', 'g.name', 'g.description', 'g.price']);

    if (!course) {
      const {
        data: {
          data: { RUB },
        },
      } = await axios.get(process.env.API_CURRENCY_CONVERT_URL);

      global.cache.set('course', RUB);

      course = RUB;
    }

    const convertedAllItems = await convertPriceItemsWithTotalPrice(allItems, course);

    return reply.send(convertedAllItems);
  } catch (e) {
    logger.error(e.message);

    return reply
      .code(500)
      .send({ message: 'Не удалось получить все товары из корзины' });
  }
};

module.exports = {
  getAllItems,
};
