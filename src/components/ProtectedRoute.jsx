import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children, allowedRoles }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <p>Cargando sesión...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/tickets" replace />;
  }

  return children;
}

export default ProtectedRoute;
