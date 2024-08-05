import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function BoxTitle({ titleName, viewAll, showViewAll = true }) {
  return (
    <StyledBoxTitle>
      <Title>{titleName}</Title>
      <Link to={`/EBookViewAll?type=${viewAll}`}>
        {showViewAll && <Button variation="primary">View All</Button>}
      </Link>
    </StyledBoxTitle>
  );
}

const Title = styled.h1``;

const StyledBoxTitle = styled.div`
  padding: 20px 20px;
  display: flex;
  width: auto;
  justify-content: space-between;
`;
