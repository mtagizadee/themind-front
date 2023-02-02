import useLoading from "./useLoading";
import { useState } from "react";

type TUseFetchResponse = [(...args: any) => Promise<void>, boolean, any];

/**
 * Custom hook to send fetch requests to server
 * @param callback - async function to be executed  when useFetch hook  is called
 * @returns TUseFetchResponse - [execute, isLoading, error]
 * @important - these are going to be used only in other custom hooks
 * @example
 * const useLobby = (id: string): TUseLobbyResponse => {
 *  const [lobby, setLobby] = useState<TLobby>(lobbyCleaner());
 *  const [fetchLobby, lobbyLoading, lobbyError] = useFetch(async () => {
 *    const lobby = await LobbiesController.getOne(id);
 *    setLobby(lobby);
 *  });
 *
 *  useEffect(() => {
 *   fetchLobby();
 *   return () => {
 *    setLobby(lobbyCleaner());
 *   };
 *  }, [id]);
 */
const useFetch = (callback: (...args: any) => Promise<void>) => {
  const [error, setError] = useState<any>(null);

  const { execute, isLoading } = useLoading(
    async (...args) => {
      await callback(...args);
    },
    (error) => {
      setError(error);
    }
  );

  return [execute, isLoading, error] as TUseFetchResponse;
};

export default useFetch;
