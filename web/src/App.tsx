import { BrowserRouter } from "react-router-dom";
import { Router } from "./app/Router";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import { storageKeys } from "./app/config/storageKeys";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey={storageKeys.theme}>
      <BrowserRouter
        future={{
          v7_startTransition: false,
          v7_relativeSplatPath: false,
        }}
      >
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
