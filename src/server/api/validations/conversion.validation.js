const Joi = require('joi');

module.exports = {
  // POST /v1/conversion
  conversionPOST: {
    options: {
      contextRequest: true,
    },
    body: Joi.array()
      .items(Joi.object().keys({
        _id: Joi.string().required(),
        count: Joi.number().min(0).required(),
      }))
      .required(),
  },

};
