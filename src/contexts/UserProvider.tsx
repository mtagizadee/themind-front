import React, { createContext, ReactNode, useState, FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthController } from "../api";
import { publicRoutes } from "../common/routes";
import useAuth from "../hooks/useAuth";

export type TUserContext = {
  id: string;
  nickname: string;
};

const UserContext = createContext<TUserContext>({} as any);

interface IUserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TUserContext>({} as any);
  const { unauthorize } = useAuth();
  const navigate = useNavigate();

  const clear = () => {
    setUser({} as any);
  };

  useEffect(() => {
    AuthController.me()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        unauthorize();
        navigate(publicRoutes.addUserPage);
        localStorage.clear();
      });

    return () => {
      clear();
    };
  }, []);

  return <UserContext.Provider value={{ ...user }}>{children}</UserContext.Provider>;
};

export default UserProvider;
