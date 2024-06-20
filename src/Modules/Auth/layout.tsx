import Logo from "@/components/logo";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <Navigate
          to={"/home"}
          replace
        />
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-[600px] h-[100dvh] relative">
            <main className="flex flex-col justify-center items-center h-[100dvh] space-y-12">
              <Logo label />
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
