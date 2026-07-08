import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Página no encontrada
        </h1>
      </header>
      <p className="mt-2 text-sm text-slate-600">
        La ruta a la que intentas acceder no existe
      </p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        Esto será el panel informativo
        <p>
          <Link
            className="mt-4 inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            to="/tickets"
          >
            Regresar a tickets
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
