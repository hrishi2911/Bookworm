import styled from "styled-components";
import MusicOrVideoProduct from "./MusicOrVideoProduct";

export default function MusicOrVideoContainer({ arr }) {
  return (
    <ProductBoxContainer>
      {arr
        .filter((product, index) => index < 3)
        .map((product, index) => (
          <MusicOrVideoProduct key={index} product={product} />
        ))}
    </ProductBoxContainer>
  );
}

const ProductBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
