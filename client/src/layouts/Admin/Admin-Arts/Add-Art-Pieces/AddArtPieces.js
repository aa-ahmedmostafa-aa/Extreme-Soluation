import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addNewArtPiece } from "../../../../redux/actions/ArtPiecesAction";

export default function AddArtPieces({
  showAddArtPiecesModal,
  handleCloseAddArtPieces,
}) {
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");

  //state validation
  const [validation, setValidation] = useState(false);
  const [validationText, setValidationText] = useState("");

  //handel  cover image
  const handelArtItemPieceImage = async (e) => {
    if (e.target.files[0] && e.target.files[0].type.substr(0, 5) === "image") {
      const cImg = await toBase64(e.target.files[0]);
      setItem(cImg);
    }
  };
  //*********** */

  //to base64
  const toBase64 = (image) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  //******* */

  const dispatch = useDispatch();
  // Add New ArtPieces
  const submitHandler = () => {
    setValidationText("");
    setValidation(false);
    if (name === "" || item === "" || description === "" || artist === "") {
      setValidationText("All Data Required");
      setValidation(true);
      return;
    } else {
      dispatch(addNewArtPiece({ name, item, description, artist }));
    }

    //clear input

    setName("");
    setArtist("");
    setDescription("");
    setItem("");

    //******/
    handleCloseAddArtPieces();
  };

  return (
    <Modal
      show={showAddArtPiecesModal}
      onHide={handleCloseAddArtPieces}
      className={styles.Modal}
      dialogClassName={styles.customModelWidth}
      // size="xl"
      centered
    >
      <Modal.Body>
        <label className="labelInput_custom">Add New Art Piece</label>
        {validation && (
          <div
            className="d-flex justify-content-center alert alert-danger ml-5"
            role="alert"
          >
            <strong>Sorry ! </strong> {validationText}
          </div>
        )}
        <div className={styles.ModalContent}>
          <div className="row mb-4">
            <div className="col-md-4">
              <div>
                <label className="labelInput_custom">Name</label>
                <input
                  className="inputFiled_Custom"
                  type="text"
                  placeholder="Art Piece Name in here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="labelInput_custom">Description</label>
                <textarea
                  className="inputFiled_Custom"
                  type="text"
                  placeholder=" Description in here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div>
                <label className="labelInput_custom">Artist</label>
                <input
                  className="inputFiled_Custom"
                  type="text"
                  placeholder="Artist in here"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <label className="labelInput_custom">Art Piece Image</label>
              <label htmlFor="cover" className={styles.uploadArtItemPieceImage}>
                <div className="d-flex justify-content-between">
                  <span>Upload Art Pices Image :</span>
                  <span style={{ color: "#0000FF" }}>
                    <i className="fas fa-upload"></i>
                  </span>
                </div>
              </label>

              <div className="d-none">
                <input
                  type="file"
                  id="cover"
                  onChange={handelArtItemPieceImage}
                />
              </div>

              {item && <img className={styles.imageUpload} src={item} />}
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </Modal.Body>

      <div>
        <div className="d-flex justify-content-center mb-5">
          <button className="Custom_Btn" onClick={submitHandler}>
            Add Art Piece
          </button>
        </div>
      </div>
    </Modal>
  );
}
