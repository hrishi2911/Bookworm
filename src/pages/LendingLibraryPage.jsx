import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { sendLibraryDetails } from "../services/apiLibrary";
import { getCustomer } from "../services/apiCustomer";
import { getAllProducts } from "../services/apiProduct";
import Spinner from "../ui/Spinner";
import BoxTitle from "../ui/BoxTitle";
import EbookContainer from "../features/ProductLayout/EbookContainer";
import { getMyShelfDetails } from "../services/apiMyShelf";

const libraries = [
  { packageName: "Basic Library", cost: 300, numberOfBooksAllowed: 4 },
  { packageName: "Gold Library", cost: 400, numberOfBooksAllowed: 6 },
  { packageName: "Premium Library", cost: 500, numberOfBooksAllowed: 10 },
];

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  /* background-color: #f5f5f5; */
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 300px;
  text-align: center;
`;

const LibraryName = styled.h2`
  font-size: 1.5em;
  color: #333;
`;

const PackageCost = styled.p`
  font-size: 1.2em;
  color: #666;
`;

const AllowedBooks = styled.p`
  font-size: 1em;
  color: #999;
`;

export default function LendingLibraryPage({ searchTerm }) {
  const [haveLibrary, setHaveLibrary] = useState(false);
  const [customerData, setCustomerData] = useState();
  const [lentBooksNumber, setLentBooksNumber] = useState(0);
  // const [libraryUpdated, setLibraryUpdated] = useState();
  const custId = localStorage.getItem("custId");

  useEffect(() => {
    const fetchCustomer = async () => {
      const customerData = await getCustomer(custId);
      setCustomerData(customerData);
      const id = customerData.libraryPackage?.id;
      if (id !== null && id !== undefined) {
        setHaveLibrary(true);
        // setLibraryId(id);
      }
    };
    fetchCustomer();
  }, [custId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyShelfDetails(localStorage.getItem("custId"));
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
  }, [custId, lentBooksNumber]);

  const navigate = useNavigate();
  function handleBuyLibrary(library) {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(currentDate.getDate() + 30);
    library["expiryDate"] = expiryDate;
    console.log(custId);
    if (custId === null || custId === undefined) return navigate("/login");
    console.log(customerData);
    sendLibraryDetails(library, customerData, custId);

    setHaveLibrary(true);
  }

  const [ebookList, setEbookList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setEbookList(
        data.filter(
          (product) =>
            product.productType.typeDesc === "EBOOK" && product.library === true
        )
      );
    };
    fetchData();
  }, []);

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

  if (ebookList === null) return <Spinner />;

  const filteredEbooks = filterProducts(ebookList);

  return (
    <>
      {haveLibrary ? (
        <>
          <BoxTitle titleName={"eBook"} viewAll={"ebook"} />
          <EbookContainer
            arr={filteredEbooks}
            fromLendingLibrary={true}
            lentBooksNumber={lentBooksNumber}
          />
        </>
      ) : (
        <CardContainer>
          {libraries.map((library, index) => (
            <Card key={index}>
              <LibraryName>{library.packageName}</LibraryName>
              <PackageCost>Package Cost: ${library.cost}</PackageCost>
              <AllowedBooks>
                Allowed Books: {library.numberOfBooksAllowed}
              </AllowedBooks>
              <Button onClick={() => handleBuyLibrary(library)}>Buy </Button>
            </Card>
          ))}
        </CardContainer>
      )}
    </>
  );
}
