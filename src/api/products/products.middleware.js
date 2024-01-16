const { body, validationResult } = require('express-validator');

const productValidator = [
  body('category').isString(),
  body('description').isString(),
  body('images').isArray(),
  // body('close_hour').matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
  // body('latitude').isFloat(),
  // body('longitude').isFloat(),
  // body('open_hour').matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
  // body('active').isBoolean(),
  // body('address').isString(),
  // body('title').isString(),
  // body('time_zone').isString(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = { productValidator, validate };
