import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const AdminDashboardLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Navbar />
          <div className="container p-0 h-[100dvh] overflow-y-auto bg-gradient-to-t from-indigo-200 via-purple-200 to-pink-200">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate
          to={"/auth/login"}
          state={{ path: pathname }}
        />
      )}
    </>
  );
};

export default AdminDashboardLayout;
