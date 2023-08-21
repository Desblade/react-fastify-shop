const generateRandomPassword = (length) =>
  new Promise((resolve, reject) => {
    try {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
      }

      resolve(password);
    } catch (e) {
      return reject(e.message);
    }
  });

module.exports = {
  generateRandomPassword,
};
