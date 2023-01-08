import { useEffect, useMemo, useState } from "react";
import useLoading from "./useLoading";

const useLobby = (id: string, onError: (error: any) => void) => {
  const [lobby, setLobby] = useState();
  const { execute, isLoading } = useLoading(async () => {

  }, onError);
  
  useEffect(() => {
    execute();
  }, [id]);

  return (  );
}
 
export default useLobby;