import { assignLibraryToCustomer } from "./apiCustomer";

export async function sendLibraryDetails(library, customerData, custId) {
  const response = await fetch(`http://localhost:8080/api/library-packages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(library),
  });
  const data = await response.json();
  customerData.libraryPackage = { id: data.id };
  assignLibraryToCustomer(customerData, custId);
  return data;
}
