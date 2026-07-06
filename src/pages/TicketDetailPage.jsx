import { Link, useParams } from "react-router-dom";

function TicketDetailPage() {
  const { ticketId } = useParams();
  return (
    <div>
      <h1>Detalle del ticket</h1>
      <p>Ticket #{ticketId}</p>
      <p>Los datos del ticket se cargarán posteriormente</p>
      <Link to="/tickets">Regresar a tickets</Link>
    </div>
  );
}

export default TicketDetailPage;
