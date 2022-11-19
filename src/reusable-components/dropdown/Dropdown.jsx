import { DropDownLink } from "../../components/CustomLinks";
import "./dropdown.css";
import arrow from "./media/dropdownArrow.svg";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown({
  items,
  defaultDropdownValue,
  selectedValue,
  setSelectedValue,
  active,
  setActive,
}) {
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const dropdownani = {
    initial: { top: "5vw", opacity: 0 },
    animate: { top: "220%", opacity: 1 },
    exit: { top: "5vw", opacity: 0 },
    transition: { type: "spring" },
  };
  useEffect(() => {
    if (showDropdown) {
      function handleDropdown(event) {
        if (event.target !== dropdownRef.current) setShowDropdown(false);
      }
      document.addEventListener("click", handleDropdown);
      return () => {
        document.removeEventListener("click", handleDropdown);
      };
    }
  });
  function handleDropDownClick() {
    setShowDropdown(!showDropdown);
    setActive("active-color");
  }
  function handleChangeValue(item) {
    setActive("active-color");
    setSelectedValue(item.value);
    setShowDropdown(false);
  }
  return (
    <div className="comp-dropdown">
      <DropDownLink
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: `${
            isHover || active === "active-color"
              ? "var(--dropdown-heading-color)"
              : "var(--text-color-light)"
          }`,
        }}
        onClick={handleDropDownClick}
        className="comp-dropdown-heading"
      >
        {selectedValue ?? defaultDropdownValue}
        <img src={arrow} alt="" className="comp-dropdown-arrow" />
      </DropDownLink>

      <AnimatePresence>
        {showDropdown && (
          <motion.dialog {...dropdownani} className="comp-dropdown-menu">
            {items.map((item) => (
              <DropDownLink
                key={item.key}
                className="comp-dropdown-item"
                to={item.route}
                onClick={() => handleChangeValue(item)}
              >
                {item.value}
              </DropDownLink>
            ))}
          </motion.dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
