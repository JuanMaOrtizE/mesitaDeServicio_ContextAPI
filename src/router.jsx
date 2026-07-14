import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TicketsPage from "./pages/TicketsPage";
import NotFoundPage from "./pages/NotFoundPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import CustomersPage from "./pages/CustomersPage";
import AgentsPage from "./pages/AgentsPage";
import AuthTestPage from "./pages/AuthTestPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to="tickets" /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "tickets", element: <TicketsPage /> },
      { path: "tickets/:ticketId", element: <TicketDetailPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "agents", element: <AgentsPage /> },
      { path: "auth-test", element: <AuthTestPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
