const joi = require("joi");

module.exports = {
  addArtPiecesSchema: {
    body: joi.object().required().keys({
      name: joi.string().required(),
      item: joi.string().required(),
      artist: joi.number().required(),
      description: joi.string(),
    }),
  },
  deletePiecesSchema: {
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
  },
  updateArtPiecesSchema: {
    body: joi.object().required().keys({
      name: joi.string(),
      item: joi.string(),
      artist: joi.number(),
      description: joi.string(),
    }),
  },
};
