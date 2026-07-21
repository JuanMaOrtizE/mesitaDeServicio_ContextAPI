import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      setSubmitting(true);

      await login(formData);

      navigate("/tickets");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Ingresa con tu cuenta para acceder a la mesa de servicio.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className="w-full cursor-pointer rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </div>

            <div>
              {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}
              <Link
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
                to="/forgot-password"
              >
                Olvidé mi contraseña
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
