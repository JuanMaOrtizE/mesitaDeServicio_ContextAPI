const API_URL = "http://localhost:3000";

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos de las categorías");
  }

  const data = await response.json();

  return data;
}
