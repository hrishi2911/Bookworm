import styled from "styled-components";
import HomepageLayout from "../features/Homepage/HomepageLayout";
import SideMenu from "../features/Homepage/SideMenu";

export default function Homepage() {
  return (
    <>
      <HomepageLayout />
      <Container>
        <SideMenu />
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  height: auto;
  min-height: 1400px;
`;
