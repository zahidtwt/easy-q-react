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
import Download from "@/Modules/UserDashboard/download";
// import EducationBoard from "@/Modules/dashboard/educationBoard/EducationBoard";
import Home from "@/Modules/UserDashboard/home";
import UserDashboardLayout from "@/Modules/UserDashboard/layout";
import CreateMadrasa from "@/Modules/UserDashboard/madrasa/CreateMadrasa";
import MadrasaDetail from "@/Modules/UserDashboard/madrasa/MadrasaDetail";
import Questions from "@/Modules/UserDashboard/questions";
import { Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";
import ClassDetail from "@/Modules/AdminDashboard/Pages/ClassDetail/ClassDetail";
import AddQuestion from "@/Modules/UserDashboard/AddQuestion/AddQuestion";
import Profile from "@/Modules/UserDashboard/profile/profile";
import QuestionPatterns from "@/Modules/AdminDashboard/Pages/QuestionPatterns/QuestionPatterns";
import Subjects from "@/Modules/AdminDashboard/Pages/Subjects/Subjects";
import SubjectDetail from "@/Modules/AdminDashboard/Pages/Subjects/SubjectDetail";

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
        element: <UserDashboardLayout />,

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
            path: "add-questions",
            element: <AddQuestion />,
          },
          {
            path: "download",
            element: <Download />,
          },
          // {
          //   path: "education-board",
          //   element: <EducationBoard />,
          // },
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
            path: "question-patterns",
            element: <QuestionPatterns />,
            index: true,
          },
          {
            path: "classes",
            element: <ClassList />,
            index: true,
          },
          {
            path: "subjects",
            element: <Subjects />,
            index: true,
          },
          {
            path: "subjects-detail/:subjectId",
            element: <SubjectDetail />,
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
