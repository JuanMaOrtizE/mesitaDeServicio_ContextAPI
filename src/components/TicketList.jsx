import TicketItem from "./TicketItem";

function TicketList({
  tickets,
  emptyMessage,
  onTicketStatusChange,
  onEditTicket,
  onDeleteTicket,
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
      onDelete={onDeleteTicket}
    />
  ));
}

export default TicketList;
