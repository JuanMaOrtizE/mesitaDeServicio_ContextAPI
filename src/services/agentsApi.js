const API_URL = "http://localhost:4000/api";

async function getErrorMessage(response, fallbackMessage) {
  const errorData = await response.json();

  if (errorData.errors?.length > 0) {
    return errorData.errors.map((error) => error.message).join(". ");
  }

  return errorData.message ?? fallbackMessage;
}

export async function getAgents() {
  const response = await fetch(`${API_URL}/agents`, { credentials: "include" });
  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos de los agentes");
  }

  const data = await response.json();

  return data;
}

export async function updateAgentStatus(agentId, isActive) {
  const response = await fetch(`${API_URL}/agents/${agentId}/status`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudo actualizar el estado del agente.",
    );
    throw new Error(message);
  }

  return response.json();
}
