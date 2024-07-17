import NavBar from "@/components/nav-bar";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UserDashboardLayout = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <div className="flex justify-center">
          <div className="w-full max-w-[600px] h-[100dvh] relative">
            <div>
              <div className="container p-0 pb-[60px] h-[100dvh] overflow-y-auto bg-gradient-to-t from-indigo-200 via-purple-200 to-pink-200">
                <Outlet />
              </div>
              <NavBar />
            </div>
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

export default UserDashboardLayout;
