const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');

const mainRouter = async (instance) => {
  instance.register(userRouter, { prefix: '/user' });
  instance.register(adminRouter, { prefix: '/admin' });
};

module.exports = mainRouter;

