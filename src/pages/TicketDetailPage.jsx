import { Link, useParams } from "react-router-dom";

function TicketDetailPage() {
  const { ticketId } = useParams();
  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Detalle del ticket
        </h1>
      </header>
      <p className="mt-2 text-sm text-slate-600">Ticket #{ticketId}</p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        Esto será el panel informativo
        <p>
          <Link
            className="mt-4 inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 visible:outline-slate-500"
            to="/tickets"
          >
            Regresar a tickets
          </Link>
        </p>
      </div>
    </div>
  );
}

export default TicketDetailPage;
