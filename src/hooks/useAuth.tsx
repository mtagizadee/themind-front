import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

/**
 * Custom hook to handle authentication context
 * @returns TAuthContext
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
