import styled, { keyframes } from "styled-components";

export default function ImgBox({ imageURL, onClick }) {
  return <StyledImgBox src={"./public/" + imageURL} onClick={onClick} />;
}
const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;
const StyledImgBox = styled.img`
  display: block;
  height: 211px;
  padding: 20px;
  object-fit: fit;
  &:hover {
    animation: ${scaleUp} 0.3s forwards;
  }
`;
