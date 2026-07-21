import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/authApi";

function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    token: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setSubmitting(true);

      const data = await resetPassword(formData);

      setMessage(data.message);
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
          Restablecer contraseña
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Pega el token de recuperación y define una nueva contraseña.
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="token"
              >
                Token
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                id="token"
                name="token"
                type="text"
                value={formData.token}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="new-password"
              >
                Nueva contraseña
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                id="new-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full cursor-pointer rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Cambiar contraseña"}
            </button>

            {message && (
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {message}
              </p>
            )}

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <Link
              className="inline-block text-sm font-medium text-slate-700 hover:text-slate-900"
              to="/login"
            >
              Volver al login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
