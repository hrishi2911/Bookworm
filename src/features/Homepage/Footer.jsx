import styled from "styled-components";

function Footer() {
  return (
    <>
      <FSection>
        2023-2024 ©bookWorm.com
        <br />
        <a href="#">About</a>
        <br />
        <a href="#">Contact Us</a>
        <br />
        <a href="#">Feedback</a>
      </FSection>
    </>
  );
}

export default Footer;

const FSection = styled.div`
  background-color: #00acd2;
  align-content: center;
  text-align: center;
  color: white;
  width: 100%;
  height: 120px;
  font-size: x-large;
  margin-top: 20px;
`;
