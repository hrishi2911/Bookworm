import styled from "styled-components";
import EbookProduct from "./EbookProduct";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/apiProduct";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import BoxTitle from "../../ui/BoxTitle";

export default function ViewAllContainer() {
  const [arr, setArr] = useState(null);
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
      setArr(filterData);
      console.log(data);
    };

    fetchData();
  }, [viewAllProductType]);

  if (arr === null) return <Spinner />;
  if (arr.length === 0) return <div>No more {viewAllProductType}</div>;
  return (
    <>
      <BoxTitle titleName={viewAllProductType} showViewAll={false} />
      <ViewAllBoxContainer>
        {arr.map(
          (
            { productImg, productName, productOfferPrice, productAuthor },
            index
          ) => (
            <EbookProduct
              key={index}
              productImg={"../" + productImg}
              productName={productName}
              productOfferPrice={productOfferPrice}
              productAuthor={productAuthor}
            />
          )
        )}
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
