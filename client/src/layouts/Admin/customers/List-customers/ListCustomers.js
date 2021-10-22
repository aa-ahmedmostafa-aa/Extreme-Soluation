import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../Component/shared/Loading/Loading";
import Pagination from "../../../../Component/shared/Pagination";
import { getAllUsers } from "../../../../redux/actions/UserAction";
import styles from "./styles.module.css";

const ListCustomers = () => {
  const arrowDowen = <i className="fa-sm fas fa-long-arrow-alt-down"></i>;
  const arrowUp = <i className="fas fa-sm fa-long-arrow-alt-up"></i>;

  const dispatch = useDispatch();
  const allUsersList = useSelector((state) => state.allUsers);
  const { loading, error, Users } = allUsersList;

  const [currentPage, setCurrentPage] = useState(1);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Get All Users

  useEffect(() => {
    let size = 10;
    dispatch(getAllUsers(currentPage, size));
  }, [dispatch, currentPage]);

  //**********/
  return (
    <div>
      <div className={styles["mainSection"]}>
        <div className="container">
          {/* header */}
          <div className="row   no-gutters justify-content-md-between justify-content-center align-items-center">
            <h2
              className={
                styles["header"] + " text-center text-lg-left col-md-4 "
              }
            >
              Users
            </h2>
          </div>

          {/* table */}
          <div className={`${styles.tabel} table-responsive mt-2`}>
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>

                    <th>Role</th>
                  </thead>
                  <tbody>
                    {Users.data.map((customer, i) => (
                      <tr key={customer.id}>
                        <td>{i}</td>
                        <td>{customer.userName}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-center mt-3">
                  {" "}
                  <Pagination
                    totalPages={Users.totalPage}
                    elementsPerPage="10"
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCustomers;
