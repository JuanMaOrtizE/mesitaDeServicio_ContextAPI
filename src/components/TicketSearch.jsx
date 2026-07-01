function TicketSearch({ searchTerm, onSearchChange }) {
  return (
    <div>
      <label htmlFor="ticket-search">Buscar tickets:</label>
      <input
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
