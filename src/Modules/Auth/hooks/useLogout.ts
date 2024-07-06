import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("userData");
    navigate("/auth/login", { replace: true });
  };
  return { logout };
};

export default useLogout;
