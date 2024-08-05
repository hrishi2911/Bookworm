export async function getAllProducts() {
  const response = await fetch("http://localhost:8080/api/products");
  const data = await response.json();
  console.log(data);
  return data;
}
