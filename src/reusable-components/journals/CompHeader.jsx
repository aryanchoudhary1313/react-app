import { useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import { motion, AnimatePresence } from "framer-motion";

export default function CompHeader({
  selectedSearchFilter,
  setSelectedSearchFilter,
  searchArray,
  defaultSearchFilterValue,
  searchPlaceholder,
  searchInput,
  setSelectedJournal,
  handleSearch,
  itemsPerPage,
  setItemsPerPage,
  wosClicked,
  scopusClicked,
  scopus,
  wos,
  header,
}) {
  const [active, setActive] = useState();

  const numbers = [
    { key: 2, value: 2 },
    { key: 4, value: 4 },
    { key: 8, value: 8 },
    { key: 12, value: 12 },
    { key: 16, value: 16 },
    { key: 20, value: 20 },
    { key: 24, value: 24 },
  ];
  const cssStyle = {
    color: "var(--header-text-active)",
    fontWeight: "700",
    backgroundColor: "var(--bg-light)",
    border: "1px solid black",
  };
  const uStyle = {
    color: "var(--header-text-inactive)",
  };
  const setterFn = function (item) {
    setSelectedJournal(item.value);
    setActive(item.value);
  };
  const animation = {
    initial: { y: "50px", opacity: 0 },
    animate: { y: "0", opacity: 1 },
    end: { y: "-100px", opacity: 0 },
    transition: { type: "ease" },
  };

  return (
    <>
      <AnimatePresence>
        {scopusClicked && (
          <motion.div {...animation} className="sub-filters">
            {scopus.map((item) => (
              <span
                key={item.key}
                onClick={() => setterFn(item)}
                style={active === item.value ? cssStyle : uStyle}
              >
                {item.value}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {wosClicked && (
          <motion.div {...animation} className="sub-filters">
            {wos.map((item) => (
              <span
                key={item.key}
                onClick={() => setterFn(item)}
                style={active === item.value ? cssStyle : uStyle}
              >
                {item.value}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="comp-page-header">
        {header && (
          <div className="comp-page-search-field">
            <input
              onInput={handleSearch}
              type="text"
              value={searchInput}
              placeholder={searchPlaceholder}
            />
          </div>
        )}
        <div className="comp-page-search-by">
          <Dropdown
            items={searchArray}
            defaultDropdownValue={defaultSearchFilterValue}
            selectedValue={selectedSearchFilter}
            setSelectedValue={setSelectedSearchFilter}
            active={active}
            setActive={setActive}
          />
        </div>
        {!header && (
          <div className="comp-page-search-field">
            <input
              onInput={handleSearch}
              type="text"
              value={searchInput}
              placeholder={searchPlaceholder}
            />
          </div>
        )}
        <div className="itemsperpage">
          <span>Show - </span>
          <Dropdown
            items={numbers}
            defaultDropdownValue={4}
            selectedValue={itemsPerPage}
            setSelectedValue={setItemsPerPage}
            active={active}
            setActive={setActive}
          />
        </div>
      </div>
    </>
  );
}
