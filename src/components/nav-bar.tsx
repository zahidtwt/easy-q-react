import { DownloadIcon, FilesIcon, HomeIcon, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const navbarMenus = [
  {
    path: "/dashboard/home",
    title: "Home",
    icon: <HomeIcon size={40} />,
  },
  {
    path: "/dashboard/profile",
    title: "Profile",
    icon: <UserCircle size={40} />,
  },
  {
    path: "/dashboard/download",
    title: "Download",
    icon: <DownloadIcon size={40} />,
  },
  {
    path: "/dashboard/questions",
    title: "Questions",
    icon: <FilesIcon size={40} />,
  },
] as const;

const NavBar = () => {
  return (
    <nav
      className="fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-200 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
      style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" }}>
      <ul className="grid h-full max-w-2xl grid-cols-4 mx-auto font-medium divide-x divide-gray-400">
        {navbarMenus.map((menu) => (
          <NavLink
            to={menu.path}
            key={menu.title}
            className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
            <li>{menu.icon}</li>
            <span className="text-sm sr-only text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              {menu.title}
            </span>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
