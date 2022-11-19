import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--text-color-grey);
  &:hover {
    color: var(--text-color-dark);
  }
`;
export const JournalTitleLink = styled(Link)`
  text-decoration: none;
  color: var(--text-color-link);
`;
export const FooterLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding-block: 0.5em;
  cursor: pointer;
  color: var(--text-color-grey);
  &:hover {
    color: var(--text-color-dark);
  }
`;
export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: var(--header-text-inactive);
  &:hover {
    color: var(--header-text-active);
  }
`;
export const DropDownLink = styled(Link)`
  text-decoration: none;
`;
