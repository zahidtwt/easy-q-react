import ForgetPassword from "@/Modules/Auth/forget-password/ForgetPassword";
import AuthLayout from "@/Modules/Auth/layout";
import LoginPage from "@/Modules/Auth/login";
import SignUpPage from "@/Modules/Auth/sign-up";
import { Navigate, Route, Routes } from "react-router-dom";

export const authRouter = {
  element: <AuthLayout />,
  children: [
    {
      path: "",
      element: (
        <Routes>
          <Route
            path="*"
            element={<Navigate to="/auth/login" />}
          />
        </Routes>
      ),
    },
    {
      path: "auth/login",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "auth/signup",
      element: <SignUpPage />,
    },
    {
      path: "auth/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "auth",
      element: (
        <Routes>
          <Route
            path="*"
            element={<Navigate to="/auth/login" />}
          />
        </Routes>
      ),
    },
  ],
};
