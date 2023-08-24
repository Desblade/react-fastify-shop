const convertPriceItemsWithTotalPrice = async (items, course) => {
  const itemsWithTotalPrice = await Promise.all(items.map(async (item) => {
    item.price = ((item.price / course).toFixed(2)) * item.count;

    return item;
  }));

  return itemsWithTotalPrice;
};

module.exports = {
  convertPriceItemsWithTotalPrice,
};
