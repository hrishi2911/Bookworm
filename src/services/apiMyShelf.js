export async function sendMyShelfDetails(shelf) {
  const shelfDetail = await fetch("http://localhost:8080/api/MyShelf", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shelf),
  });
  console.log("Successfully insert in shelf table");
  return await shelfDetail.json();
}

export async function getMyShelfDetails(id) {
  const response = await fetch(
    `http://localhost:8080/api/MyShelf/customer/${id}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
