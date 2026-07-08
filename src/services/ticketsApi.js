const API_URL = "http://localhost:3000";

export async function getTickets() {
  const response = await fetch(`${API_URL}/tickets`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos de los tickets");
  }

  const data = await response.json();

  return data;
}
