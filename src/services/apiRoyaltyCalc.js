export async function sendInvoice(CartPrice, custId) {
  const invoiceResponse = await fetch("http://localhost:8080/api/invoices", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      invoiceDate: new Date().toISOString(),
      invoiceAmount: CartPrice,
      customer: {
        customerId: custId,
      },
    }),
  });

  if (!invoiceResponse.ok) {
    throw new Error("Failed to create invoice");
  }
  return await invoiceResponse.json();
}

export async function BeneFieriesFetch(item) {
  const productBenResponse = await fetch(
    `http://localhost:8080/api/productBeneficiaries/ben/${item.productId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );

  if (!productBenResponse.ok) {
    throw new Error("Failed to fetch product beneficiary data");
  }
  const data = await productBenResponse.json();
  return data;
}

export function RoyaltyCalc(item, productBenData, RentalPrice) {
  let royaltyAmount = 0;
  const royaltyPercentage = productBenData.prodBenPercentage;

  if (item.purchaseType === "PURCHASE") {
    const basePrice = item.unitPrice;
    royaltyAmount = (basePrice * productBenData.prodBenPercentage) / 100;
  } else if (item.purchaseType === "LENT") {
    const averageBookCost = item.packageCost / item.noOfBooksAllowed;
    royaltyAmount = (averageBookCost * royaltyPercentage) / 100;
  } else if (item.purchaseType === "RENT") {
    royaltyAmount = (RentalPrice * royaltyPercentage) / 100;
  }
  return royaltyAmount;
}

export async function sendRoyaltyCal(royaltyData) {
  const royaltyResponse = await fetch(
    "http://localhost:8080/api/royalty-calculations",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(royaltyData),
    }
  );

  if (!royaltyResponse.ok) {
    throw new Error("Failed to post royalty data");
  }
  console.log("Royalty data posted successfully");
}

export async function sendInvoiceDetails(invoiceDetails) {
  const invoiceDetail = await fetch(
    "http://localhost:8080/api/invoice-details",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceDetails),
    }
  );
  console.log("Successfully insert in invoice table");
  return await invoiceDetail.json();
}
