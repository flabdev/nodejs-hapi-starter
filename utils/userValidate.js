const Joi = require('joi');

module.exports.userJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  country: Joi.string().required(),
}).unknown();

module.exports.checkUserId = Joi.object({
  id: Joi.string().required(),
});
