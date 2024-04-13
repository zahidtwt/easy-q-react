import NavBar from "@/components/nav-bar";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <div>
          <div className="container pb-[60px] h-[100dvh] overflow-scroll">
            <Outlet />
          </div>
          <NavBar />
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

export default DashboardLayout;
