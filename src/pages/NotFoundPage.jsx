import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Página no encontrada</h1>
      <p>La ruta a la que intentas acceder no existe.</p>

      <Link to="/tickets">Regresar a tickets</Link>
    </div>
  );
}

export default NotFoundPage;
