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
  box-shadow: 0px 15px 80px 0px #0000001a;
  padding-left: 60px;
`;
