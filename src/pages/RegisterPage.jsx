import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authApi";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "agent",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setMessage("");
      setError("");
      setSubmitting(true);

      await registerUser(formData);
      setMessage(
        "Usuario registrado correctamente. Ahora puedes iniciar sesión.",
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "agent",
      });
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
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>

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
      </div>

      <div>
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
        <label htmlFor="role">Rol</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? "Registrando..." : "Crear cuenta"}
      </button>
      <Link to="/login">Ya tengo cuenta</Link>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  );
}
export default RegisterPage;
