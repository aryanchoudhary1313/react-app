import React from "react";
import next from "./media/next.svg";
import previous from "./media/previous.svg";
import { NavLink } from "../../components/CustomLinks";

export default function Pagination({
  pagesArray,
  currentPage,
  setCurrentPage,
}) {
  function handlePrevious() {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }
  function handleNext() {
    if (currentPage < pagesArray.length) setCurrentPage((prev) => prev + 1);
  }
  function handlePageChange(number) {
    setCurrentPage(number);
  }
  return (
    <div className="pagination-box">
      <img
        src={previous}
        alt="navigation"
        onClick={handlePrevious}
        className={currentPage !== 1 ? "nav-button" : "nav-disabled"}
      />
      <div className=" pagination-box-numbers">
        {pagesArray.map((pageNumber) => (
          <NavLink
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            <div
              className={
                pageNumber === currentPage ? "active-page" : "pagination-number"
              }
            >
              {pageNumber}
            </div>
          </NavLink>
        ))}
      </div>

      <img
        src={next}
        alt="navigation"
        onClick={handleNext}
        className={
          currentPage !== pagesArray.length ? "nav-button" : "nav-disabled"
        }
      />
    </div>
  );
}
