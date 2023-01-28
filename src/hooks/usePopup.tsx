import { useContext } from "react";
import { PopupContext, TPopupContext } from "../contexts/PopupProvider";

/**
 * Hook to get Popup context values from PopupProvider
 * @returns Values object inside Popup context
 */
const usePopup = () => {
  const data = useContext<TPopupContext>(PopupContext);
  return data;
};

export default usePopup;
