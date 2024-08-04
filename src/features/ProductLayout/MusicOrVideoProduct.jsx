import styled from "styled-components";
import BookDetails from "../../ui/BookDetails";
import ImgBox from "../../ui/ImgBox";

export default function MusicOrVideoProduct({
  imageURL,
  bookname,
  author,
  price,
}) {
  return (
    <>
      <MusicVideoProductBox>
        <Box>
          <ImgBox imageURL={imageURL} />
          <ContentBox>
            <BookDetails type="booktitle">{bookname}</BookDetails>
            <BookDetails type="author">By {author}</BookDetails>
            <BookDetails type="price">$ {price}</BookDetails>
          </ContentBox>
        </Box>
      </MusicVideoProductBox>
    </>
  );
}

const MusicVideoProductBox = styled.div`
  opacity: 0px;
  margin: 0 auto;
  width: 250.45px;
  height: 20.35px;
  gap: 0px;
`;
const Box = styled.div`
  width: 188px;
  height: 288px;
  gap: 0px;
  opacity: 0px;
`;
// const ImgBox = styled.img`
//   width: 100%;
//   height: 100%;
//   /* padding: 20px; */
//   object-fit: fit;
// `;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 100px;
`;
