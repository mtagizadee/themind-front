import React, { useState, createContext, FC, ReactNode } from "react";

type TAuthContext = {
  auth: boolean;
  authorize: () => void;
  unauthorize: () => void;
};
export const AuthContext = createContext<TAuthContext>({} as any);

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const authorize = () => {
    setAuth(true);
  };

  const unauthorize = () => {
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, authorize, unauthorize }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
