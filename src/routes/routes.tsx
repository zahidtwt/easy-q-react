import App from "@/App";
import AdminDashboardLayout from "@/Modules/AdminDashboard/Layout/AdminDashboardLayout";
import BoardList from "@/Modules/AdminDashboard/Pages/BoardList/BoardList";
import ClassList from "@/Modules/AdminDashboard/Pages/ClassList/ClassList";
import InstitutionList from "@/Modules/AdminDashboard/Pages/InstitutionList/InstitutionList";
import QuestionsList from "@/Modules/AdminDashboard/Pages/QuestionsList/QuestionsList";
import UserList from "@/Modules/AdminDashboard/Pages/UserList/UserList";
import NotFoundPage from "@/components/not-found";
import AuthLayout from "@/Modules/Auth/layout";
import LoginPage from "@/Modules/Auth/login";
import SignUpPage from "@/Modules/Auth/sign-up";
import Download from "@/Modules/dashboard/download";
import EducationBoard from "@/Modules/dashboard/educationBoard/EducationBoard";
import Home from "@/Modules/dashboard/home";
import DashboardLayout from "@/Modules/dashboard/layout";
import CreateMadrasa from "@/Modules/dashboard/madrasa/CreateMadrasa";
import MadrasaDetail from "@/Modules/dashboard/madrasa/MadrasaDetail";
import Profile from "@/Modules/dashboard/profile";
import Questions from "@/Modules/dashboard/questions";
import { Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";
import ClassDetail from "@/Modules/AdminDashboard/Pages/ClassDetail/ClassDetail";

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
          {
            path: "class-details/:id",
            element: <ClassDetail />,
          },
          {
            path: "institutes",
            element: <InstitutionList />,
            index: true,
          },
          {
            path: "questions",
            element: <QuestionsList />,
            index: true,
          },
          {
            path: "users",
            element: <UserList />,
            index: true,
          },
        ],
      },
    ],
  },
]);
