import React, { useState } from "react";
import styles from "./style.module.css";
const Pagination = ({ elementsPerPage, totalPages, paginate, currentPage }) => {
  const pageNumbers = [];
  //   const [pgNumber, setPgNumber] = useState(0);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mb-4">
      <ul className="pagination">
        <li
          className={`page-item ${currentPage == 1 ? "disabled" : ""}`}
          onClick={() =>
            currentPage == 1 ? null : paginate((prev) => prev - 1)
          }
        >
          <button className={`page-link ${styles.prev_next}`}>Prev</button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${styles.pageNumber} ${
              currentPage == number ? "disabled" : ""
            }`}
          >
            <a
              onClick={() => {
                paginate(number);
                // setPgNumber(pgNumber);
              }}
              className={`page-link ${styles.pg_number}`}
            >
              {number}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage == pageNumbers.length ? "disabled" : ""
          }`}
          onClick={() =>
            currentPage == pageNumbers.length
              ? null
              : paginate((prev) => prev + 1)
          }
        >
          <button className={`page-link ${styles.prev_next}`}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
