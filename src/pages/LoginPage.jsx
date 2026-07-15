import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Ingresando..." : "Iniciar sesión"}
        </button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
}

export default LoginPage;
