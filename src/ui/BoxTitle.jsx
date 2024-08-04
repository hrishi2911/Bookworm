import styled from "styled-components";
import Button from "./Button";

export default function BoxTitle({ titleName }) {
  return (
    <StyledBoxTitle>
      <Title>{titleName}</Title>
      <Button variation="primary">View All</Button>
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
