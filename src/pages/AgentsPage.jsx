import { useEffect, useState } from "react";
import { getAgents, updateAgentStatus } from "../services/agentsApi";
import { useAuth } from "../context/useAuth";

function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const { user } = useAuth();

  const canUpdateAgent = user?.role === "admin";

  useEffect(() => {
    async function loadAgents() {
      try {
        setIsLoading(true);
        setLoadError("");

        const agentsData = await getAgents();

        setAgents(agentsData);
      } catch (error) {
        setLoadError(error.message ?? "Ocurrió un error al cargar agentes.");
      } finally {
        setIsLoading(false);
      }
    }

    loadAgents();
  }, []);

  async function handleToggleAgentStatus(agent) {
    try {
      setLoadError("");

      const updatedAgent = await updateAgentStatus(agent.id, !agent.isActive);

      setAgents((currentAgents) =>
        currentAgents.map((currentAgent) =>
          currentAgent.id === updatedAgent.id ? updatedAgent : currentAgent,
        ),
      );
    } catch (error) {
      setLoadError(
        error.message ?? "No se pudo actualizar el estado del agente.",
      );
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Agentes
        </h1>
      </header>
      <p className="mt-2 text-sm text-slate-600">
        Agentes disponibles para atender y dar seguimiento a los tickets.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {isLoading && (
          <p className="text-sm text-slate-600">Cargando agentes...</p>
        )}

        {loadError && (
          <p
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            role="alert"
          >
            {loadError}
          </p>
        )}

        {!isLoading && !loadError && agents.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            No hay agentes registrados.
          </p>
        )}

        {!isLoading && !loadError && agents.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {agents.map((agent) => (
              <article
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                key={agent.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      {agent.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">{agent.email}</p>
                  </div>

                  {canUpdateAgent ? (
                    <button
                      onClick={() => {
                        handleToggleAgentStatus(agent);
                      }}
                      className={
                        agent.isActive
                          ? "cursor-pointer rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
                          : "cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                      }
                    >
                      {agent.isActive ? "Activo" : "Inactivo"}
                    </button>
                  ) : (
                    <span
                      className={
                        agent.isActive
                          ? "rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"
                          : "rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600"
                      }
                    >
                      {agent.isActive ? "Activo" : "Inactivo"}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentsPage;
