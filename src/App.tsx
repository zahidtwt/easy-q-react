import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

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
