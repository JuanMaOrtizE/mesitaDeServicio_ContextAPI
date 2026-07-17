const API_URL = "http://localhost:4000/api";

export async function getCustomers() {
  const response = await fetch(`${API_URL}/customers`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos de los clientes");
  }

  const data = await response.json();

  return data;
}
