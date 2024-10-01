import App from "@/App";
import NotFoundPage from "@/components/not-found";
import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import { adminDashboardRouter } from "./adminDashboardRouter";
import { userDashboardRouter } from "./userDashboardRouter";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [authRouter, userDashboardRouter, adminDashboardRouter],
  },
]);
