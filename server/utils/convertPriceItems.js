const convertPriceItems = (listItems, value) => new Promise((resolve, reject) => {
  try {
    const convertedListItems = listItems.map((item) => {
      item.price = (item.price / value).toFixed(2);

      return item;
    });

    resolve(convertedListItems);
  } catch (e) {
    return reject(e.message);
  }
});

module.exports = {
  convertPriceItems,
};
