import AuthLayout from "@/pages/auth/layout";
import LoginPage from "@/pages/auth/login/login";
import SignUpPage from "@/pages/auth/sign-up/sign-up";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
]);
