import { useEffect, useState } from "react";
import { getCustomers } from "../services/customersApi";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      try {
        setIsLoading(true);
        setLoadError("");

        const customersData = await getCustomers();

        setCustomers(customersData);
      } catch (error) {
        setLoadError(error.message ?? "Ocurrió un error al cargar clientes.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCustomers();
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Clientes
        </h1>
      </header>
      <p className="mt-2 text-sm text-slate-600">
        Clientes registrados para asociar tickets e incidencias.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {isLoading && (
          <p className="text-sm text-slate-600">Cargando clientes...</p>
        )}

        {loadError && (
          <p
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            role="alert"
          >
            {loadError}
          </p>
        )}

        {!isLoading && !loadError && customers.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            No hay clientes registrados.
          </p>
        )}

        {!isLoading && !loadError && customers.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {customers.map((customer) => (
              <article
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                key={customer.id}
              >
                <h2 className="text-base font-semibold text-slate-900">
                  {customer.name}
                </h2>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-medium text-slate-700">Email:</span>{" "}
                    {customer.email}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Empresa:</span>{" "}
                    {customer.company || "Sin empresa"}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">
                      Teléfono:
                    </span>{" "}
                    {customer.phone || "Sin teléfono"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomersPage;
