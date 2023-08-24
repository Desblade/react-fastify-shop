const convertPriceItems = async (items, course) => {
  const convertedItems = await Promise.all(items.map(async (item) => {
    item.price = (item.price / course).toFixed(2);

    return item;
  }));

  return convertedItems;
};

module.exports = {
  convertPriceItems,
};
