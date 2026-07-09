import TicketList from "../components/TicketList";
import TicketSearch from "../components/TicketSearch";
import { useState, useEffect } from "react";
import TicketStatusFilter from "../components/TicketStatusFilter";
import TicketForm from "../components/TicketForm";
import {
  createTicket,
  deleteTicket,
  getTickets,
  updateTicket,
  updateTicketAgent,
  updateTicketStatus,
} from "../services/ticketsApi";
import { getCustomers } from "../services/customersApi";
import { getCategories } from "../services/categoriesApi";
import { getAgents } from "../services/agentsApi";

function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tickets, setTickets] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function loadTickets() {
      try {
        setIsLoading(true);
        setLoadError("");

        const [ticketsData, customersData, categoriesData, agentsData] =
          await Promise.all([
            getTickets(),
            getCustomers(),
            getCategories(),
            getAgents(),
          ]);

        setTickets(ticketsData);
        setCustomers(customersData);
        setCategories(categoriesData);
        setAgents(agentsData);
      } catch (error) {
        setLoadError(error.message ?? "Ocurrió un error al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    }
    loadTickets();
  }, []);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const emptyMessage =
    tickets.length === 0
      ? "No hay tickets registrados."
      : "No hay tickets que coincidan con los criterios seleccionados.";

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(normalizedSearchTerm) ||
      ticket.description.toLowerCase().includes(normalizedSearchTerm),
  );

  const filteredStatusTickets = filteredTickets.filter(
    (ticket) => statusFilter === "all" || ticket.status === statusFilter,
  );

  async function handleTicketStatusChange(ticketId, newStatus) {
    try {
      setLoadError("");
      const updatedTicket = await updateTicketStatus(ticketId, newStatus);
      setTickets((previousTickets) =>
        previousTickets.map((ticket) =>
          ticket.id === ticketId ? updatedTicket : ticket,
        ),
      );
    } catch (error) {
      setLoadError(
        error.message ?? "Ocurrió un error al actualizar el estado.",
      );
    }
  }

  async function handleTicketAgentChange(ticketId, newAgentId) {
    try {
      setLoadError("");
      const updatedAgent = await updateTicketAgent(ticketId, newAgentId);
      setTickets((previousTickets) =>
        previousTickets.map((ticket) =>
          ticket.id === ticketId ? updatedAgent : ticket,
        ),
      );
    } catch (error) {
      setLoadError(
        error.message ?? "Ocurrió un error al actualizar el agente encargado.",
      );
    }
  }

  async function handleCreateTicket(draft) {
    try {
      setLoadError("");
      setIsSubmitting(true);

      const now = new Date().toISOString();

      const newTicket = {
        ...draft,
        status: "open",
        agentId: null,
        createdAt: now,
        updatedAt: now,
      };

      const createdTicket = await createTicket(newTicket);

      setTickets((previousTickets) => [createdTicket, ...previousTickets]);
    } catch (error) {
      setLoadError(error.message ?? "Ocurrió un error al crear el ticket.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const editingTicket =
    tickets.find((ticket) => ticket.id === editingTicketId) ?? null;

  async function handleUpdateTicket(draft) {
    try {
      setLoadError("");
      const updatedAt = new Date().toISOString();

      const updatedTicket = await updateTicket(editingTicketId, {
        ...draft,
        updatedAt,
      });

      setTickets((previousTickets) =>
        previousTickets.map((ticket) =>
          ticket.id === editingTicketId ? updatedTicket : ticket,
        ),
      );
      setEditingTicketId(null);
    } catch (error) {
      setLoadError(
        error.message ?? "Ocurrió un error al actualizar el ticket.",
      );
    }
  }

  function handleStartEdit(ticketId) {
    setEditingTicketId(ticketId);
  }

  function handleCancelEdit() {
    setEditingTicketId(null);
  }

  async function handleDeleteTicket(ticketId) {
    try {
      setLoadError("");
      const ticketToDelete = tickets.find((ticket) => ticket.id === ticketId);
      if (!ticketToDelete) return;

      const respuesta = window.confirm(
        `¿Deseas eliminar el ticket "${ticketToDelete.title}"?`,
      );

      if (!respuesta) return;

      await deleteTicket(ticketId);

      setTickets((previousTickets) =>
        previousTickets.filter((ticket) => ticket.id !== ticketId),
      );

      setEditingTicketId((previousEditingTicketId) =>
        previousEditingTicketId === ticketId ? null : previousEditingTicketId,
      );
    } catch (error) {
      setLoadError(error.message ?? "Ocurrió un error al eliminar el ticket.");
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <section className="mb-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2">
        <TicketSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <TicketStatusFilter
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </section>

      {loadError && (
        <p
          className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {loadError}
        </p>
      )}
      {isLoading && (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
          Cargando tickets...
        </p>
      )}

      {isSubmitting && (
        <p className="mb-4 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
          Creando ticket...
        </p>
      )}

      {!isLoading && !loadError && (
        <TicketList
          agents={agents}
          customers={customers}
          categories={categories}
          tickets={filteredStatusTickets}
          emptyMessage={emptyMessage}
          onTicketStatusChange={handleTicketStatusChange}
          onTicketAgentChange={handleTicketAgentChange}
          onEditTicket={handleStartEdit}
          onDeleteTicket={handleDeleteTicket}
        />
      )}

      {customers.length > 0 && categories.length > 0 && (
        <TicketForm
          customers={customers}
          categories={categories}
          onSubmitTicket={
            editingTicket ? handleUpdateTicket : handleCreateTicket
          }
          onCancelEdit={handleCancelEdit}
          key={editingTicket?.id ?? "new"}
          initialTicket={editingTicket}
        />
      )}
    </div>
  );
}

export default TicketsPage;
