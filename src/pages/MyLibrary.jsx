import { useEffect, useState } from "react";
import { getMyShelfDetails } from "../services/apiMyShelf";
import Spinner from "../ui/Spinner";
import EbookProduct from "../features/ProductLayout/EbookProduct";
import styled from "styled-components";

export default function MyLibrary() {
  const [myshelf, setMyshelf] = useState(null);
  const [books, setBooks] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyShelfDetails(localStorage.getItem("custId"));
      setMyshelf(data);
      console.log(data);
      const now = new Date();
      const updatedBooks = data.map((book) => {
        if (book.tranType === "RENT" && book.productExpiryDate) {
          const returnDate = new Date(book.productExpiryDate);
          const remainingDays = Math.floor(
            (returnDate - now) / (1000 * 60 * 60 * 24)
          );
          return { ...book, Remaining_Days: remainingDays };
        }
        return book;
      });
      console.log(updatedBooks);
      setBooks(updatedBooks);
    };
    fetchData();
    // Calculate remaining days for rented books

    // Filter out expired books
    // const nonExpiredBooks = updatedBooks.filter(book => book.tranType !== 'Rent' || book.Remaining_Days > 0);
  }, []);

  console.log(myshelf);
  if (books === null || books.length === 0) return <Spinner />;
  const filteredBooks = books.filter(
    (item) =>
      (item.Remaining_Days > 0 && item.tranType === "RENT") ||
      item.tranType === "LENT"
  );
  return (
    <ProductBoxContainer>
      {filteredBooks.length > 0 ? (
        filteredBooks.map((item) => (
          <EbookProduct
            product={item.product}
            isMyshelf={true}
            key={item.product.productId}
            remainingDays={item.Remaining_Days}
          />
        ))
      ) : (
        <p>No books available</p>
      )}
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
