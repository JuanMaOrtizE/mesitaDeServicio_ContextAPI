import TicketItem from "./TicketItem";

function TicketList({ tickets }) {
  if (tickets.length === 0) {
    return <p>No hay tickets registrados.</p>;
  }

  return tickets.map((ticket) => (
    <TicketItem key={ticket.id} ticket={ticket} />
  ));
}

export default TicketList;
