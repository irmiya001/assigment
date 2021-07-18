const multer = require('multer');
const storage = require('../config/multer.config');

const singleUpload = multer({
    storage: storage.storage,
    limits: {fileSize: 1024 * 1024 }
  }).single('profile_pic');

const titleFile = multer({
    storage: storage.storage
}).single('titleFile');

const filesUpload = multer({
  storage: storage.storage,
  // limits: {fileSize: 1024 * 1024 }
  }).fields([{
    name: 'image'
  }, {
    name: 'video'
  }]);


  module.exports = {
      singleUpload,
      titleFile,
      filesUpload
  }