import { useState } from "react";
import { Link } from "react-router-dom";

function TicketItem({ ticket, onStatusChange, onEdit, onDelete }) {
  const selectId = `ticket-status-${ticket.id}`;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const isLongDescription = ticket.description.length > 160;
  const descriptionClass = `mt-3 min-w-0 wrap-break-word text-sm text-slate-600 ${
    isLongDescription && !isDescriptionExpanded ? "line-clamp-3" : ""
  }`;

  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="min-w-0 wrap-break-word text-base font-semibold text-slate-900">
          {ticket.title}
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <p
            className="inline-flex rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium
  capitalize text-slate-700"
          >
            {ticket.priority}
          </p>
          <Link
            className="text-sm font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            to={`/tickets/${ticket.id}`}
          >
            Ver detalle
          </Link>
        </div>
      </div>
      <p className={descriptionClass}>{ticket.description}</p>
      {isLongDescription && (
        <button
          className="mt-2 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          type="button"
          onClick={() =>
            setIsDescriptionExpanded(
              (previousIsDescriptionExpanded) => !previousIsDescriptionExpanded,
            )
          }
        >
          {isDescriptionExpanded ? "Ver menos" : "Ver más"}
        </button>
      )}
      <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor={selectId}
          >
            Estado del ticket
          </label>
          <select
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            id={selectId}
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.id, e.target.value)}
          >
            <option value="open">Abierto</option>
            <option value="in-progress">En progreso</option>
            <option value="resolved">Resuelto</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 cursor-pointer"
          onClick={() => onEdit(ticket.id)}
          type="button"
          aria-label={`Editar ticket: ${ticket.title}`}
        >
          Editar ticket
        </button>
        <button
          className="rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 cursor-pointer"
          onClick={() => onDelete(ticket.id)}
          type="button"
          aria-label={`Eliminar ticket: ${ticket.title}`}
        >
          Eliminar ticket
        </button>
      </div>
    </div>
  );
}

export default TicketItem;
