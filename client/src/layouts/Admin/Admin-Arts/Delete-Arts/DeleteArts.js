import { Modal, ModalFooter } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteArtPieces } from "../../../../redux/actions/ArtPiecesAction";
import styles from "./styles.module.css";
const DeleteArts = ({
  showDeleteArtPieceModal,
  closeDeleteArtPieceModal,
  deleteArtPieceID,
}) => {
  // Delete Art Piece
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteArtPieces(deleteArtPieceID));
    closeDeleteArtPieceModal();
  };
  return (
    <Modal
      show={showDeleteArtPieceModal}
      onHide={closeDeleteArtPieceModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this Art Piece?</Modal.Body>
      <ModalFooter>
        <button
          className={styles["btnFooer"] + " " + styles["btnCancelColor"]}
          onClick={closeDeleteArtPieceModal}
        >
          cancel
        </button>
        <button
          className={styles["btnFooer"] + " " + styles["btnDeleteColor"]}
          onClick={deleteHandler}
        >
          delete
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteArts;
