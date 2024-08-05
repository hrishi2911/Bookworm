import styled from "styled-components";
import EbookProduct from "./EbookProduct";

export default function EbookContainer({ arr }) {
  return (
    <ProductBoxContainer>
      {arr.map(({ imageUrl, bookname, price, author }, index) => (
        <EbookProduct
          key={index}
          imageURL={imageUrl}
          bookname={bookname}
          price={price}
          author={author}
        />
      ))}
    </ProductBoxContainer>
  );
}

const ProductBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  column-gap: 100px;
  margin-left: 10px;
  justify-content: space-around;
`;
