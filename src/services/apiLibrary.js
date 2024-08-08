import { assignCustomerLibrary } from "./apiCustomer";

export async function sendLibraryDetails(library, custId) {
  const response = await fetch(`http://localhost:8080/api/library-packages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(library),
  });
  const data = await response.json();
  assignCustomerLibrary(data.id, custId);
  return data;
}
