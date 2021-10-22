const { Schema } = require("mongoose");

const artPiecesSchema = new Schema(
  {
    name: { type: String },
    item: { type: String },
    artist: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = artPiecesSchema;
