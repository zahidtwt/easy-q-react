// import { DownloadIcon, FilesIcon, HomeIcon, UserCircle } from "lucide-react";
import useLogout from "@/Modules/Auth/hooks/useLogout";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

// const iconSize = 30;
const navbarMenus = [
  {
    path: "/dashboard/boardList",
    title: "Boards",
    icon: null,
  },
  {
    path: "/dashboard/classes",
    title: "Classes",
    icon: null,
  },
  {
    path: "/dashboard/institutes",
    title: "Institutes",
    icon: null,
  },
  {
    path: "/dashboard/questions",
    title: "Questions",
    icon: null,
  },
  {
    path: "/dashboard/users",
    title: "Users",
    icon: null,
  },
] as const;

const Navbar = () => {
  const { logout } = useLogout();
  return (
    <nav
      className="w-full h-14 bg-gray-200 dark:bg-gray-700 flex justify-between items-center"
      style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" }}>
      <ul className="grid h-full max-w-2xl grid-cols-6 font-medium">
        {navbarMenus.map((menu) => (
          <NavLink
            to={menu.path}
            key={menu.title}
            className={({ isActive }) =>
              isActive
                ? "active bg-emerald-400 shadow-inner hover:bg-emerald-600 dark:hover:bg-gray-800 group dark:border-gray-600 text-white  inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x "
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            }>
            {menu.title}
          </NavLink>
        ))}
      </ul>

      {/* <button className="">logout</button> */}

      <Button
        onClick={() => logout()}
        variant="outline"
        className="mr-4 cursor-pointer bg-red-700 hover:bg-red-500 text-white hover:text-white hover:shadow-lg">
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
