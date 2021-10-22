import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtPieces } from "../../../../redux/actions/ArtPiecesAction";
import Pagination from "../../../../Component/shared/Pagination";
import DeleteArts from "../Delete-Arts/DeleteArts";
import AddArtPieces from "../Add-Art-Pieces/AddArtPieces";
import Loading from "../../../../Component/shared/Loading/Loading";

export default function ListArts() {
  const dispatch = useDispatch();
  const artsPiecesList = useSelector((state) => state.allArtPieces);
  const { loading, error, ArtPieces } = artsPiecesList;

  const [currentPage, setCurrentPage] = useState(1);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Get All AddedProperty

  useEffect(() => {
    let limit = 10;
    dispatch(getAllArtPieces(currentPage, limit));
  }, [dispatch, currentPage]);

  //**********/

  // for add new ArtPieces
  const [showAddArtPiecesModal, setShowAddArtPiecesModal] = useState("");
  //for open and close Modal //
  const handleCloseAddArtPieces = () => setShowAddArtPiecesModal(false);
  const handleShowAddArtPieces = () => setShowAddArtPiecesModal(true);
  //************* */

  // deleteArtPieces
  const [showDeleteArtPiecesModal, setShowDeleteArtPiecesModal] =
    useState(false);
  const [deleteArtPiecesID, setDeleteArtPiecesID] = useState(false);
  // deleteArtPiece
  const [showDeleteArtPieceModal, setShowDeleteArtPieceModal] = useState(false);
  const [deleteArtPieceID, setDeleteArtPieceID] = useState(false);
  // deleteArtPiece
  const handleShowDeleteArtPiece = (id) => {
    setDeleteArtPieceID(id);
    setShowDeleteArtPieceModal(true);
  };
  const closeDeleteArtPieceModal = () => setShowDeleteArtPieceModal(false);

  //**********end Delete ArtPiece */

  return (
    <div className={styles["mainSection"]}>
      <div className="container">
        {/* header */}
        <div className="row   no-gutters justify-content-md-between justify-content-center align-items-center">
          <h2
            className={styles["header"] + " text-center text-lg-left col-md-4 "}
          >
            Art Pieces
          </h2>

          <div className="  ml-2" data-toggle="modal">
            <button className="Custom_Btn" onClick={handleShowAddArtPieces}>
              Add Art Piece
            </button>
          </div>
        </div>

        {/* table */}
        <div className={`${styles.tabel} table-responsive mt-3`}>
          {loading ? (
             <Loading/>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <>
              <table
                className={
                  styles["tableContent"] +
                  " table table-hover table-borderless text-center"
                }
              >
                <thead className=" ">
                  <th>Item</th>
                  <th>Name</th>
                  <th>Artist</th>

                  <th>Description</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {ArtPieces.data.map((artPiece, i) => (
                    <tr key={artPiece.id}>
                      <td>
                        <img src={artPiece.item} width="50px" height="40px" />
                      </td>
                      <td>{artPiece.name}</td>
                      <td>{artPiece.artist}</td>
                      <td>{artPiece.artist}</td>
                      <td>
                        {" "}
                        <button
                          className="Custom_Btn_Delete"
                          onClick={() =>
                            handleShowDeleteArtPiece(artPiece._id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center mt-3">
                {" "}
                <Pagination
                  totalPages={ArtPieces.totalPage}
                  elementsPerPage="10"
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal  for Add New ArtPieces*/}
      <AddArtPieces
        showAddArtPiecesModal={showAddArtPiecesModal}
        handleCloseAddArtPieces={handleCloseAddArtPieces}
      />
      <DeleteArts
        showDeleteArtPieceModal={showDeleteArtPieceModal}
        closeDeleteArtPieceModal={closeDeleteArtPieceModal}
        deleteArtPieceID={deleteArtPieceID}
      />
    </div>
  );
}
