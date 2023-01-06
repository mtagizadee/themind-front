import React, { createContext, ReactNode, useState, FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthController } from "../api";
import { publicRoutes } from "../common/routes";
import useAuth from "../hooks/useAuth";
import Popup, { PopupType } from "../components/ui/Popup";

export type TUserContext = {
  id: string;
  nickname: string;
};

const UserContext = createContext<TUserContext>({} as any);

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
  const [popup, setPopup] = useState(false);
  const { unauthorize } = useAuth();
  const navigate = useNavigate();

  const clear = () => {
    setUser({} as any);
  };

  useEffect(() => {
    AuthController.me()
      .then((user) => {
        setUser(user);
        setPopup(true);
      })
      .catch(() => {
        // if the user is not authorized, logout the user
        unauthorize();
        navigate(publicRoutes.addUserPage);
        localStorage.clear();
      });

    return () => {
      clear();
    };
  }, []);

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
