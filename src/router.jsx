import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TicketsPage from "./pages/TicketsPage";
import NotFoundPage from "./pages/NotFoundPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import CustomersPage from "./pages/CustomersPage";
import AgentsPage from "./pages/AgentsPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegisterPage from "./pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to="tickets" /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "tickets",
        element: (
          <ProtectedRoute>
            <TicketsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "tickets/:ticketId",
        element: (
          <ProtectedRoute>
            <TicketDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "customers",
        element: (
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "agents",
        element: (
          <ProtectedRoute>
            <AgentsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "register",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
