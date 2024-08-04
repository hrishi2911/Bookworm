import styled from "styled-components";
import MusicOrVideoProduct from "./MusicOrVideoProduct";

export default function MusicOrVideoContainer({ arr }) {
  return (
    <ProductBoxContainer>
      {arr.map(({ imageUrl, bookname, price, author }, index) => (
        <MusicOrVideoProduct
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
  flex-wrap: nowrap;
  height: auto;
  min-height: 60vh;
`;
