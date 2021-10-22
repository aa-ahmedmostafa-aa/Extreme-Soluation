const joi = require("joi");

module.exports = {
  addUserSchema: {
    body: joi
      .object()
      .required()
      .keys({
        userName: joi.string().required().messages({
          "string.empty": "sorry userName is required",
        }),
        password: joi.string().required(),
        phoneNumber: joi.number().required(),
        role: joi.string(),
      }),
  },
  signInSchema: {
    body: joi.object().required().keys({
      userName: joi.string().required().email(),
      password: joi.string().required(),
    }),
  },
};
