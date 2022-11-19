import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "../../components/CustomLinks";

export default function MobileList({
  filterArray,
  setSelectedJournal,
  selectedJournal,
}) {
  const { id } = useParams();
  const [active, setActive] = useState();
  const [sideList, setSideList] = useState(false);
  const styles = {
    color: "var(--text-color-dark)",
    fontWeight: "700",
    backgroundColor: "var(--bg-light)",
  };

  useEffect(() => {
    const selectedJournal = filterArray.filter((filter) => filter.key === id);
    if (selectedJournal) setActive(selectedJournal[0].value);
  }, [id]);

  function handleChangeValue(item) {
    setSelectedJournal(item.value);
    setActive(item.value);
    setSideList(false);
  }
  return (
    <div className="mobile-filter-list">
      <div className="mobile-list-head" onClick={() => setSideList(!sideList)}>
        <span>{selectedJournal ?? "Select Journals"}</span>
        <span> &#8659;</span>
      </div>
      {sideList && (
        <div className="mobile-side-list">
          {filterArray.map((item) => (
            <NavLink
              to={`/journals/${item.key}`}
              key={item.key}
              className="mobile-list-item"
              onClick={() => handleChangeValue(item)}
              style={active === item.value ? styles : {}}
            >
              {item.value}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
