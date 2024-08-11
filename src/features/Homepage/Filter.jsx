import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";

const Types = ["All", "eBook", "Video", "Music"];

const Generes = ["All", "Horror", "Comic", "Sci-fi"];

const FilterComponent = () => {
  const [selectedType, setSelectedType] = useState(Types[0]);
  const [selectedGenere, setSelectedGenere] = useState(Generes[0]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleGenereChange = (event) => {
    setSelectedGenere(event.target.value);
  };

  return (
    <Container style={{ justifyContent: "end", display: "flex" }}>
      <Row>
        <Dropdown value={selectedType} onChange={handleTypeChange}>
          {Types.map((Type) => (
            <option key={Type} value={Type}>
              {Type}
            </option>
          ))}
        </Dropdown>
        {selectedType === "All"}
        {selectedType === "eBook"}
        {selectedType === "Video"}
        {selectedType === "Music"}
        <Dropdown value={selectedGenere} onChange={handleGenereChange}>
          {Generes.map((Genere) => (
            <option key={Genere} value={Genere}>
              {Genere}
            </option>
          ))}
        </Dropdown>
        {selectedGenere === "All"}
        {selectedGenere === "Horror"}
        {selectedGenere === "Comic"}
        {selectedGenere === "Sci-fi"}
      </Row>
    </Container>
  );
};

export default FilterComponent;

const Dropdown = styled.select`
  margin-right: 20px;
  border-radius: 20px;
  padding: 10px 20px 10px 20px;
  font-size: 16px;
`;
