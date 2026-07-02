import TicketList from "./components/TicketList";
import TicketSearch from "./components/TicketSearch";
import { useState } from "react";
import TicketStatusFilter from "./components/TicketStatusFilter";

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
    </div>
  );
}

export default App;
