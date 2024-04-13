import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex justify-center">
        <div className="w-full max-w-[600px] h-[100dvh] relative">
          <Outlet />
        </div>
      </div>
      <Toaster
        richColors
        position="top-right"
        visibleToasts={1}
      />
    </ThemeProvider>
  );
}

export default App;
