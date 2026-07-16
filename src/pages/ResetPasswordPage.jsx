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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="token">Token</label>
          <input
            id="token"
            name="token"
            type="text"
            value={formData.token}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="new-password">Nueva contraseña</label>
          <input
            id="new-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Enviando..." : "Cambiar contraseña"}
        </button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
        <Link to="/login">volver al login</Link>
      </div>
    </form>
  );
}

export default ResetPasswordPage;
