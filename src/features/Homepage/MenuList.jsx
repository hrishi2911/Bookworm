
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function MenuList({ value, index, linkTo, selectedIndex, onSelect }) {
  return (
    <NavLink to={linkTo} onClick={() => onSelect(index)}>
      <StyledList $selected={selectedIndex === index}>
        {value}
      </StyledList>
    </NavLink>
  );
}

const StyledList = styled.li`
  list-style: none;
  color: ${(props) => (props.$selected ? "white" : "lightskyblue")};
  background: ${(props) => (props.$selected ? "lightskyblue" : "transparent")};
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${(props) => (props.$selected ? "lightskyblue" : "#e0e0e0")};
  }
`;

export default MenuList;
