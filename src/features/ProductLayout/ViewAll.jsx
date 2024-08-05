import styled from "styled-components";
import EbookProduct from "./EbookProduct";

export default function ViewAllContainer({ ebookarr }) {
    return (
        <ViewAllBoxContainer>
            {ebookarr.map(({ imageUrl, bookname, price, author }, index) => (
                <EbookProduct
                    key={index}
                    imageURL={imageUrl}
                    bookname={bookname}
                    price={price}
                    author={author}
                />
            ))}
        </ViewAllBoxContainer>
    );
}

const ViewAllBoxContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    column-gap: 100px;
    margin-left: 10px;
    justify-content: space-around;
`;
