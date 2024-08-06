import styled from "styled-components";
import BookDetails from "../../ui/BookDetails";
import ImgBox from "../../ui/ImgBox";
import { MdLibraryMusic } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";

export default function MusicOrVideoProduct({
  productImg,
  productName,
  productOfferPrice,
  productAuthor,
  productType,
}) {
  return (
    <>
      <MusicVideoProductBox>
        <Box>
          <ImgBox imageURL={productImg} />
          {productType.typeDesc === "AUDIOBOOK" ? (
            <MdLibraryMusic style={{ position: "absolute", top: "10px" }} />
          ) : productType.typeDesc === "VIDEO" ? (
            <BiSolidVideos style={{ position: "absolute", top: "10px" }} />
          ) : (
            ""
          )}
          <ContentBox>
            <BookDetails type="booktitle">{productName}</BookDetails>
            <BookDetails type="author">By {productAuthor}</BookDetails>
            <BookDetails type="price">$ {productOfferPrice}</BookDetails>
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
  min-height: fit-content;
  gap: 0px;
`;
const Box = styled.div`
  width: 188px;
  min-height: 350px;
  gap: 0px;
  opacity: 0px;
  display: inline-block;
  position: relative;
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
