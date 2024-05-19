// import { DownloadIcon, FilesIcon, HomeIcon, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

// const iconSize = 30;
const navbarMenus = [
  {
    path: "/dashboard/boardList",
    title: "Boards",
    icon: null,
  },
  {
    path: "/dashboard/Classes",
    title: "Classes",
    icon: null,
  },
  {
    path: "/dashboard/Institutes",
    title: "Institutes",
    icon: null,
  },
  {
    path: "/dashboard/Questions",
    title: "Questions",
    icon: null,
  },
] as const;

const Navbar = () => {
  return (
    <nav
      className="w-full h-14 bg-gray-200 dark:bg-gray-700"
      style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" }}>
      <ul className="grid h-full max-w-2xl grid-cols-4 mx-auto font-medium divide-x divide-gray-400">
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

            {/* {menu.icon && <li>{menu.icon}</li>}
            <span className="text-sm sr-only text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              {menu.title}
            </span> */}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
