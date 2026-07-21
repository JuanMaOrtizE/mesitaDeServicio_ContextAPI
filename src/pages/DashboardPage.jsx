import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardApi";

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadSummary() {
      try {
        setIsLoading(true);
        setLoadError("");
        const summaryData = await getDashboardSummary();

        setSummary(summaryData);
      } catch (error) {
        setLoadError(
          error.message ?? "Ocurrió un error al cargar las métricas.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    loadSummary();
  }, []);

  const generalMetrics = summary
    ? [
        { label: "Total de tickets", value: summary.totalTickets },
        { label: "Clientes", value: summary.totalCustomers },
        { label: "Agentes", value: summary.totalAgents },
        { label: "Comentarios", value: summary.totalComments },
      ]
    : [];

  const statusMetrics = summary
    ? [
        { label: "Abiertos", value: summary.openTickets },
        { label: "En progreso", value: summary.inProgressTickets },
        { label: "Resueltos", value: summary.resolvedTickets },
      ]
    : [];

  const operationalMetrics = summary
    ? [
        { label: "Prioridad alta", value: summary.highPriorityTickets },
        { label: "Sin asignar", value: summary.unassignedTickets },
      ]
    : [];

  function renderMetricCards(metrics) {
    return (
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <article
            className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
            key={metric.label}
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
      </header>
      <p className="mt-2 text-sm text-slate-600">
        Resumen general del estado de los tickets y actividad del Help Desk.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {isLoading && <p className="text-sm text-slate-600">Cargando métricas...</p>}

        {loadError && (
          <p
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            role="alert"
          >
            {loadError}
          </p>
        )}

        {summary && (
          <div className="space-y-8">
            <section>
              <h2 className="text-base font-semibold text-slate-900">
                Resumen general
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Volumen total de actividad y recursos registrados.
              </p>
              {renderMetricCards(generalMetrics)}
            </section>

            <section>
              <h2 className="text-base font-semibold text-slate-900">
                Estado de tickets
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Distribución actual del trabajo según avance.
              </p>
              {renderMetricCards(statusMetrics)}
            </section>

            <section>
              <h2 className="text-base font-semibold text-slate-900">
                Alertas operativas
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tickets que requieren atención o asignación.
              </p>
              {renderMetricCards(operationalMetrics)}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
