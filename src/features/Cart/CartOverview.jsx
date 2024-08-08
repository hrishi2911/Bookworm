import { useSelector } from "react-redux";
import { getTotalLength } from "./cartSlice";
import { BsCart3 } from "react-icons/bs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CartOverview() {
  const totalProducts = useSelector(getTotalLength);
  const navigate = useNavigate();

  function handleGoToInvoice() {
    navigate("/cart");
  }
  return (
    <>
      <IconWrapper>
        <BsCart3
          style={{ position: "relative", cursor: "pointer" }}
          onClick={handleGoToInvoice}
        />
        <StyledButton>{totalProducts}</StyledButton>
      </IconWrapper>
    </>
  );
}

const StyledButton = styled.button`
  position: absolute;
  height: 25px;
  width: 25px;
  top: 1px;
  background: transparent;
  border: none;
  border-radius: 100%;
  background-color: red;
  color: white;
  padding: 5px;
`;

const IconWrapper = styled.div`
  position: fixed;
  /* bottom: 20px; */
  top: 50px;
  height: 30px;
  width: 30px;
  right: 80px;
  z-index: 1000;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default CartOverview;
