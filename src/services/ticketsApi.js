const EXPRESS_API_URL = "http://localhost:4000/api";

async function getErrorMessage(response, fallbackMessage) {
  const errorData = await response.json();

  if (errorData.errors?.length > 0) {
    return errorData.errors.map((error) => error.message).join(". ");
  }

  return errorData.message ?? fallbackMessage;
}

export async function getTickets() {
  const response = await fetch(`${EXPRESS_API_URL}/tickets`, {
    credentials: "include",
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudieron cargar los datos de los tickets.",
    );
    throw new Error(message);
  }

  const data = await response.json();

  return data;
}

export async function getTicketById(ticketId) {
  const response = await fetch(`${EXPRESS_API_URL}/tickets/${ticketId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudo cargar el ticket.",
    );
    throw new Error(message);
  }

  const data = await response.json();

  return data;
}

export async function createTicket(ticket) {
  const response = await fetch(`${EXPRESS_API_URL}/tickets`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });
  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudo crear el ticket.",
    );
    throw new Error(message);
  }

  return response.json();
}

export async function updateTicketStatus(ticketId, status) {
  const response = await fetch(`${EXPRESS_API_URL}/tickets/${ticketId}`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudo actualizar el estado del ticket.",
    );
    throw new Error(message);
  }

  return response.json();
}

export async function updateTicketAgent(ticketId, agentId) {
  const response = await fetch(`${EXPRESS_API_URL}/tickets/${ticketId}`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ agentId }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudo actualizar el agente del ticket.",
    );
    throw new Error(message);
  }

  return response.json();
}

export async function updateTicket(ticketId, updates) {
  const response = await fetch(`${EXPRESS_API_URL}/tickets/${ticketId}`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudo actualizar el ticket.",
    );
    throw new Error(message);
  }

  return response.json();
}

export async function deleteTicket(ticketId) {
  const response = await fetch(`${EXPRESS_API_URL}/tickets/${ticketId}`, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudo eliminar el ticket.",
    );
    throw new Error(message);
  }
}
