import React from "react";
import styles from "./styles.module.css";
import { Modal } from "react-bootstrap";

export default function ArtPieceDetails({
  showArtPieceDetailsModal,
  closeArtPieceDetailsModal,
  ArtPieceData,
}) {
  //   closeArtPieceDetailsModal();

  return (
    <Modal
      show={showArtPieceDetailsModal}
      onHide={closeArtPieceDetailsModal}
      className={styles.Modal}
      dialogClassName={styles.customModelWidth}
      size="xl"
      centered
    >
      <div key={ArtPieceData._id} className={styles.card}>
        <div>
          <span
            className={styles.closeIcon}
            onClick={() => closeArtPieceDetailsModal()}
          >
            {" "}
            <span className={styles.close}>
              {" "}
              <i className="fas fa-times"></i>
            </span>
          </span>

          <img className={styles.artPieceImg} src={ArtPieceData.item} />
        </div>

        <div className={styles.artPieceName}>{ArtPieceData.name}</div>
        <div className={styles.artPieceDescription}>
          {ArtPieceData.description}
        </div>
      </div>
    </Modal>
  );
}
