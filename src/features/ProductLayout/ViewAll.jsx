import styled from "styled-components";
import EbookProduct from "./EbookProduct";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/apiProduct";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import BoxTitle from "../../ui/BoxTitle";

export default function ViewAllContainer({ searchTerm }) {
  const [products, setProducts] = useState(null);
  const [searchParams] = useSearchParams();
  const viewAllProductType = searchParams.get("type");
  console.log(viewAllProductType);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();

      const filterData = data.filter(
        (product) =>
          product.productType.typeDesc === viewAllProductType.toUpperCase()
      );
      setProducts(filterData);
      console.log(data);
    };

    fetchData();
  }, [viewAllProductType]);

  const filterProducts = (products) => {
    if (!searchTerm) return products;
    return products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productAuthor
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.productIsbn.includes(searchTerm)
    );
  };

  if (products === null) return <Spinner />;
  if (products.length === 0) return <div>No more {viewAllProductType}</div>;

  const filteredEbooks = filterProducts(products);
  return (
    <>
      <BoxTitle titleName={viewAllProductType} showViewAll={false} />
      <ViewAllBoxContainer>
        {filteredEbooks.map((product, index) => (
          <EbookProduct key={index} product={product} />
        ))}
      </ViewAllBoxContainer>
    </>
  );
}

const ViewAllBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  column-gap: 100px;
  margin-left: 10px;
  justify-content: space-around;
`;
