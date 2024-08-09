import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    text-transform: capitalize;
    font-weight: 600;
    /* text-align: center; */
  `,
};

const variations = {
  booktitle: css`
    font-size: 1.6rem;
    text-transform: capitalize;
    font-weight: 600;
    width: 180px;
  `,
  author: css`
    width: 200px;
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 400;
    color: #00000099;
    opacity: 60%;
  `,
  price: css`
    font-size: 1.4rem;
    text-transform: uppercase;
    font-weight: 600;
  `,
  days: css`
    font-size: 1.4rem;
    text-transform: uppercase;
    font-weight: 600;
    color: red;
  `,
};

const BookDetails = styled.p`
  /* ${(props) => sizes[props.size]} */
  ${(props) => variations[props.type]}
`;

BookDetails.defaultProps = {
  size: "booktitle",
};

export default BookDetails;
