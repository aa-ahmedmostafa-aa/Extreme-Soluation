import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllArtPieces } from "../../../redux/actions/ArtPiecesAction";
import { getAllUsers } from "../../../redux/actions/UserAction";
import styles from "./styles.module.css";
const AdminWelcome = () => {
  const history = useHistory();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const artsPiecesList = useSelector((state) => state.allArtPieces);
  const {  ArtPieces } = artsPiecesList;
  const allUsersList = useSelector((state) => state.allUsers);
  const { Users } = allUsersList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllArtPieces());
    dispatch(getAllUsers());
  }, [dispatch]);

  //**********/

  return (
    <div>
      <div className="container ">
        <h6 className={styles["welcomeText"]}>
          Welcome,,
          <span className={styles["adminName"]}>
            {userInfo && userInfo.user.userName}
          </span>
        </h6>
        <p className={styles["welcomePrgrph"]}>
          How are you today ..! Hope you fine ^_^
        </p>
        {/* boxs *******/}
        <div
          className={
            styles["boxsContent"] + " d-flex flex-column justify-content-center"
          }
        >
          <div className="row justify-content-between">
            {/* customers */}
            <div className="col-md-6  ">
              <div className={styles["boxstyle"] + " m-auto text-center "}>
                <div
                  className={
                    styles["iconBox"] +
                    " mx-auto row align-items-center justify-content-center"
                  }
                >
                  <i class="fas fa-2x fa-user-alt"></i>
                </div>
                <p className={styles["boxNum"]}>{Users && Users.count}</p>
                <p className={styles["boxType"]}>Customers</p>
                <button
                  onClick={() => history.push("/homeAdmin/customers")}
                  className={styles["boxBtn"]}
                >
                  view
                </button>
              </div>
            </div>

            {/* products */}
            <div className="col-md-6  ">
              <div className={styles["boxstyle"] + " m-auto text-center "}>
                <div
                  className={
                    styles["iconBox"] +
                    " mx-auto row align-items-center justify-content-center"
                  }
                >
                  <i class="fas fa-2x fa-cube"></i>
                </div>
                <p className={styles["boxNum"]}>
                  {ArtPieces && ArtPieces.count}
                </p>
                <p className={styles["boxType"]}>Art Pieces</p>
                <button
                  onClick={() => history.push("/homeAdmin/adminListArts")}
                  className={styles["boxBtn"]}
                >
                  view
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
