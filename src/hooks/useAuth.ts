import getUserDataFromLocalStorage from "@/utils/getUserDataFromLocalStorage";
import Cookies from "js-cookie";

export const useAuth = () => {
  // Check if the 'token' exists. Return true if it exists, false otherwise.
  const isAuthenticated = !!Cookies.get("token");
  if (isAuthenticated) {
    const userData = getUserDataFromLocalStorage();
    return { isAuthenticated, userData };
  }
  return { isAuthenticated };
};
