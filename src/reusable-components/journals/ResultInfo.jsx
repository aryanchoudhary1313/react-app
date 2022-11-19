import React from "react";

export default function ResultInfo({
  selectedJournal,
  numberOfResults,
  totalResults,
  searchInfo,
}) {
  return (
    <div className="result-info">
      {!searchInfo && (
        <span>
          Showing {numberOfResults} results of {totalResults} in{" "}
          {selectedJournal ?? "All Journals"}
        </span>
      )}
      {searchInfo && (
        <span>{numberOfResults} results found in All Journals</span>
      )}
    </div>
  );
}
