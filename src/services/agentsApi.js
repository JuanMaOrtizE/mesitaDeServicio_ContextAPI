const API_URL = "http://localhost:4000/api";

export async function getAgents() {
  const response = await fetch(`${API_URL}/agents`, { credentials: "include" });
  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos de los agentes");
  }

  const data = await response.json();

  return data;
}
