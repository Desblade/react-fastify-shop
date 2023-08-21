const multipart = require('@fastify/multipart');
const { saveAvatar } = require('../controllers/userControllers/saveAvatar');
const { uploadAvatars } = require('../middlewares/uploadMedia');
const { registerUserController } = require('../controllers/userControllers/registerUserController');
const { loginUserController } = require('../controllers/userControllers/loginUserController');
const { checkUserToken } = require('../middlewares/checkUserToken');
const { resignUserToken } = require('../controllers/userControllers/resignUserToken');
const { getAllGroceires } = require('../controllers/userControllers/getAllGroceires');
const { addItemInBucket } = require('../controllers/userControllers/addItemInBucket');
const { removeItemFromBucket } = require('../controllers/userControllers/removeItemFromBucket');
const { getAllItems } = require('../controllers/userControllers/getAllItems');
const { getOneGroceier } = require('../controllers/userControllers/getOneGroceier');
const { getAvatarForUser } = require('../controllers/userControllers/getAvatarForUser');
const { confirmMailController } = require('../controllers/userControllers/confirmMailController');
const { registerSchema, loginSchema } = require('../schemas/registerSchema');
const { firstStepGoogleAuth } = require('../controllers/userControllers/firstStepGoogleAuth');
const { secondStepGoogleAuth } = require('../controllers/userControllers/secondStepGoogleAuth');
const { getCountOfMessages } = require('../controllers/userControllers/getCountOfMessages');

const userRouter = async (instance) => {
  instance
    .register(multipart)
    .get('/check', { preHandler: [checkUserToken] }, resignUserToken)
    .get('/getAll', getAllGroceires)
    .get('/getItems', { preHandler: [checkUserToken] }, getAllItems)
    .get('/getItem/:id', getOneGroceier)
    .get('/getCountMessages', { preHandler: [checkUserToken] }, getCountOfMessages)
    .get('/getAvatar', { preHandler: [checkUserToken] }, getAvatarForUser)
    .get('/google/auth', firstStepGoogleAuth)
    .get('/google/auth/callback', secondStepGoogleAuth)
    .post('/confirmMail', confirmMailController)
    .post('/register', { schema: registerSchema }, registerUserController)
    .post('/login', { schema: loginSchema }, loginUserController)
    .post('/addInCart', { preHandler: [checkUserToken] }, addItemInBucket)
    .post('/saveAvatar', { preHandler: [checkUserToken, uploadAvatars.single('file')] }, saveAvatar)
    .delete('/removeItem', { preHandler: [checkUserToken] }, removeItemFromBucket);
};

module.exports = userRouter;
