import NavBar from "@/components/nav-bar";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <div>
          <div className="container pb-[60px]">
            <Outlet />
          </div>
          <NavBar />
        </div>
      ) : (
        <Navigate
          to={"/auth/login"}
          replace
        />
      )}
    </>
  );
};

export default DashboardLayout;
