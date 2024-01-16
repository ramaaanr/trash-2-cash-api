const { body, validationResult } = require('express-validator');
const moment = require('moment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const iso8601DateValidator = (value, { req }) => {
  const isValid = moment(value, moment.ISO_8601, true).isValid();
  if (!isValid) {
    throw new Error('Format tanggal dan waktu tidak valid.');
  }
  return true;
};

const trashPickupValidator = [
  body('notes').isString(),
  body('latitude').isFloat(),
  body('longitude').isFloat(),
  body('datetime').custom(iso8601DateValidator),
  body('status').isString(),
  body('type').isString(),
  body('waste_bank_id').isString(),
  body('customer_id').isString(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

const uploadFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 },
  fileFilter: async function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

// // Check file Type
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images Only !!!');
  }
}

module.exports = { trashPickupValidator, validate, checkFileType, uploadFile };
