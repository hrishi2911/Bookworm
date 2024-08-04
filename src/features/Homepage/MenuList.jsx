import { useState } from "react";
import styled from "styled-components";

function MenuList({ value, index, linkTo }) {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <>
      <StyledList
        $selected={selectedItem === index}
        onClick={() => setSelectedItem(index)}
      >
        {value}
      </StyledList>
    </>
  );
}

const StyledList = styled.li`
  list-style: none;
  color: lightskyblue;
  margin-left: 20px;
  width: 250px;
  background: ${(props) => (props.$selected ? "lightskyblue" : "")};
  color: ${(props) => (props.$selected ? "white" : "lightskyblue")};
  cursor: pointer;
  padding: 10px;
`;

export default MenuList;
