function TicketItem({ ticket, onStatusChange, onEdit, onDelete }) {
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
      <button
        onClick={() => onEdit(ticket.id)}
        type="button"
        aria-label={`Editar ticket: ${ticket.title}`}
      >
        Editar ticket
      </button>
      <button
        onClick={() => onDelete(ticket.id)}
        type="button"
        aria-label={`Eliminar ticket: ${ticket.title}`}
      >
        Eliminar ticket
      </button>
    </div>
  );
}

export default TicketItem;
