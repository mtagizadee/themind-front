import { useEffect, useState } from "react";
import { LobbiesController } from "../api";
import { lobbyCleaner, TLobby } from "../common/types";
import useFetch from "./useFetch";

type TUseLobbyResponse = {
  lobby: TLobby;
  isLoading: boolean;
  error: any;
};

/**
 * Hook that fetches lobby data from server at the beginning and then every time when lobby id changes
 * @param id  - lobby id that we want to fetch
 * @param onError - error handler function that will be called if something goes wrong
 * @returns TUseLobbyResponse - lobby object and isLoading flag
 */
const useLobby = (id: string): TUseLobbyResponse => {
  const [lobby, setLobby] = useState<TLobby>(lobbyCleaner());
  const [fetchLobby, isLoading, error] = useFetch(async () => {
    const lobby = await LobbiesController.getOne(id);
    setLobby(lobby);
  });

  useEffect(() => {
    fetchLobby();

    return () => {
      setLobby(lobbyCleaner());
    };
  }, [id]);

  return { lobby, isLoading, error };
};

export default useLobby;
