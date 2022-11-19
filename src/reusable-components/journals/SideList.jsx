import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "../../components/CustomLinks";

export default function SideList({ filterArray, setSelectedJournal }) {
  const { id } = useParams();
  const [active, setActive] = useState();
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
  }
  return (
    <div className="journal-filter-list">
      <div className="journal-list-items">
        <p>Choose Journals --</p>
        {filterArray.map((item) => (
          <NavLink
            to={`/journals/${item.key}`}
            key={item.key}
            className="journal-list-item"
            onClick={() => handleChangeValue(item)}
            style={active === item.value ? styles : {}}
          >
            {item.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
