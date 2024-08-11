import { useEffect, useState } from "react";
import { getMyShelfDetails } from "../services/apiMyShelf";
import Spinner from "../ui/Spinner";
import EbookProduct from "../features/ProductLayout/EbookProduct";
import styled from "styled-components";
import { getCustomer } from "../services/apiCustomer";
import { useNavigate } from "react-router-dom";

export default function MyLibrary() {
  const [myshelf, setMyshelf] = useState(null);
  const [lentBooksNumber, setLentBooksNumber] = useState(0);
  const [maxBooksAllowed, setMaxBooksAllowed] = useState(0);
  const [books, setBooks] = useState(null);
  const [libraryExpiryDate, setLibraryExpiryDate] = useState(null);
  const custId = localStorage.getItem("custId");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyShelfDetails(localStorage.getItem("custId"));
      setMyshelf(data);
      console.log(data);
      const customerData = await getCustomer(custId);
      setLibraryExpiryDate(customerData.libraryPackage?.expiryDate);
      setMaxBooksAllowed(customerData.libraryPackage.numberOfBooksAllowed);
      console.log(maxBooksAllowed);
      const now = new Date();
      const updatedBooks = data.map((book) => {
        if (book.tranType === "RENT" || book.tranType === "LENT") {
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

      const LentedBooksNumber = data.reduce(
        (acc, book) => (book.tranType === "LENT" ? acc + 1 : acc + 0),
        0
      );
      setLentBooksNumber(LentedBooksNumber);
    };
    fetchData();
    // Calculate remaining days for rented books

    // Filter out expired books
    // const nonExpiredBooks = updatedBooks.filter(book => book.tranType !== 'Rent' || book.Remaining_Days > 0);
  }, [custId, libraryExpiryDate, maxBooksAllowed]);

  console.log(myshelf);
  if (!localStorage.getItem("isLogIn")) return navigate("/login");
  if (books === null || books.length === 0) return <Spinner />;
  const filteredBooks = books.filter(
    (item) =>
      item.tranType === "RENT" ||
      (item.Remaining_Days > 0 && item.tranType === "LENT")
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
            remainingBooks={maxBooksAllowed - lentBooksNumber}
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
