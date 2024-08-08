import styled from "styled-components";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  background-color: white;
  width: 100%;
  box-shadow: 0px 15px 80px 0px #0000001a;
  padding-left: 60px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
`;
