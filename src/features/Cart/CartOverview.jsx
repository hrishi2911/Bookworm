import { useSelector } from "react-redux";
import { getTotalQuantity } from "./cartSlice";
import { BsCart3 } from "react-icons/bs";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CartOverview() {
  const totalProducts = useSelector(getTotalQuantity);
  return (
    <>
      <Link to="/cart">
      <div>
        <BsCart3 style={{ position: "relative" }} />
        <StyledButton>{totalProducts}</StyledButton>
      </div>
      </Link>
    </>
  );
}

const StyledButton = styled.button`
  position: absolute;
  height: 25px;
  width: 25px;
  top: 10px;
  background: transparent;
  border: none;
  border-radius: 100%;
  background-color: red;
  color: white;
  padding: 5px;
`;

export default CartOverview;
