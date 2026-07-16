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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>

      <div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar instrucciones"}
        </button>
        {message && <p>{message}</p>}
        {resetToken && <pre>{resetToken}</pre>}
        {error && <p>{error}</p>}
        <Link to="/login">volver al login</Link>
      </div>
    </form>
  );
}

export default ForgotPasswordPage;
