import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="bg-red-500">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
