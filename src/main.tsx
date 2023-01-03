import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./css/index.css";
import AuthProvider from "./contexts/AuthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
