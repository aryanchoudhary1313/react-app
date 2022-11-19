import { useEffect } from "react";
import { useRef } from "react";
import next from "./media/next.svg";
import previous from "./media/previous.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Dialog({
  journal,
  setOpenDialog,
  handleNext,
  handlePrevious,
  prevPageStatus,
  nextPageStatus,
  nextButtonDisabled,
  prevButtonDisabled,
}) {
  const bgRef = useRef();
  function handleOutClick(event) {
    if (event.target === bgRef.current) setOpenDialog(false);
  }
  useEffect(() => {
    function handleEsc(event) {
      if (event.keyCode === 27) setOpenDialog(false);
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  });

  function handleClose() {
    setOpenDialog(false);
  }
  const animation = {
    initial: { y: "100px", opacity: 0 },
    animate: { y: "0", opacity: 1 },
    exit: { opacity: 0, y: "100px" },
    transition: {
      duration: 1,
      type: "spring",
    },
  };
  return (
    <AnimatePresence>
      <div className="journal-background" ref={bgRef} onClick={handleOutClick}>
        <motion.div {...animation} className="journal-popup">
          <div className="journal-dialog-buttons-grp">
            <button
              className={
                prevButtonDisabled
                  ? "button-disabled"
                  : "journal-dialog-buttons"
              }
              onClick={handlePrevious}
            >
              <img src={previous} alt="navigation" />
              {!prevButtonDisabled && (prevPageStatus ? "Page" : "Journal")}
            </button>

            <button
              className={
                nextButtonDisabled
                  ? "button-disabled"
                  : "journal-dialog-buttons"
              }
              onClick={handleNext}
              s
            >
              {!nextButtonDisabled && (nextPageStatus ? "Page" : "Journal")}
              <img src={next} alt="navigation" />
            </button>
            <button className="journal-close-button" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="dialog-journal-info">
            <p>{journal.title}</p>
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
