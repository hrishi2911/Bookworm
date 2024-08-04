import React from "react";
import styled, { keyframes } from "styled-components";

export default function ImgBox({ imageURL }) {
  return <StyledImgBox src={imageURL} />;
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
  height: 211px;
  padding: 20px;
  object-fit: fit;
  &:hover {
    animation: ${scaleUp} 0.3s forwards;
  }
`;
