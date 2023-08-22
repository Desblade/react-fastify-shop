const convertPriceItems = (listItems, value) => Promise.all(listItems.map((item) => {
  item.price = (item.price / value).toFixed(2);

  return item;
}));

module.exports = {
  convertPriceItems,
};
