const { StatusCodes } = require("http-status-codes");
const ArtPiece = require("../Model/artPieces.model");

// ** Get All ArtPiece **//
const getAllArtPieceController = async (req, res) => {
  let { page, size } = req.query;
  try {
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const all = await ArtPiece.countDocuments();
    const totalPage = Math.ceil(all / limit);
    const artPieces = await ArtPiece.find({})

      .limit(limit)
      .skip(skip);
    res
      .status(StatusCodes.OK)
      .json({ message: "success", page, size, totalPage, data: artPieces });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "err", error });
  }
};
// ** End Get All ArtPiece **//

// ** For Add New ArtPiece **//
const addNewArtPieceController = async (req, res) => {
  const { name, item, artist, description } = req.body;
  try {
    let artPiece = new ArtPiece({
      name,
      item,
      artist,
      description,
    });
    const artPieceCreated = await artPiece.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "added success", data: artPieceCreated });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};
// ** End  Add New ArtPiece **//

// ** Delete ArtPiece **//
const deleteArtPieceController = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await ArtPiece.findOne({ _id: id });
    if (!found) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "id not found" });
    } else {
      await ArtPiece.deleteOne({ _id: id });
      res
        .status(StatusCodes.OK)
        .json({ message: "deleted success", deleted: id });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

// ** Update ArtPiece **//

const updateArtPieceController = async (req, res) => {
  const { id } = req.params;
  const { name, item, artist, description } = req.body;
  try {
    const found = await ArtPiece.findOne({ _id: id });
    if (!found) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "id not found" });
    } else {
      await ArtPiece.updateOne(
        { _id: id },
        { name, item, artist, description }
      );
      const updated = await ArtPiece.findOne({ _id: id });
      res.status(StatusCodes.OK).json({ message: "updated Success", updated });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

module.exports = {
  getAllArtPieceController,
  addNewArtPieceController,
  deleteArtPieceController,
  updateArtPieceController,
};
