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

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Detalle del ticket
        </h1>
      </header>
      <p className="mt-2 text-sm text-slate-600">Ticket #{ticketId}</p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {isLoading && <p>Cargando ticket...</p>}

        {loadError && <p role="alert">{loadError}</p>}

        {!isLoading && !loadError && ticket && (
          <>
            <h2>{ticket.title}</h2>
            <p>{ticket.description}</p>
            <p>Cliente: {customerName}</p>
            <p>Categoría: {categoryName}</p>
            <p>Agente: {agentName}</p>
            <p>Estado: {ticket.status}</p>
            <p>Prioridad: {ticket.priority}</p>
            <p>Creado: {ticket.createdAt}</p>
            <p>Actualizado: {ticket.updatedAt}</p>
            <section>
              <h3>Comentarios</h3>

              {comments.length === 0 ? (
                <p>Este ticket aún no tiene comentarios.</p>
              ) : (
                <div>
                  {comments.map((comment) => (
                    <article key={comment.id}>
                      <p>{comment.authorName}</p>
                      <p>{comment.body}</p>
                      <p>{comment.createdAt}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <form onSubmit={handleCreateComment}>
              <label htmlFor="comment-body">Nuevo comentario</label>

              <textarea
                id="comment-body"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
              />

              <button type="submit" disabled={isCreatingComment}>
                {isCreatingComment ? "Guardando..." : "Agregar comentario"}
              </button>
            </form>
          </>
        )}
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
