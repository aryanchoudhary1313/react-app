import _ from "lodash";
import "./Journals.css";
import "./JournalsP.css";
import Dialog from "./Dialog";
import Content from "./Content";
import CompHeader from "./CompHeader";
import Pagination from "./Pagination";
import { useEffect, useState, useLayoutEffect } from "react";
import { journals as dbJournals } from "../../services/data";
import ResultInfo from "./ResultInfo";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import SideList from "./SideList";
import MobileList from "./MobileList";

export default function Journals({
  setSelectedJournal,
  selectedJournal,
  searchQuery,
  header,
}) {
  const { id } = useParams();
  const defaultSearchFilterValue = "Title";
  const defaultFilterValue = "All Journals";
  const [emptyQuery, setEmptyQuery] = useState();
  const [pagesArray, setPagesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfResults, setResults] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchInfo, setSearchInfo] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogJournal, setDialogJournal] = useState();
  const [prevPageStatus, setPrevPageStatus] = useState(false);
  const [nextPageStatus, setNextPageStatus] = useState(false);
  const [totalResults, setTotalResults] = useState(dbJournals.length);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [receivedJournals, setReceivedJournals] = useState(dbJournals);
  const [pagedJournals, setPagedJournals] = useState(receivedJournals);
  const [scopusClicked, setScopusClicked] = useState(false);
  const [wosClicked, setWosClicked] = useState(false);
  const [selectedSearchFilter, setSelectedSearchFilter] = useState("Title");
  const searchPlaceholder = `Search Journals by ${selectedSearchFilter}`;

  const filterArray = [
    { key: "all", value: "All Journals" },
    { key: "sp", value: "Scopus Journals" },
    { key: "wos", value: "Web Of Science" },
    { key: "gs", value: "Google Scholar" },
    { key: "sd", value: "Scopus Discontinued" },
    { key: "sjr", value: "SJR" },
    { key: "doaj", value: "DOAJ" },
    { key: "clone", value: "Clone" },
    { key: "pub", value: "PUBMED" },
    { key: "abdc", value: "ABDC" },
  ];
  const wos = [
    { key: "wos_esci", value: "ESCI" },
    { key: "wos_ssci", value: "SSCI" },
    { key: "wos_scie", value: "SCIE" },
  ];
  const scopus = [
    { key: "sp_q1", value: "Scopus Journals Q1" },
    { key: "sp_q2", value: "Scopus Journals Q2" },
    { key: "sp_q3", value: "Scopus Journals Q3" },
    { key: "sp_q4", value: "Scopus Journals Q4" },
  ];
  const searchArray = [
    { key: "title", value: "Title" },
    { key: "issn", value: "ISSN" },
    { key: "publisher", value: "Publisher" },
    { key: "subjectArea", value: "Subject Area" },
  ];

  useEffect(() => {
    setSelectedJournal(
      () => filterArray.filter((filter) => filter.key === id)[0]?.value
    );
  }, [id]);

  useEffect(() => {
    setSearchInfo(false);
    let dFilter = selectedJournal ?? defaultFilterValue;
    let category =
      filterArray.filter((item) => item.value === dFilter)[0]?.key ||
      scopus.filter((item) => item.value === dFilter)[0]?.key ||
      wos.filter((item) => item.value === dFilter)[0]?.key;
    checkCategory(category);
    if (category === "all") {
      setReceivedJournals(dbJournals);
      setTotalResults(dbJournals.length);
    } else {
      let categorizedJournals = dbJournals.filter((journal) =>
        journal.category.includes(category)
      );
      setReceivedJournals(categorizedJournals);
      setTotalResults(categorizedJournals.length);
    }
  }, [selectedJournal, emptyQuery]);

  let checkCategory = (category) => {
    category?.includes("sp") ? setScopusClicked(true) : setScopusClicked(false);
    category?.includes("wos") ? setWosClicked(true) : setWosClicked(false);
  };
  let calcPages = () => {
    let range = Math.ceil(receivedJournals.length / itemsPerPage);
    let pagearray = _.range(1, range + 1, 1);
    setPagesArray(pagearray);
  };
  let pagedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const newPagedJournals = _(receivedJournals)
      .slice(startIndex)
      .take(itemsPerPage)
      .value();
    setPagedJournals(newPagedJournals);
    setResults(newPagedJournals.length);
    setDialogJournal(newPagedJournals[currentIndex]);
  };
  useEffect(() => {
    calcPages();
    setCurrentPage(1);
    pagedItems();
  }, [receivedJournals, itemsPerPage]);

  useEffect(() => {
    pagedItems();
  }, [currentPage]);

  useEffect(() => {
    let query = searchQuery?.toLowerCase();
    if (query !== "") {
      searchResults(headerResults, query);
    } else {
      setEmptyQuery(true);
      setSearchInfo(false);
    }
  }, [searchQuery]);

  function handleSearch({ target }) {
    let userFilter =
      searchArray.filter((sfilter) => sfilter.value === selectedSearchFilter)[0]
        .key ?? "title";
    let query = target.value.toLowerCase();
    setSearchInput(query);
    if (query !== "") {
      if (userFilter === "issn") {
        searchResults(issnResults, query);
      } else {
        searchResults(filteredResults, query, userFilter);
      }
    } else {
      setEmptyQuery(true);
      setSearchInfo(false);
    }
  }

  let searchResults = (calcFn, searchInput, category) => {
    const filteredJournals = dbJournals.filter((journal) =>
      calcFn(journal, searchInput, category)
    );
    setSearchInfo(true);
    setReceivedJournals(filteredJournals);
    setEmptyQuery(false);
  };
  let headerResults = (obj, userInput) => {
    if (
      obj.title?.toLowerCase().includes(userInput) ||
      obj.eissn?.toLowerCase().includes(userInput) ||
      obj.pissn?.toLowerCase().includes(userInput) ||
      obj.lissn?.toLowerCase().includes(userInput) ||
      obj.publisher?.toLowerCase().includes(userInput) ||
      obj.subjectArea?.toLowerCase().includes(userInput)
    )
      return true;
  };
  let issnResults = (obj, userInput) =>
    obj.eissn?.toLowerCase().includes(userInput) ||
    obj.pissn?.toLowerCase().includes(userInput) ||
    obj.lissn?.toLowerCase().includes(userInput);

  let filteredResults = (obj, userInput, category) =>
    obj[`${category}`]?.toLowerCase().includes(userInput);

  function handleViewDetails(jID) {
    let dJournal = pagedJournals.filter((journal) => {
      if (journal._id === jID) return true;
    })[0];

    let arrayIndex = pagedJournals.findIndex((journal) => journal._id === jID);
    setCurrentIndex(arrayIndex);
    setOpenDialog(true);
    setDialogJournal(dJournal);
    statusCalc(arrayIndex);
  }

  function handleNext() {
    if (currentIndex < pagedJournals.length) {
      let nextIndex = currentIndex + 1;

      if (nextIndex <= pagedJournals.length - 1) {
        statusCalc(nextIndex);
      }
      if (nextIndex === pagedJournals.length) {
        setNextPageStatus(false);
        if (currentPage === pagesArray.length) return;
        else {
          setCurrentIndex(0);
          setCurrentPage((prev) => prev + 1);
        }
      }
      if (nextIndex < pagedJournals.length) {
        setCurrentIndex(nextIndex);
        setDialogJournal(pagedJournals[nextIndex]);
      }
      if (nextIndex === pagedJournals.length) setPrevPageStatus(true);
    }
  }

  function handlePrevious() {
    if (currentIndex >= 0 && currentPage >= 1) {
      let prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        statusCalc(prevIndex);
      }
      if (prevIndex === -1) {
        setPrevPageStatus(false);
        if (currentPage === 1) return;
        else {
          setCurrentPage((prev) => prev - 1);
          setCurrentIndex(itemsPerPage - 1);
        }
      }
      if (prevIndex >= 0) {
        setCurrentIndex(prevIndex);
        setDialogJournal(pagedJournals[prevIndex]);
      }
      if (prevIndex === -1) setNextPageStatus(true);
    }
  }

  let statusCalc = (index) => {
    index === pagedJournals.length - 1
      ? setNextPageStatus(true)
      : setNextPageStatus(false);

    index === 0 ? setPrevPageStatus(true) : setPrevPageStatus(false);

    index === pagedJournals.length - 1 && currentPage === pagesArray.length
      ? setNextButtonDisabled(true)
      : setNextButtonDisabled(false);

    index === 0 && currentPage === 1
      ? setPrevButtonDisabled(true)
      : setPrevButtonDisabled(false);
  };
  const pagesProps = {
    setCurrentPage,
    currentPage,
    pagesArray,
  };
  const resultProps = {
    selectedJournal,
    numberOfResults,
    totalResults,
    searchInfo,
  };
  const compHeader = {
    selectedSearchFilter,
    setSelectedSearchFilter,
    filterArray,
    searchArray,
    defaultSearchFilterValue,
    defaultFilterValue,
    searchPlaceholder,
    selectedJournal,
    setSelectedJournal,
    handleSearch,
    itemsPerPage,
    setItemsPerPage,
    searchInput,
    wosClicked,
    scopusClicked,
    scopus,
    wos,
    header,
  };
  const sideList = {
    filterArray,
    setSelectedJournal,
  };
  const mobileList = {
    filterArray,
    setSelectedJournal,
    selectedJournal,
  };
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
    <>
      <AnimatePresence>
        {header && <MobileList {...mobileList} />}
        <motion.div {...animation} className="journals-page">
          {!header && <SideList {...sideList} />}
          <div className="journal-page-comps">
            <CompHeader {...compHeader} />
            <Content
              pagedJournals={pagedJournals}
              handleViewDetails={handleViewDetails}
              searchInput={searchInput}
              searchQuery={searchQuery}
            />
            <ResultInfo {...resultProps} />
            {pagesArray.length > 1 && <Pagination {...pagesProps} />}
          </div>
        </motion.div>
      </AnimatePresence>
      {openDialog && (
        <Dialog
          journal={dialogJournal}
          setOpenDialog={setOpenDialog}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          prevPageStatus={prevPageStatus}
          nextPageStatus={nextPageStatus}
          nextButtonDisabled={nextButtonDisabled}
          prevButtonDisabled={prevButtonDisabled}
        />
      )}
    </>
  );
}
