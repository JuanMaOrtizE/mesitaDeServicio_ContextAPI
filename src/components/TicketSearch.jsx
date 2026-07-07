function TicketSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="flex flex-col">
      <label
        className="text-sm font-medium text-slate-700"
        htmlFor="ticket-search"
      >
        Buscar tickets
      </label>
      <input
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        id="ticket-search"
        type="search"
        placeholder="Buscar tickets..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default TicketSearch;
