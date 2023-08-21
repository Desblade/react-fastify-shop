const generatePassword = (length = 8) => {
  const lettersAndDigits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += lettersAndDigits.charAt(Math.floor(Math.random() * lettersAndDigits.length));
  }
  return password;
};

module.exports = {
  generatePassword,
};
