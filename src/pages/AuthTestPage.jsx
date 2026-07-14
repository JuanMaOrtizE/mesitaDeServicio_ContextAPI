import { useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/authApi";

function AuthTestPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setError("");
      const data = await loginUser({
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
      const data = await logoutUser();

      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleCurrentUser() {
    try {
      setError("");
      const data = await getCurrentUser();

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
      {error && <p>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default AuthTestPage;
