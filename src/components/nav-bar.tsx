import { DownloadIcon, FilesIcon, HomeIcon, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const iconSize = 30;
const navbarMenus = [
  {
    path: "/home",
    title: "Home",
    icon: <HomeIcon size={iconSize} />,
  },
  {
    path: "/profile",
    title: "Profile",
    icon: <UserCircle size={iconSize} />,
  },
  {
    path: "/download",
    title: "Download",
    icon: <DownloadIcon size={iconSize} />,
  },
  {
    path: "/questions",
    title: "Questions",
    icon: <FilesIcon size={iconSize} />,
  },
] as const;

const NavBar = () => {
  return (
    <nav
      className="absolute bottom-0 left-0 z-50 w-full h-14 bg-gray-200 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
      style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" }}>
      <ul className="grid h-full max-w-2xl grid-cols-4 mx-auto font-medium divide-x divide-gray-400">
        {navbarMenus.map((menu) => (
          <NavLink
            to={menu.path}
            key={menu.title}
            className={({ isActive }) =>
              isActive
                ? "active bg-emerald-400 mt-[-6px] shadow-inner hover:bg-emerald-600 dark:hover:bg-gray-800 group dark:border-gray-600 rounded-t-lg text-white  inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x "
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            }
            // className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
          >
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
