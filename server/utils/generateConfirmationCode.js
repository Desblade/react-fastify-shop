const generateConfirmationCode = () =>
  new Promise((resolve, reject) => {
    try {
      const confirmCode =  Math
        .random()
        .toString(36)
        .toUpperCase();

      resolve(confirmCode);
    } catch (e) {
      return reject(e.message);
    }
  });

module.exports = {
  generateConfirmationCode,
};
