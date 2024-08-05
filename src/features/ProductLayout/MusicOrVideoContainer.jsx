import styled from "styled-components";
import MusicOrVideoProduct from "./MusicOrVideoProduct";

export default function MusicOrVideoContainer({ arr }) {
  return (
    <ProductBoxContainer>
      {arr
        .filter((product, index) => index < 3)
        .map(
          (
            { productImg, productName, productOfferPrice, productAuthor },
            index
          ) => (
            <MusicOrVideoProduct
              key={index}
              productImg={productImg}
              productName={productName}
              productOfferPrice={productOfferPrice}
              productAuthor={productAuthor}
            />
          )
        )}
    </ProductBoxContainer>
  );
}

const ProductBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
