import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex justify-center items-center h-[100dvh]">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
