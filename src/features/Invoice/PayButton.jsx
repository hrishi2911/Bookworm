import { useSelector } from "react-redux";
import { getCart, getTotalPrice } from "../Cart/cartSlice";
import {
  BeneFieriesFetch,
  RoyaltyCalc,
  sendInvoice,
  sendInvoiceDetails,
  sendRoyaltyCal,
} from "../../services/apiRoyaltyCalc";
import { useNavigate } from "react-router-dom";
import { sendMyShelfDetails } from "../../services/apiMyShelf";
import { useEffect } from "react";

export default function PayButton({ id, value }) {
  const navigate = useNavigate();
  const CartItems = useSelector(getCart);
  const CartPrice = useSelector(getTotalPrice);

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

        const invoiceDetails = {
          quantity: 0,
          basePrice: item.unitPrice,
          tranType: item.purchaseType,
          rentNoOfDays: item.purchaseType === "RENT" ? 1 : null,
          invoice: { invoiceId: invoiceIdGenerated },
          product: { productId: item.productId },
        };

        sendInvoiceDetails(invoiceDetails);

        const currentDate = new Date();
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);

        const myShelfDetails = {
          quantity: 0,
          isActive: true,
          tranType: item.purchaseType,
          customer: { customerId: localStorage.getItem("custId") },
          rentNoOfDays: item.purchaseType === "RENT" ? 1 : null,
          productExpiryDate:
            item.purchaseType === "PURCHASE"
              ? null
              : nextDay.toISOString().split("T")[0],
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
        navigate("/myshelf");
      } catch (error) {
        console.error("Error processing royalty calculation", error);
      }
    }
  }

  const custId = localStorage.getItem("custId");
  console.log(custId);
  useEffect(() => {
    if (custId === null) return navigate("/login");
  }, [navigate, custId]);

  return (
    <button id={id} onClick={handleRoyaltyCalculation}>
      {value}
    </button>
  );
}
