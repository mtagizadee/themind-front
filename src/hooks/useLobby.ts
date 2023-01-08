import { useEffect, useState } from "react";
import { LobbiesController } from "../api";
import { lobbyCleaner, TLobby } from "../common/types";
import useLoading from "./useLoading";

type TUseLobbyResponse = {
  lobby: TLobby;
  isLoading: boolean;
};

/**
 * Hook that fetches lobby data from server at the beginning and then every time when lobby id changes
 * @param id  - lobby id that we want to fetch
 * @param onError - error handler function that will be called if something goes wrong
 * @returns TUseLobbyResponse - lobby object and isLoading flag
 */
const useLobby = (id: string, onError: (error: any) => void): TUseLobbyResponse => {
  const [lobby, setLobby] = useState<TLobby>(lobbyCleaner());
  const { execute, isLoading } = useLoading(async () => {
    const lobby = await LobbiesController.getOne(id);
    setLobby(lobby);
  }, onError);

  useEffect(() => {
    execute();

    return () => {
      setLobby(lobbyCleaner());
    };
  }, [id]);

  return { lobby, isLoading };
};

export default useLobby;
