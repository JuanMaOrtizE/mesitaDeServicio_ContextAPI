import TicketItem from "./TicketItem";

function TicketList({
  agents,
  tickets,
  emptyMessage,
  onTicketStatusChange,
  onTicketAgentChange,
  onEditTicket,
  onDeleteTicket,
  canDeleteTicket,
  canAssignAgent,
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
          agents={agents}
          ticket={ticket}
          onStatusChange={onTicketStatusChange}
          onAgentChange={onTicketAgentChange}
          onEdit={onEditTicket}
          onDelete={onDeleteTicket}
          canDeleteTicket={canDeleteTicket}
          canAssignAgent={canAssignAgent}
        />
      ))}
    </div>
  );
}

export default TicketList;
