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

export async function updateTicketStatus(ticketId, status) {
  const updatedAt = new Date().toISOString();
  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, updatedAt }),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el estado del ticket.");
  }
  return response.json();
}

export async function updateTicket(ticketId, updates) {
  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el ticket.");
  }
  return response.json();
}

export async function deleteTicket(ticketId) {
  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el ticket.");
  }
}
