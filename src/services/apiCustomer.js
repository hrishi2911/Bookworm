export async function getCustomer(id) {
  const response = await fetch(`http://localhost:8080/api/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function assignLibraryToCustomer(customerData, custId, libraryId) {
  const invoiceDetail = await fetch(
    `http://localhost:8080/api/customers/${custId}/${libraryId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    }
  );
  console.log("Successfully added library to customer");
  return await invoiceDetail.json();
}
