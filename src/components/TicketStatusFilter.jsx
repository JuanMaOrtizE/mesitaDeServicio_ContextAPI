function TicketStatusFilter({ statusFilter, onStatusFilterChange }) {
  return (
    <div>
      <label htmlFor="ticketStatus">Estado del ticket: </label>
      <select
        id="ticketStatus"
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
      >
        <option value="all">Todos los estados</option>
        <option value="open">Abierto</option>
        <option value="in-progress">En progreso</option>
        <option value="resolved">Resuelto</option>
      </select>
    </div>
  );
}

export default TicketStatusFilter;
