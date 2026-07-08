const API_URL = "http://localhost:3000";

export async function getTickets() {
  const response = await fetch(`${API_URL}/tickets`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos de los tickets");
  }

  const data = await response.json();

  return data;
}

export async function createTicket(ticket) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el ticket.");
  }
  return response.json();
}
