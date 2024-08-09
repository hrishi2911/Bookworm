import { useEffect, useState } from "react";
import { getMyShelfDetails } from "../services/apiMyShelf";
import Spinner from "../ui/Spinner";
import EbookProduct from "../features/ProductLayout/EbookProduct";
import styled from "styled-components";

export default function Myshelf() {
  const [myshelf, setMyshelf] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyShelfDetails(localStorage.getItem("custId"));
      setMyshelf(data);
      console.log(data);
    };
    fetchData();
  }, []);

  console.log(myshelf);
  if (myshelf === null || myshelf.length === 0) return <Spinner />;
  return (
    <ProductBoxContainer>
      {myshelf
        .filter((item) => item.tranType === "PURCHASE")
        .map((item) => (
          <EbookProduct
            product={item.product}
            isMyshelf={true}
            key={item.product.productId}
          />
        ))}
    </ProductBoxContainer>
  );
}

const ProductBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  column-gap: 100px;
  margin-left: 10px;
`;
