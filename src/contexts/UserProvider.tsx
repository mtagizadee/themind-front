import React, { createContext, ReactNode, useState, FC, useEffect } from "react";
import { AuthController } from "../api";
import useAuth from "../hooks/useAuth";
import Popup, { PopupType } from "../components/ui/Popup";
import useLoading from "../hooks/useLoading";
import PageLoader from "../components/PageLoader";
import useSocket from "../hooks/useSocket";

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
  const { socket } = useSocket();
  const [popup, setPopup] = useState(false);
  const { unauthorize } = useAuth();
  const { execute, isLoading } = useLoading(
    async () => {
      const user = await AuthController.me();
      socket.token = localStorage.getItem("authToken") || "";
      setUser(user);
      setPopup(true);
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

    return () => {
      clear();
    };
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <UserContext.Provider value={{ ...user }}>{children}</UserContext.Provider>
      <Popup
        type={PopupType.Success}
        message={`Great to see you, ${user.nickname}!`}
        visible={popup}
        onClose={() => setPopup(false)}
      />
    </>
  );
};

export default UserProvider;
