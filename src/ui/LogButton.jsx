import styled from "styled-components";
function LogButton({ value, handleLogout }) {
  return (
    <>
      <StyledButton onClick={handleLogout}>{value}</StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  height: 56.08px;
  width: 160px;
  background-color: #f5f6f8;
  color: Black;
  border: none;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
    transition: 0.5s ease-in-out;
  }
`;
export default LogButton;
