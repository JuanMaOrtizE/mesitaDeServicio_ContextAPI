import TicketItem from "./TicketItem";

function TicketList({
  tickets,
  emptyMessage,
  onTicketStatusChange,
  onEditTicket,
  onDeleteTicket,
}) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-2">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          onStatusChange={onTicketStatusChange}
          onEdit={onEditTicket}
          onDelete={onDeleteTicket}
        />
      ))}
    </div>
  );
}

export default TicketList;
