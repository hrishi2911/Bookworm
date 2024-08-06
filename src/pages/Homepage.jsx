import styled from "styled-components";
import HomepageLayout from "../features/Homepage/HomepageLayout";
import SideMenu from "../features/Homepage/SideMenu";
import AppLayout from "./AppLayout";
import Footer from "../features/Homepage/Footer";
import FilterComponent from "../features/Homepage/Filter";

export default function Homepage() {
  return (
    <>
      <HomepageLayout />
      <FilterComponent />
      <Container>
        <SideMenu />
        <AppLayout />
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  margin-top: 20px;
  display: flex;
`;
