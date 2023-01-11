import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./css/index.css";
import AuthProvider from "./contexts/AuthProvider";
import SocketProvider from "./contexts/SocketProvider";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <Provider>
    <App />
  </Provider>
);

interface IProviderProps {
  children: ReactNode;
}

function Provider({ children }: IProviderProps) {
  return (
    <AuthProvider>
      <SocketProvider> {children} </SocketProvider>
    </AuthProvider>
  );
}
