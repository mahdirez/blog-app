import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { ThemeProvider } from "react-bootstrap";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider dir="rtl">
      <App />
    </ThemeProvider>
  </StrictMode>
);
