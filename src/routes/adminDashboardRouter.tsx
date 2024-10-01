import AdminDashboardLayout from "@/Modules/AdminDashboard/Layout/AdminDashboardLayout";
import BoardList from "@/Modules/AdminDashboard/Pages/BoardList/BoardList";
import ClassDetail from "@/Modules/AdminDashboard/Pages/ClassDetail/ClassDetail";
import ClassList from "@/Modules/AdminDashboard/Pages/ClassList/ClassList";
import InstitutionList from "@/Modules/AdminDashboard/Pages/InstitutionList/InstitutionList";
import QuestionPatterns from "@/Modules/AdminDashboard/Pages/QuestionPatterns/QuestionPatterns";
import SubjectDetail from "@/Modules/AdminDashboard/Pages/Subjects/SubjectDetail";
import Subjects from "@/Modules/AdminDashboard/Pages/Subjects/Subjects";
import UserList from "@/Modules/AdminDashboard/Pages/UserList/UserList";
import { Navigate, Route, Routes } from "react-router-dom";

export const adminDashboardRouter = {
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
      path: ":boardId/classes",
      element: <ClassList />,
      index: true,
    },
    {
      path: "subjects",
      element: <Subjects />,
      index: true,
    },
    {
      path: "subjects-detail/:subjectId/:subjectName",
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
      path: "users",
      element: <UserList />,
      index: true,
    },
  ],
};
