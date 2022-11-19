import { useState, useLayoutEffect, useEffect } from "react";
import { useParams } from "react-router-dom";
import { journals as dbJournals } from "../../services/data";
import { useNavigate } from "react-router-dom";

export default function JournalInfo() {
  const { j_id } = useParams();
  const navigate = useNavigate();

  const [notFind, setNotFound] = useState(false);
  const [journal, setJournal] = useState(false);

  useLayoutEffect(() => {
    setJournal(
      () => dbJournals.filter((journal) => journal._id === j_id)[0] ?? ""
    );
    if (journal === "") setNotFound(true);
    else setNotFound(false);
  }, [j_id]);

  return (
    <>
      {notFind && (
        <div className="journal-extra-page">
          <div className="journal-page-box-info">
            <h2>Invalid Link</h2>
            <h3>
              Note - If this link is provided by our executive then please
              contact our support team.
            </h3>
          </div>
        </div>
      )}
      {!notFind && (
        <div className="journal-extra-page">
          <div className="journal-page-box-info">
            <button
              className="journal-info-back-button"
              onClick={() => navigate(-1)}
            >
              &#10232; Go Back
            </button>
            <h3 className="journal-title"> {journal.title}</h3>
            {journal.eissn && <p>E-ISSN :{journal.eissn}</p>}
            {journal.pissn && <p>P-ISSN :{journal.pissn}</p>}
            {journal.lissn && <p>L-ISSN :{journal.lissn}</p>}
            {journal.publisher && <p>Publisher :{journal.publisher}</p>}
            {journal.subjectArea && <p>Subject Area :{journal.subjectArea}</p>}
            {journal.scopusCoverage && (
              <p>Scopus Coverage :{journal.scopusCoverage}</p>
            )}
            {journal.acceptanceTime && (
              <p>Acceptance Time :{journal.acceptanceTime}</p>
            )}
            {journal.indexing && (
              <p>
                Indexing -
                {journal.indexing.map((item) => (
                  <span key={item}> {item}, </span>
                ))}
              </p>
            )}
            <div className="journal-links">
              {journal.journalLink && (
                <a
                  href={journal.journalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Journal Link
                </a>
              )}
              {journal.scopusLink && (
                <a
                  href={journal.scopusLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Scopus Link
                </a>
              )}
              {journal.webofScienceLink && (
                <a
                  href={journal.webofScienceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Web of Science Link
                </a>
              )}
              {journal.sjrLink && (
                <a
                  href={journal.sjrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sjr Link
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
