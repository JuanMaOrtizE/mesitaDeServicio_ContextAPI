const EXPRESS_API_URL = "http://localhost:4000/api";

export async function getCommentsByTicketId(ticketId) {
  const response = await fetch(
    `${EXPRESS_API_URL}/tickets/${ticketId}/comments`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("No se pudieron cargar los comentarios");
  }

  return response.json();
}

export async function createComment(comment) {
  const response = await fetch(
    `${EXPRESS_API_URL}/tickets/${comment.ticketId}/comments`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: comment.body,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("No se pudo crear el comentario.");
  }

  return response.json();
}
