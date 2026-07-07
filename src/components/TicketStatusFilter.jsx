function TicketStatusFilter({ statusFilter, onStatusFilterChange }) {
  return (
    <div className="flex flex-col">
      <label
        className="text-sm font-medium text-slate-700"
        htmlFor="ticketStatus"
      >
        Estado del ticket
      </label>
      <select
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
