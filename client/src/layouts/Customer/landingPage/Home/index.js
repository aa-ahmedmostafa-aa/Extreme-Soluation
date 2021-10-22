import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtPieces } from "../../../../redux/actions/ArtPiecesAction";
import Pagination from "../../../../Component/shared/Pagination";
import ArtPieceDetails from "./Art-Piece-Details/ArtPieceDetails";
import Loading from "../../../../Component/shared/Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const artsPiecesList = useSelector((state) => state.allArtPieces);
  const { loading, error, ArtPieces } = artsPiecesList;

  const [currentPage, setCurrentPage] = useState(1);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Get All AllArtPieces
  useEffect(() => {
    let limit = 12;
    dispatch(getAllArtPieces(currentPage, limit));
  }, [dispatch, currentPage]);

  // ArtPieceDetails
  const [showArtPieceDetailsModal, setShowArtPieceDetailsModal] =
    useState(false);
  const [ArtPieceData, setArtPieceData] = useState(false);
  // ArtPieceDetails

  const handelShowArtPieceDetails = (artPiece) => {
    setArtPieceData(artPiece);
    setShowArtPieceDetailsModal(true);
  };
  const closeArtPieceDetailsModal = () => setShowArtPieceDetailsModal(false);
  return (
    <div>
      <div className={styles.mainSection}>
        <div className="container">
          <div>
            <h2
              className={
                styles["header"] + " text-center text-lg-left pt-3 pb-3  "
              }
            >
              Gallary
            </h2>
            <div className="content">
              {/* table */}
              <div className={` mt-3`}>
                {loading ? (
                  <Loading />
                ) : error ? (
                  <h2>{error}</h2>
                ) : (
                  <div className="row">
                    {ArtPieces.data.map((artPiece, i) => (
                      <div className="col-md-3 mb-5">
                        <div key={artPiece._id} className={styles.card}>
                          <div>
                            <img
                              className={styles.artPieceImg}
                              src={artPiece.item}
                            />
                          </div>

                          <div
                            className={styles.artPieceName}
                            onClick={() => handelShowArtPieceDetails(artPiece)}
                          >
                            {artPiece.artist}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {ArtPieces && (
                  <div className="d-flex justify-content-center mt-3">
                    {" "}
                    <Pagination
                      totalPages={ArtPieces.totalPage}
                      elementsPerPage="10"
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ArtPieceDetails
        showArtPieceDetailsModal={showArtPieceDetailsModal}
        closeArtPieceDetailsModal={closeArtPieceDetailsModal}
        ArtPieceData={ArtPieceData}
      />
    </div>
  );
}
