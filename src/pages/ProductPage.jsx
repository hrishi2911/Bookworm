import { NavLink } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  /* background-color: #f5f5f5; */
`;

const Card = styled.div`
  display: flex;
  background-image: url("./categorybg.jpg");
  /* background-color: #34bee4; */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 300px;
  height: 200px;
  font-size: 2rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  object-fit: scale-down;
  color: black;
  font-weight: 600;
`;

export default function ProductPage() {
  const arr = ["Adventure", "Fiction", "Romance", "Thriller"];
  return (
    <>
      <CardContainer>
        {arr.map((category, index) => (
          <NavLink to={`/category/${category}`} key={index}>
            <Card>{category}</Card>
          </NavLink>
        ))}
      </CardContainer>
      ;
    </>
  );
}
