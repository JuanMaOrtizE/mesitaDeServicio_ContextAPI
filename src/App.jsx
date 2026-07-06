import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1> Mesa de servicio</h1>
      </header>

      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/tickets">Tickets</NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
