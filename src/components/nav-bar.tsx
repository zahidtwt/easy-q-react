import { DownloadIcon, FilesIcon, HomeIcon, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
      className="fixed bottom-0 left-0 right-0  bg-gray-200 "
      style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" }}>
      <ul className="flex justify-around py-1">
        {navbarMenus.map((menu) => (
          <li
            key={menu.title}
            className="p-1">
            <Link to={menu.path}>{menu.icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
