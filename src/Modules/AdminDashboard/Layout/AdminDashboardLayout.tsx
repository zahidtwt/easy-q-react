import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const AdminDashboardLayout: React.FC = () => {
  const { isAuthenticated, userData } = useAuth();
  // console.log(userData.role.name);
  const { pathname } = useLocation();

  return (
    <>
      {isAuthenticated && (userData.role.name === "SUPER_ADMIN" || userData.role.name === "ADMIN") ? (
        <div className="bg-gray-200 min-h-[100dvh]">
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
