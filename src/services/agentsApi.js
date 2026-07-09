const API_URL = "http://localhost:3000";

export async function getAgents() {
  const response = await fetch(`${API_URL}/agents`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos de los agentes");
  }

  const data = await response.json();

  return data;
}
