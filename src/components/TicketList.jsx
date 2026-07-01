import TicketItem from "./TicketItem";

function TicketList({ tickets, emptyMessage }) {
  if (tickets.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return tickets.map((ticket) => (
    <TicketItem key={ticket.id} ticket={ticket} />
  ));
}

export default TicketList;
