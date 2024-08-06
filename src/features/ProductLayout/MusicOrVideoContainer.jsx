import styled from "styled-components";
import MusicOrVideoProduct from "./MusicOrVideoProduct";

export default function MusicOrVideoContainer({ arr }) {
  return (
    <ProductBoxContainer>
      {arr
        .filter((product, index) => index < 3)
        .map(
          (
            {
              productImg,
              productName,
              productOfferPrice,
              productAuthor,
              productType,
              productId,
            },
            index
          ) => (
            <MusicOrVideoProduct
              key={index}
              productImg={productImg}
              productName={productName}
              productOfferPrice={productOfferPrice}
              productAuthor={productAuthor}
              productType={productType}
              productId={productId}
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
