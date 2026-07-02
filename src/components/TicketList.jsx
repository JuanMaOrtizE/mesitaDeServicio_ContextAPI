import TicketItem from "./TicketItem";

function TicketList({
  tickets,
  emptyMessage,
  onTicketStatusChange,
  onEditTicket,
}) {
  if (tickets.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return tickets.map((ticket) => (
    <TicketItem
      key={ticket.id}
      ticket={ticket}
      onStatusChange={onTicketStatusChange}
      onEdit={onEditTicket}
    />
  ));
}

export default TicketList;
