const getUserDataFromLocalStorage = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export default getUserDataFromLocalStorage;
