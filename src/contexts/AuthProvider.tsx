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

/**
 * AuthProvider is a provider which keeps track of the authentication state
 * @param IAuthProviderProps children of the provider\
 * @returns JSX.Element which is the provider
 */
const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(!!localStorage.getItem("authToken"));

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
