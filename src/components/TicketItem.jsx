function TicketItem({ ticket, onStatusChange }) {
  const selectId = `ticket-status-${ticket.id}`;
  return (
    <div>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <label htmlFor={selectId}>Estado del ticket: </label>
      <select
        id={selectId}
        value={ticket.status}
        onChange={(e) => onStatusChange(ticket.id, e.target.value)}
      >
        <option value="open">Abierto</option>
        <option value="in-progress">En progreso</option>
        <option value="resolved">Resuelto</option>
      </select>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
}

export default TicketItem;
