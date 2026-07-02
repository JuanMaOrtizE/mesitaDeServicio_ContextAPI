import TicketList from "./components/TicketList";
import TicketSearch from "./components/TicketSearch";
import { useState } from "react";
import TicketStatusFilter from "./components/TicketStatusFilter";
import TicketForm from "./components/TicketForm";

const initialTickets = [
  {
    id: 1,
    title: "No puedo iniciar sesión",
    description: "El cliente recibe un error al ingresar.",
    status: "open",
    priority: "high",
    customerId: 1,
    agentId: null,
    categoryId: 1,
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
  {
    id: 2,
    title: "Error en la página de pagos",
    description: "El cliente no puede completar el pago.",
    status: "in-progress",
    priority: "medium",
    customerId: 2,
    agentId: 1,
    categoryId: 2,
    createdAt: "2026-06-29",
    updatedAt: "2026-06-30",
  },
  {
    id: 3,
    title: "Problema con la entrega",
    description: "El cliente no ha recibido su pedido.",
    status: "resolved",
    priority: "low",
    customerId: 3,
    agentId: 2,
    categoryId: 3,
    createdAt: "2026-06-28",
    updatedAt: "2026-06-29",
  },
];

const emptyMessage =
  initialTickets.length === 0
    ? "No hay tickets registrados."
    : "No hay tickets que coincidan con los criterios seleccionados.";

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

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tickets, setTickets] = useState(initialTickets);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

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

  return (
    <div>
      <TicketSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TicketStatusFilter
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <TicketList
        tickets={filteredStatusTickets}
        emptyMessage={emptyMessage}
        onTicketStatusChange={handleTicketStatusChange}
      />
      <TicketForm
        customers={customers}
        categories={categories}
        onCreateTicket={handleCreateTicket}
      />
    </div>
  );
}

export default App;
