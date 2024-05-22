import App from "@/App";
import AdminDashboardLayout from "@/Modules/AdminDashboard/Layout/AdminDashboardLayout";
import BoardList from "@/Modules/AdminDashboard/Pages/BoardList/BoardList";
import ClassList from "@/Modules/AdminDashboard/Pages/ClassList/ClassList";
import NotFoundPage from "@/components/not-found";
import AuthLayout from "@/pages/auth/layout";
import LoginPage from "@/pages/auth/login";
import SignUpPage from "@/pages/auth/sign-up";
import Download from "@/pages/dashboard/download";
import EducationBoard from "@/pages/dashboard/educationBoard/EducationBoard";
import Home from "@/pages/dashboard/home";
import DashboardLayout from "@/pages/dashboard/layout";
import CreateMadrasa from "@/pages/dashboard/madrasa/CreateMadrasa";
import MadrasaDetail from "@/pages/dashboard/madrasa/MadrasaDetail";
import Profile from "@/pages/dashboard/profile";
import Questions from "@/pages/dashboard/questions";
import { Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
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
      },
      {
        element: <DashboardLayout />,

        children: [
          {
            path: "",
            element: (
              <Routes>
                <Route
                  path="*"
                  element={<Navigate to="/home" />}
                />
              </Routes>
            ),
          },
          {
            path: "home",
            element: <Home />,
            index: true,
          },
          {
            path: "madrasa/:id",
            element: <MadrasaDetail />,
            index: true,
          },
          {
            path: "add-madrasa",
            element: <CreateMadrasa />,
            index: true,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "questions",
            element: <Questions />,
          },
          {
            path: "download",
            element: <Download />,
          },
          {
            path: "education-board",
            element: <EducationBoard />,
          },
        ],
      },
      {
        path: "/dashboard", // admin dashboard
        element: <AdminDashboardLayout />,

        children: [
          {
            path: "",
            element: (
              <Routes>
                <Route
                  path="*"
                  element={<Navigate to="/dashboard/boardList" />}
                />
              </Routes>
            ),
          },
          {
            path: "boardList",
            element: <BoardList />,
            index: true,
          },
          {
            path: "classes",
            element: <ClassList />,
            index: true,
          },
        ],
      },
    ],
  },
]);
