import React from "react";
import { JournalTitleLink } from "../../components/CustomLinks";
import info from "../journals/media/info.svg";
import Highlighter from "react-highlight-words";

export default function Content({
  pagedJournals,
  handleViewDetails,
  searchInput,
  searchQuery,
}) {
  return (
    <div className="journals-page-box-all">
      {pagedJournals.map((journal) => (
        <div key={journal._id} className="journal-page-box">
          <JournalTitleLink
            className="journal-title"
            to={`/journal/${journal._id}`}
          >
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={[searchInput, searchQuery]}
              autoEscape={true}
              textToHighlight={journal.title ?? ""}
            />
          </JournalTitleLink>
          <div className="journal-issn-list">
            {journal.eissn && (
              <span>
                E-ISSN :
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[searchInput, searchQuery]}
                  autoEscape={true}
                  textToHighlight={journal.eissn ?? ""}
                />
              </span>
            )}
            {journal.lissn && (
              <span>
                L-ISSN :
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[searchInput, searchQuery]}
                  autoEscape={true}
                  textToHighlight={journal.lissn ?? ""}
                />
              </span>
            )}
            {journal.pissn && (
              <span>
                P-ISSN :
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[searchInput, searchQuery]}
                  autoEscape={true}
                  textToHighlight={journal.pissn ?? ""}
                />
              </span>
            )}
          </div>
          <div
            className="journals-view-details-button"
            onClick={() => handleViewDetails(journal._id)}
          >
            <span>View Details</span>
            <img src={info} alt="info" />
          </div>
        </div>
      ))}
    </div>
  );
}
