import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { getCustomer } from "../services/apiCustomer";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import styled from "styled-components";

const MyAccount = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  console.log(localStorage.getItem("custId"));
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomer(localStorage.getItem("custId"));
      console.log(data);
      setCustomer(data);
      if (data === null) {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);
  console.log(customer);
  if (!localStorage.getItem("isLogIn")) return navigate("/login");
  if (customer === null) return <Spinner />;
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol>
          <StyledCard>
            <StyledCardBody>
              <StyledCardTitle>Customer Information</StyledCardTitle>
              <StyledCardText>
                <Strong>Name:</Strong> {customer.customerName}
              </StyledCardText>
              <StyledCardText>
                <Strong>Email:</Strong> {customer.customerEmail}
              </StyledCardText>
              <StyledCardText>
                <Strong>Phone:</Strong> {customer.customerPhone}
              </StyledCardText>
              <StyledCardText>
                <Strong>Address:</Strong> {customer.customerAddress}
              </StyledCardText>
              <StyledCardText>
                <Strong>Occupation:</Strong> {customer.customerOccupation}
              </StyledCardText>
            </StyledCardBody>
          </StyledCard>
        </StyledCol>
      </StyledRow>
    </StyledContainer>
  );
};

export default MyAccount;

const StyledContainer = styled(Container)`
  margin: 3rem;
`;

const StyledRow = styled(Row)`
  justify-content: center;
`;

const StyledCol = styled(Col)`
  max-width: 600px;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const StyledCardBody = styled(Card.Body)`
  padding: 2rem;
`;

const StyledCardTitle = styled(Card.Title)`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const StyledCardText = styled(Card.Text)`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
`;

const Strong = styled.strong`
  color: #000;
`;
