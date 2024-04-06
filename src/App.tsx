import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Outlet />
      <Toaster
        richColors
        position="top-right"
        visibleToasts={1}
      />
    </ThemeProvider>
  );
}

export default App;
