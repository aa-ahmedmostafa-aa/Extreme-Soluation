const router = require("express").Router();
const validateRequest = require("../../../common/middelware/validateRequest");
const isAuhoraized = require("../../../common/middelware/isAuthoraized");
const {
  getAllArtPieceController,
  addNewArtPieceController,
  deleteArtPieceController,
  updateArtPieceController,
} = require("../controller/artPieces.controller");
const {
  addArtPiecesSchema,
  deletePiecesSchema,
  updateArtPiecesSchema,
} = require("../joi/artPiecesValidation");
const {
  ADD_ART_PIECES,
  GET_ALL_ART_PIECES,
  DELETE_ART_PIECES,
  UPDATE_ART_PIECES,
} = require("../endPoints");

//*** artPieces Routes */

router.get(
  "/artPieces",
  isAuhoraized(GET_ALL_ART_PIECES),
  getAllArtPieceController
);
router.post(
  "/addArtPiece",
  validateRequest(addArtPiecesSchema),
  isAuhoraized(ADD_ART_PIECES),
  addNewArtPieceController
);

// router.put("/updateArtPiece", );
router.delete(
  "/deleteArtPiece/:id",
  validateRequest(deletePiecesSchema),
  isAuhoraized(DELETE_ART_PIECES),
  deleteArtPieceController
);

router.put(
  "/updateArtPiece/:id",
  validateRequest(updateArtPiecesSchema),
  isAuhoraized(UPDATE_ART_PIECES),
  updateArtPieceController
);
module.exports = router;
