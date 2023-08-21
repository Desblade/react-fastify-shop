const multipart = require('@fastify/multipart');
const { checkUserToken } = require('../middlewares/checkUserToken');
const { addItemController } = require('../controllers/adminControllers/addItemController');
const { updateItemController } = require('../controllers/adminControllers/updateItemController');
const { deleteItemController } = require('../controllers/adminControllers/deleteItemController');
const { checkAdminRole } = require('../middlewares/checkAdminRole');
const { upload } = require('../middlewares/uploadMedia');

const adminRouter = async (instance) => {
  instance
    .addHook('preHandler', checkUserToken, checkAdminRole)
    .register(multipart)
    .post('/', { preHandler: [upload.single('file')] }, addItemController)
    .patch('/', updateItemController)
    .delete('/', deleteItemController);
};

module.exports = adminRouter;