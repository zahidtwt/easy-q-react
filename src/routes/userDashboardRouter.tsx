import Download from "@/Modules/UserDashboard/download/download";
import Home from "@/Modules/UserDashboard/home";
import InitializeQuestionPaper from "@/Modules/UserDashboard/initializeQuestionPaper/InitializeQuestionPaper";
import UserDashboardLayout from "@/Modules/UserDashboard/layout";
import CreateMadrasa from "@/Modules/UserDashboard/madrasa/CreateMadrasa";
import MadrasaDetail from "@/Modules/UserDashboard/madrasa/MadrasaDetail";
import PrepareQuestionPaper from "@/Modules/UserDashboard/prepareQuestionPaper/PrepareQuestionPaper";
import Profile from "@/Modules/UserDashboard/profile/profile";
import Questions from "@/Modules/UserDashboard/questions";
import Subscription from "@/Modules/UserDashboard/subscription/subscription";
import UserSubscriptionList from "@/Modules/UserDashboard/UserSubscriptionList/UserSubscriptionList";
import { Navigate, Route, Routes } from "react-router-dom";

export const userDashboardRouter = {
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
      path: "profile/subscription-list",
      element: <UserSubscriptionList />,
    },
    {
      path: "questions",
      element: <Questions />,
    },
    {
      path: "add-questions",
      // element: <AddQuestion />,
      element: <InitializeQuestionPaper />,
    },
    {
      path: "prepare-questions/:id",
      // element: <AddQuestion />,
      element: <PrepareQuestionPaper />,
    },
    {
      path: "download",
      element: <Download />,
    },
    {
      path: "subscription-package",
      element: <Subscription />,
    },
    // {
    //   path: "education-board",
    //   element: <EducationBoard />,
    // },
  ],
};
