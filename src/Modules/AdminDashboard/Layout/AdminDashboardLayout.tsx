import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const AdminDashboardLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <div className="bg-gray-200 ">
          <div className="fixed w-full z-50">
            <Navbar />
          </div>
          <div className="p-0 pt-14">
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
