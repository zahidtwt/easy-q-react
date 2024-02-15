import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Outlet />;
    </ThemeProvider>
  );
}

export default App;
