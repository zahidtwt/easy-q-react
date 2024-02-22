import NavBar from "@/components/nav-bar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <div className="container pb-[60px]">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
};

export default DashboardLayout;
