import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TicketsPage from "./pages/TicketsPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to="tickets" /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "tickets", element: <TicketsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
