import { assignLibraryToCustomer } from "./apiCustomer";

export async function sendLibraryDetails(library, customerData, custId) {
  const response = await fetch(`http://localhost:8080/api/library-packages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(library),
  });
  const data = await response.json();
  console.log(data);
  console.log("Added Library to library table");
  assignLibraryToCustomer(customerData, custId, data.id);
  return data;
}
