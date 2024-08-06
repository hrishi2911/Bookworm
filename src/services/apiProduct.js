export async function getAllProducts() {
  const response = await fetch("http://localhost:8080/api/products");
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getProduct(id) {
  const response = await fetch(`http://localhost:8080/api/products/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
}
