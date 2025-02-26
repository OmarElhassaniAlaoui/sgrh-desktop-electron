import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; 
import '../types/electron'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);