const API_URL = "http://localhost:3000";

export async function getCommentsByTicketId(ticketId) {
  const response = await fetch(`${API_URL}/comments`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los comentarios");
  }

  const comments = await response.json();

  return comments.filter((comment) => comment.ticketId === ticketId);
}

export async function createComment(comment) {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el comentario.");
  }

  return response.json();
}
