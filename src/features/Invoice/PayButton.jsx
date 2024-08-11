import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../Cart/cartSlice";
import {
  BeneFieriesFetch,
  RoyaltyCalc,
  sendInvoice,
  sendInvoiceDetails,
  sendRoyaltyCal,
} from "../../services/apiRoyaltyCalc";
import { useNavigate } from "react-router-dom";
import { sendMyShelfDetails } from "../../services/apiMyShelf";
import { useEffect, useState } from "react";
import { getCustomer } from "../../services/apiCustomer";

export default function PayButton({ id, value }) {
  const custId = localStorage.getItem("custId");
  const [libraryExpiryDate, setLibraryExpiryDate] = useState(null);
  console.log(custId);
  const navigate = useNavigate();
  useEffect(() => {
    if (custId === null) return navigate("/login");
    const fetchCustomer = async () => {
      const customerData = await getCustomer(custId);
      setLibraryExpiryDate(customerData.libraryPackage?.expiryDate);
    };
    fetchCustomer();
  }, [navigate, custId]);
  const CartItems = useSelector(getCart);
  const CartPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();

  const RentalPrice = CartItems.filter(
    (item) => item.purchaseType === "RENT"
  ).reduce((acc, item) => acc + item.unitPrice, 0);

  async function handleRoyaltyCalculation() {
    for (const item of CartItems) {
      try {
        // Step 1: Create an invoice and get the invoiceId
        // const invoiceResponse = await fetch(
        //   "http://localhost:8080/api/invoices",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       invoiceDate: new Date().toISOString(),
        //       invoiceAmount: CartPrice,
        //       customer: {
        //         customerId: 1,
        //       },
        //     }),
        //   }
        // );

        // if (!invoiceResponse.ok) {
        //   throw new Error("Failed to create invoice");
        // }
        const invoiceData = await sendInvoice(
          CartPrice,
          localStorage.getItem("custId")
        ); //remaining customerId
        // const invoiceData = await invoiceResponse.json();
        console.log(invoiceData);
        const invoiceIdGenerated = invoiceData.invoiceId;
        const now = new Date();
        const returnDate = new Date(libraryExpiryDate);
        const remainingLibraryDays = Math.floor(
          (returnDate - now) / (1000 * 60 * 60 * 24)
        );

        const invoiceDetails = {
          basePrice:
            item.purchaseType === "RENT"
              ? item.minRentDays * item.rentPerDay
              : item.purchaseType === "LENT"
              ? 0
              : item.unitPrice,
          tranType: item.purchaseType,
          rentNoOfDays:
            item.purchaseType === "RENT"
              ? item.minRentDays
              : item.purchaseType === "LENT"
              ? remainingLibraryDays
              : null,
          invoice: { invoiceId: invoiceIdGenerated },
          product: { productId: item.productId },
        };

        sendInvoiceDetails(invoiceDetails);

        const currentDate = new Date();
        const lastDay = new Date(currentDate);
        lastDay.setDate(currentDate.getDate() + item.minRentDays);

        const myShelfDetails = {
          isActive: true,
          tranType: item.purchaseType,
          customer: { customerId: localStorage.getItem("custId") },
          productExpiryDate:
            item.purchaseType === "PURCHASE"
              ? null
              : item.purchaseType === "LENT"
              ? libraryExpiryDate
              : lastDay.toISOString().split("T")[0],
          product: { productId: item.productId },
        };

        sendMyShelfDetails(myShelfDetails);

        // Step 2: Fetch the product beneficiary details including the royalty percentage
        // const productBenResponse = await fetch(
        //   `http://localhost:8080/api/productBeneficiaries/ben/${item.productId}`
        // );

        // if (!productBenResponse.ok) {
        //   throw new Error("Failed to fetch product beneficiary data");
        // }

        const productBenData = await BeneFieriesFetch(item);
        // const productBenData = await productBenResponse.json();

        // let royaltyAmount = 0;
        // const royaltyPercentage = productBenData.prodBenPercentage;

        // if (item.purchaseType === "PURCHASE") {
        //   const basePrice = item.unitPrice;
        //   royaltyAmount = (basePrice * productBenData.prodBenPercentage) / 100;
        // } else if (item.purchaseType === "library") {
        //   const averageBookCost = item.packageCost / item.noOfBooksAllowed;
        //   royaltyAmount = (averageBookCost * royaltyPercentage) / 100;
        // } else if (item.purchaseType === "RENT") {
        //   royaltyAmount = (RentalPrice * royaltyPercentage) / 100;
        // }

        const royaltyAmount = RoyaltyCalc(item, productBenData, RentalPrice);
        const royaltyData = {
          royCalTranDate: new Date().toISOString(),
          qty: 0,
          tranType: item.purchaseType,
          salePrice: item.unitPrice,
          basePrice: item.unitPrice,
          royaltyOnBasePrice: royaltyAmount,
          invoice: { invoiceId: invoiceIdGenerated },
          beneficiary: { benId: productBenData.beneficiary.benId },
          product: { productId: item.productId },
        };

        // Step 3: Post the royalty data to the server
        sendRoyaltyCal(royaltyData);
        //     const royaltyResponse = await fetch(
        //       "http://localhost:8080/api/royalty-calculations",
        //       {
        //         method: "POST",
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(royaltyData),
        //       }
        //     );

        //     if (!royaltyResponse.ok) {
        //       throw new Error("Failed to post royalty data");
        //     }

        //     console.log("Royalty data posted successfully");

        alert("Added to your shelf");
        dispatch(clearCart());
        navigate("/myshelf");
      } catch (error) {
        console.error("Error processing royalty calculation", error);
      }
    }
  }

  return (
    <button id={id} onClick={handleRoyaltyCalculation}>
      {value}
    </button>
  );
}
