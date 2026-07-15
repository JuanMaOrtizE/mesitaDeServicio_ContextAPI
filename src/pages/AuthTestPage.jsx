import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthTestPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { user, loading, isAuthenticated, login, logout, refreshUser } =
    useAuth();

  async function handleLogin() {
    try {
      setError("");
      const data = await login({
        email: "admin@example.com",
        password: "newPassword123",
      });
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleLogout() {
    try {
      setError("");
      const data = await logout();

      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleCurrentUser() {
    try {
      setError("");
      const data = await refreshUser();

      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>{" "}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCurrentUser}>Current User</button>
      <p>Loading: {String(loading)}</p>
      <p>Authenticated: {String(isAuthenticated)}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {error && <p>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default AuthTestPage;
