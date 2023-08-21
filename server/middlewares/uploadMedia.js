const multer = require('fastify-multer');

const uploadFunc = (folder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });
};

const storage = uploadFunc('uploads/itemsImages/');
const storageAvatars = uploadFunc('uploads/itemsAvatars/');

const upload = multer({ storage });
const uploadAvatars = multer({ storage: storageAvatars });

module.exports = {
  upload,
  uploadAvatars,
};
