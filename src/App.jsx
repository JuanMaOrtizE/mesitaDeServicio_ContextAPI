import TicketList from "./components/TicketList";

const tickets = [
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

function App() {
  return (
    <div>
      <TicketList tickets={tickets} />
    </div>
  );
}

export default App;
