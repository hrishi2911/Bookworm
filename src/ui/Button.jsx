import styled, { css, keyframes } from "styled-components";

const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
};

const variations = {
  primary: css`
    color: skyblue;
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;
    &:hover {
      color: #4abdef;
      animation: ${scaleUp} 0.3s forwards;
    }
  `,
};
const Button = styled.button`
  border: none;
  border-radius: 0;
  box-shadow: 0;

  ${(props) => variations[props.variation]}
  ${(props) => sizes[props.size]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "small",
};

export default Button;
