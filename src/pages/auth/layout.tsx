import Logo from "@/components/logo";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <Navigate
          to={"/dashboard/home"}
          replace
        />
      ) : (
        <main className="flex flex-col justify-center items-center h-[100dvh] space-y-12">
          <Logo label />
          <Outlet />
        </main>
      )}
    </>
  );
};

export default AuthLayout;
