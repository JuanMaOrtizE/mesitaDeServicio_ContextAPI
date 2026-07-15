import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

function App() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Mesa de servicio
          </h1>
          <nav aria-label="Navegación principal">
            <ul className="flex flex-wrap gap-2">
              <li>
                <NavLink className={navLinkClass} to="/dashboard">
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink className={navLinkClass} to="/tickets">
                  Tickets
                </NavLink>
              </li>

              <li>
                <NavLink className={navLinkClass} to="/customers">
                  Clientes
                </NavLink>
              </li>

              <li>
                <NavLink className={navLinkClass} to="/agents">
                  Agentes
                </NavLink>
              </li>
            </ul>
          </nav>
          {loading ? (
            <span>Cargando sesión...</span>
          ) : isAuthenticated ? (
            <>
              <span>{user.name || user.email}</span>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <NavLink to="/login">Iniciar sesión</NavLink>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
