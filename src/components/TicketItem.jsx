function TicketItem({ ticket }) {
  return (
    <div>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
}

export default TicketItem;
