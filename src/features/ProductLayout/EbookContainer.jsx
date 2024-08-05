import styled from "styled-components";
import EbookProduct from "./EbookProduct";

export default function EbookContainer({ arr }) {
  return (
    <ProductBoxContainer>
      {arr
        .filter((product, index) => index < 4)
        .map(
          (
            { productImg, productName, productOfferPrice, productAuthor },
            index
          ) => (
            <EbookProduct
              key={index}
              productImg={"../" + productImg}
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
  gap: 20px;
  column-gap: 100px;
  margin-left: 10px;
`;
