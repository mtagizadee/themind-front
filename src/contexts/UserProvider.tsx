import React, { createContext, ReactNode, useState, FC, useEffect } from "react";
import { AuthController } from "../api";
import useAuth from "../hooks/useAuth";
import usePopup from "../hooks/usePopup";
import useLoading from "../hooks/useLoading";
import PageLoader from "../components/PageLoader";
import useSocket from "../hooks/useSocket";
import { PopupType } from "../components/ui/Popup";

export type TUserContext = {
  id: string;
  nickname: string;
};

export const UserContext = createContext<TUserContext>({} as any);

interface IUserProviderProps {
  children: ReactNode;
}

/**
 * UserProvider is a provider which keeps track of the user data
 * @param IUserProviderProps children of the provider
 * @returns JSX.Element which is the provider
 */
const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TUserContext>({} as any);
  const { connect, disconnect } = useSocket();
  const { displayPopup } = usePopup();
  const { unauthorize } = useAuth();
  const { execute, isLoading } = useLoading(
    async () => {
      const user = await AuthController.me();
      setUser(user);
      displayPopup(`Greate to see, ${user.nickname}!`, PopupType.Success);
    },
    () => {
      // if the user is not authorized, logout the user
      localStorage.removeItem("authToken");
      unauthorize();
    }
  );

  const clear = () => {
    setUser({} as any);
  };

  useEffect(() => {
    execute();
    connect();

    return () => {
      clear();
      disconnect();
    };
  }, []);

  if (isLoading) return <PageLoader />;

  return <UserContext.Provider value={{ ...user }}>{children}</UserContext.Provider>;
};

export default UserProvider;
