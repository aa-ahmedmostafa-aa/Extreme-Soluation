const { GET_ALL_USER } = require("../../../modules/users/endPoints");
const {
  ADD_ART_PIECES,
  GET_ALL_ART_PIECES,
  DELETE_ART_PIECES,
  UPDATE_ART_PIECES,
} = require("../../../modules/artPieces/endPoints");

module.exports = [
  GET_ALL_USER,
  ADD_ART_PIECES,
  GET_ALL_ART_PIECES,
  DELETE_ART_PIECES,
  UPDATE_ART_PIECES
];
