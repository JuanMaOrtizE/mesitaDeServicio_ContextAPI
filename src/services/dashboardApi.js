const EXPRESS_API_URL = "http://localhost:4000/api";

async function getErrorMessage(response, fallbackMessage) {
  const errorData = await response.json();

  if (errorData.errors?.length > 0) {
    return errorData.errors.map((error) => error.message).join(". ");
  }

  return errorData.message ?? fallbackMessage;
}

export async function getDashboardSummary() {
  const response = await fetch(`${EXPRESS_API_URL}/dashboard/summary`, {
    credentials: "include",
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "No se pudieron cargar las métricas.",
    );
    throw new Error(message);
  }

  const data = await response.json();

  return data;
}
