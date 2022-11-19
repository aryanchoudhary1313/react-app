import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import searchIcon from "../media/search.svg";
import Dropdown from "../reusable-components/dropdown/Dropdown";
import { journals } from "../services/data";
import { HeaderLink, JournalTitleLink } from "./CustomLinks";

export default function Header({
  selectedJournal,
  setSelectedJournal,
  setSearchQuery,
  searchQuery,
  serviceRef,
  header,
  setSideHeader,
  sideHeader,
}) {
  const [active, setActive] = useState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [cancel, setCancel] = useState();
  const [searchJournals, setSearchJournals] = useState();
  const [links, setLinks] = useState();

  const items = [
    { key: "all", route: "/journals/all", value: "All Journals" },
    { key: "gs", route: "/journals/gs", value: "Google Scholar" },
    { key: "wos", route: "/journals/wos", value: "Web Of Science" },
    { key: "sp", route: "/journals/sp", value: "Scopus Journals" },
    { key: "sd", route: "/journals/sd", value: "Scopus Discontinued Journals" },
  ];
  const animation = {
    initial: { y: "-10vw", opacity: 0 },
    animate: { y: "0", opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0 } },
    transition: { type: "spring", stiffness: 50 },
  };
  const topanimation = {
    initial: { height: "0" },
    animate: { height: "100%" },
    exit: { height: "0" },
    transition: { ease: [0.3, 0.5, 0.7, 1], duration: 0.4 },
  };

  useEffect(() => {
    if (pathname === "/") setActive("org");
    if (pathname === "/submit-journals") setActive("submit");
    if (pathname === "/about") setActive("about");
  }, []);

  const scroll = (domEle) => {
    let element = domEle;
    let headerOffset = 100;
    let elementPosition = element.getBoundingClientRect().top;
    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  const handleServices = () => {
    setActive("services");
    setTimeout(() => {
      scroll(serviceRef.current);
    }, 500);
  };
  function handelHeader() {
    if (searchQuery !== "") setSearchQuery("");
    setSideHeader(sideHeader === true ? false : true);
    setLinks(true);
    setCancel(false);
  }
  function handleInput(e) {
    setSearchQuery(e.target.value);
    navigate("/journals/all");
  }

  const headerResults = (obj, userInput) => {
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

  function handleInputClick() {
    setLinks(false);
    setCancel(true);
  }
  useEffect(() => {
    if (searchQuery === "") {
      setSearchJournals([]);
      setLinks(true);
    }
    if (searchQuery !== "") {
      setLinks(false);
      let c = journals.filter((journal) =>
        headerResults(journal, searchQuery.toLowerCase())
      );
      setSearchJournals(c);
    }
  }, [searchQuery]);

  function handleCancel() {
    setLinks(true);
    setSearchJournals([]);
    setSearchQuery("");
    setCancel(false);
  }
  function handleJournalPage() {
    setSideHeader(false);
  }

  return (
    <>
      <header>
        <motion.div
          {...animation}
          className={!header ? "header-items" : "m-header-items"}
        >
          <div>
            <HeaderLink
              to="/"
              className="org"
              style={{
                color: `${active === "org" ? "var(--header-text-active)" : ""}`,
              }}
              onClick={() => setActive("org")}
            >
              E-Publication Services
            </HeaderLink>
          </div>

          {header && (
            <div className="mheader" onClick={handelHeader}>
              <div className={sideHeader ? "line-up" : "open-up"}></div>
              <div className={sideHeader ? "line-down" : "open-down"}></div>
            </div>
          )}

          {!header && (
            <>
              <div className="header-nav-contents">
                <div className="header-journal-dropdown">
                  <Dropdown
                    items={items}
                    defaultDropdownValue={"Journals"}
                    setSelectedValue={setSelectedJournal}
                    selectedValue={selectedJournal}
                    active={active}
                    setActive={setActive}
                  />
                </div>
                <div>
                  <HeaderLink
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: `${
                        active === "services" ? "var(--header-text-active)" : ""
                      }`,
                    }}
                    onClick={handleServices}
                  >
                    Our Services
                  </HeaderLink>
                </div>
                <div>
                  <HeaderLink
                    to="/about"
                    style={{
                      color: `${
                        active === "about" ? "var(--header-text-active)" : ""
                      }`,
                    }}
                    onClick={() => setActive("about")}
                  >
                    About Us
                  </HeaderLink>
                </div>
                <div>
                  <HeaderLink
                    to="/submit-journals"
                    style={{
                      color: `${
                        active === "submit" ? "var(--header-text-active)" : ""
                      }`,
                    }}
                    onClick={() => setActive("submit")}
                  >
                    Submit Articles
                  </HeaderLink>
                </div>
              </div>
              <div className="search-gap">
                <div className="search-bar-clicked">
                  <a href="#search-box" className="search-icon-in">
                    <img
                      src={searchIcon}
                      alt="search-icon"
                    />
                  </a>
                  <input
                    value={searchQuery}
                    onChange={(e) => handleInput(e)}
                    className="search-box"
                    type="text"
                    id="search-box"
                  />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </header>
      <AnimatePresence>
        {sideHeader && (
          <motion.div {...topanimation} className="side-bar-bg">
            <div className="side-header-search">
              <img src={searchIcon} alt="side-s-i" />
              <input
                onClick={handleInputClick}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="side-i-b"
                type="text"
                placeholder="Search Journals"
              />
              {cancel && <button onClick={handleCancel}>Cancel</button>}
            </div>
            {links && (
              <div className="side-h-m">
                <HeaderLink
                  className="side-menu"
                  to="/"
                  onClick={() => setSideHeader(false)}
                >
                  Home
                </HeaderLink>
                <HeaderLink
                  className="side-menu"
                  to="/about"
                  onClick={() => setSideHeader(false)}
                >
                  About Us
                </HeaderLink>
                <HeaderLink
                  className="side-menu"
                  to="/journals/all"
                  onClick={() => setSideHeader(false)}
                >
                  Journals
                </HeaderLink>
                <HeaderLink
                  className="side-menu"
                  to="/support"
                  onClick={() => setSideHeader(false)}
                >
                  Guidance
                </HeaderLink>
                <HeaderLink
                  className="side-menu"
                  to="/submit-journals"
                  onClick={() => setSideHeader(false)}
                >
                  Submit Articles
                </HeaderLink>
              </div>
            )}

            {!links && (
              <div className="result-journal-list">
                {searchJournals?.map((journal) => (
                  <JournalTitleLink
                    key={journal._id}
                    to={`journal/${journal._id}`}
                    onClick={handleJournalPage}
                  >
                    {journal.title}
                  </JournalTitleLink>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
