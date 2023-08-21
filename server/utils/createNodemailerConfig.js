const nodemailer = require('nodemailer');

const createNodemailerConfig = (mail, confirmCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.HOST_MAIL,
      pass: process.env.HOST_MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.HOST_MAIL,
    to: mail,
    subject: 'CONFIRM YOUR CODE',
    text: `YOUR CONFIRM CODE IS ${confirmCode}`,
  };

  return {
    transporter,
    mailOptions,
  };
};

module.exports = {
  createNodemailerConfig,
};
