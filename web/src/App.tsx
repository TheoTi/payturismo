import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { Router } from "./app/Router";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import { storageKeys } from "./app/config/storageKeys";
import { AuthProvider } from "./app/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey={storageKeys.theme}>
        <BrowserRouter
          future={{
            v7_startTransition: false,
            v7_relativeSplatPath: false,
          }}
        >
          <Router />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
