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
      className="fixed bottom-0 left-0 right-0  bg-gray-200"
      style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" }}>
      <ul className="grid grid-cols-4 justify-items-center divide-x divide-gray-400">
        {navbarMenus.map((menu) => (
          <NavLink
            to={menu.path}
            key={menu.title}
            className="px-[1.67rem] py-2 cursor-pointer hover:text-gray-800">
            <li>{menu.icon}</li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
