import React, { createContext, ReactNode, FC, useState } from "react";
import useToggle from "../hooks/useToggle";
import Popup, { PopupType } from "../components/ui/Popup";

interface IPopupProviderProps {
  children: ReactNode;
}

export type TPopupContext = {
  displayPopup: (message: string, type: PopupType) => void;
};

export const PopupContext = createContext<TPopupContext>({} as any);

/**
 * PopupProvider is a provider which keeps track of the popup state and manages its displaying
 * @param IUserProviderProps children of the provider
 * @returns JSX.Element which is the provider
 */
const PopupProvider: FC<IPopupProviderProps> = ({ children }) => {
  const [popup, showPopup, hidePopup] = useToggle();
  const [message, setMessage] = useState("");
  const [type, setType] = useState<PopupType>(PopupType.Success);

  const displayPopup = (message: string, type: PopupType) => {
    setMessage(message);
    setType(type);
    showPopup();
  };

  return (
    <PopupContext.Provider value={{ displayPopup }}>
      {children}
      {<Popup message={message} type={type} visible={popup} onClose={() => hidePopup()} />}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
