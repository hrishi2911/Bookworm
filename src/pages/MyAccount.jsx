import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { getCustomer } from "../services/apiCustomer";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

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
  if (customer === null) return <Spinner />;
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Customer Information
              </Card.Title>
              <Card.Text>
                <strong>Name:</strong> {customer.customerName}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {customer.customerEmail}
              </Card.Text>
              <Card.Text>
                <strong>Phone:</strong> {customer.customerPhone}
              </Card.Text>
              <Card.Text>
                <strong>Address:</strong> {customer.customerAddress}
              </Card.Text>
              <Card.Text>
                <strong>Occupation:</strong> {customer.customerOccupation}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccount;
