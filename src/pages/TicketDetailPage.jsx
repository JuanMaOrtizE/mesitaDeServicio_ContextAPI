import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTicketById } from "../services/ticketsApi";
import { getCustomers } from "../services/customersApi";
import { getCategories } from "../services/categoriesApi";
import { getAgents } from "../services/agentsApi";
import { createComment, getCommentsByTicketId } from "../services/commentsApi";

function TicketDetailPage() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [agents, setAgents] = useState([]);
  const [comments, setComments] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [commentBody, setCommentBody] = useState("");
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  useEffect(() => {
    async function loadTicket() {
      try {
        setIsLoading(true);
        setLoadError("");
        const [
          ticketsData,
          customersData,
          categoriesData,
          agentsData,
          commentsData,
        ] = await Promise.all([
          getTicketById(ticketId),
          getCustomers(),
          getCategories(),
          getAgents(),
          getCommentsByTicketId(ticketId),
        ]);

        setTicket(ticketsData);
        setCustomers(customersData);
        setCategories(categoriesData);
        setAgents(agentsData);
        setComments(commentsData);
      } catch (error) {
        setLoadError(error.message ?? "Ocurrió un error al cargar el ticket.");
      } finally {
        setIsLoading(false);
      }
    }
    loadTicket();
  }, [ticketId]);

  const customer = ticket
    ? customers.find((customer) => customer.id === ticket.customerId)
    : null;

  const category = ticket
    ? categories.find((category) => category.id === ticket.categoryId)
    : null;

  const agent = ticket
    ? agents.find((agent) => agent.id === ticket.agentId)
    : null;

  const customerName = customer?.name ?? "Cliente no encontrado";
  const categoryName = category?.name ?? "Categoría no encontrada";
  const agentName = agent?.name ?? "Sin asignar";

  async function handleCreateComment(e) {
    e.preventDefault();

    const trimmedBody = commentBody.trim();

    if (!trimmedBody) return;
    try {
      setLoadError("");
      setIsCreatingComment(true);

      const now = new Date().toISOString();

      const newComment = {
        ticketId: ticketId,
        authorId: "1",
        authorName: "Admin Demo",
        body: trimmedBody,
        createdAt: now,
      };

      const createdComment = await createComment(newComment);

      setComments((previousComments) => [...previousComments, createdComment]);
      setCommentBody("");
    } catch (error) {
      setLoadError(error.message ?? "Ocurrió un error al crear el comentario.");
    } finally {
      setIsCreatingComment(false);
    }
  }

  const classNameMetaData = "font-medium text-slate-700";

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Detalle del ticket
        </h1>
      </header>
      <p className="mt-2 text-sm text-slate-600">Ticket #{ticketId}</p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {isLoading && (
          <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            Cargando ticket...
          </p>
        )}

        {loadError && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {loadError}
          </p>
        )}

        {!isLoading && !loadError && ticket && (
          <>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {ticket.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {ticket.description}
                </p>
              </div>

              <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <p>
                  <span className={classNameMetaData}>Cliente:</span>{" "}
                  {customerName}
                </p>
                <p>
                  <span className={classNameMetaData}>Categoría:</span>{" "}
                  {categoryName}
                </p>
                <p>
                  <span className={classNameMetaData}>Agente:</span> {agentName}
                </p>
                <p>
                  <span className={classNameMetaData}>Estado:</span>{" "}
                  {ticket.status}
                </p>
                <p>
                  <span className={classNameMetaData}>Prioridad:</span>{" "}
                  {ticket.priority}
                </p>
                <p>
                  <span className={classNameMetaData}>Creado:</span>{" "}
                  {ticket.createdAt}
                </p>
                <p>
                  <span className={classNameMetaData}>Actualizado:</span>{" "}
                  {ticket.updatedAt}
                </p>
              </div>
            </section>
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Comentarios
              </h3>

              {comments.length === 0 ? (
                <p className="mt-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                  Este ticket aún no tiene comentarios.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {comments.map((comment) => (
                    <article
                      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                      key={comment.id}
                    >
                      <p className="text-sm font-medium text-slate-900">
                        {comment.authorName}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {comment.body}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {comment.createdAt}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <form
              className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4"
              onSubmit={handleCreateComment}
            >
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="comment-body"
              >
                Nuevo comentario
              </label>

              <textarea
                className="mt-2 min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                id="comment-body"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
              />

              <button
                className="mt-3 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-400"
                type="submit"
                disabled={isCreatingComment}
              >
                {isCreatingComment ? "Guardando..." : "Agregar comentario"}
              </button>
            </form>
          </>
        )}
        <p className="mt-6">
          <Link
            className="inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
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
