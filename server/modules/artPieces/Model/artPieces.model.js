const mongoose = require("mongoose");
const artPiecesSchema = require("../Schema/artPieces.schema");

const ArtPiece = mongoose.model("artPiece", artPiecesSchema);

module.exports = ArtPiece;
