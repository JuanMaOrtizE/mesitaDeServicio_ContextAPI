import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authApi";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setMessage("");
      setError("");
      setResetToken("");
      setSubmitting(true);

      const data = await forgotPassword(email);
      setMessage(data.message);

      if (data.resetToken) {
        setResetToken(data.resetToken);
      }
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
          Recuperar contraseña
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Ingresa tu email para generar un token de restablecimiento en entorno
          local.
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
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <button
              className="w-full cursor-pointer rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Enviar instrucciones"}
            </button>

            {message && (
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {message}
              </p>
            )}

            {resetToken && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  El token generado se usa sólo para desarrollo local. Es
                  indispensable pegarlo en la página de restablecimiento de
                  contraseña:
                </p>
                <pre className="mt-3 overflow-x-auto rounded-md bg-white p-3 text-xs text-slate-700">
                  {resetToken}
                </pre>
                <Link
                  className="mt-3 inline-block text-sm font-medium text-slate-700 hover:text-slate-900"
                  to="/reset-password"
                >
                  Ir a restablecer contraseña
                </Link>
              </div>
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

export default ForgotPasswordPage;
