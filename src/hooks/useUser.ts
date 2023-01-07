import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

/**
 * Hook to get the user that is authorized
 * @returns TUserContext - user that is authorized
 */
const useUser = () => {
  const user = useContext(UserContext);

  return user;
};

export default useUser;
