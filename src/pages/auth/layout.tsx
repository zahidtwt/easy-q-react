import Logo from "@/components/logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex flex-col justify-center items-center h-[100dvh] space-y-12">
      <Logo label />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
