import NavBar from "@/components/nav-bar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="">
      <Outlet />
      <NavBar />
    </div>
  );
};

export default DashboardLayout;
