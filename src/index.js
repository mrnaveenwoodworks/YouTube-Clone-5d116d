import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Import Tailwind CSS base styles and custom styles
import { AppProvider } from "./context/AppContext"; // Import AppProvider

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);