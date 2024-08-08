export async function getCustomer(id) {
  const response = await fetch(`http://localhost:8080/api/customers/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
}
