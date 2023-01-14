import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import AuthProvider from "./contexts/AuthProvider";
import SocketProvider from "./contexts/SocketProvider";
import "./css/index.css";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <Provider>
    <App />
  </Provider>
);

interface IProviderProps {
  children: ReactNode;
}

/**
 * Provider is the global provider of the application which
 * provides the state management for those state that are accessible
 * from everywhere
 * @param children - The children of the provider
 * @returns The global provider of the application
 */
function Provider({ children }: IProviderProps) {
  return (
    <AuthProvider>
      <SocketProvider>{children}</SocketProvider>
    </AuthProvider>
  );
}
