import TicketList from "../components/TicketList";
import TicketSearch from "../components/TicketSearch";
import { useState, useEffect } from "react";
import TicketStatusFilter from "../components/TicketStatusFilter";
import TicketForm from "../components/TicketForm";
import { getTickets } from "../services/ticketsApi";

const categories = [
  { id: 1, name: "Acceso" },
  { id: 2, name: "Pagos" },
  { id: 3, name: "Entregas" },
];

const customers = [
  { id: 1, name: "Laura Gómez" },
  { id: 2, name: "Carlos Pérez" },
  { id: 3, name: "Ana Torres" },
];

function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tickets, setTickets] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadTickets() {
      try {
        setIsLoading(true);
        setLoadError("");
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        setLoadError(
          error.message ?? "Ocurrió un error al cargar los tickets.",
        );
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

  function handleTicketStatusChange(ticketId, newStatus) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket,
      ),
    );
  }

  function handleCreateTicket(draft) {
    const now = new Date().toISOString();

    const newTicket = {
      ...draft,
      id: Date.now(),
      status: "open",
      agentId: null,
      createdAt: now,
      updatedAt: now,
    };

    setTickets((previousTickets) => [newTicket, ...previousTickets]);
  }

  const editingTicket =
    tickets.find((ticket) => ticket.id === editingTicketId) ?? null;

  function handleUpdateTicket(draft) {
    const updatedAt = new Date().toISOString();

    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === editingTicketId
          ? { ...ticket, ...draft, updatedAt }
          : ticket,
      ),
    );
    setEditingTicketId(null);
  }

  function handleStartEdit(ticketId) {
    setEditingTicketId(ticketId);
  }

  function handleCancelEdit() {
    setEditingTicketId(null);
  }

  function handleDeleteTicket(ticketId) {
    const ticketToDelete = tickets.find((ticket) => ticket.id === ticketId);
    if (!ticketToDelete) return;

    const respuesta = window.confirm(
      `¿Deseas eliminar el ticket "${ticketToDelete.title}"?`,
    );

    if (!respuesta) return;

    setTickets((previousTickets) =>
      previousTickets.filter((ticket) => ticket.id !== ticketId),
    );

    setEditingTicketId((previousEditingTicketId) =>
      previousEditingTicketId === ticketId ? null : previousEditingTicketId,
    );
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

      {!isLoading && !loadError && (
        <TicketList
          tickets={filteredStatusTickets}
          emptyMessage={emptyMessage}
          onTicketStatusChange={handleTicketStatusChange}
          onEditTicket={handleStartEdit}
          onDeleteTicket={handleDeleteTicket}
        />
      )}

      <TicketForm
        customers={customers}
        categories={categories}
        onSubmitTicket={editingTicket ? handleUpdateTicket : handleCreateTicket}
        onCancelEdit={handleCancelEdit}
        key={editingTicket?.id ?? "new"}
        initialTicket={editingTicket}
      />
    </div>
  );
}

export default TicketsPage;
