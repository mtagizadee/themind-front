import { useEffect, useState } from "react";
import { lobbyCleaner, TLobby, TPlayer, TWsExcention } from "../common/types";
import useSocket from "./useSocket";
import useEvent from "./useEvent";
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
const useLobby = (id: string): TUseLobbyResponse => {
  const { connect, disconnect, socket } = useSocket();
  const [lobby, setLobby] = useState<TLobby>(lobbyCleaner());
  const { execute: joinLobby, isLoading } = useLoading(async () => {
    socket.connection.emit("lobby:join", { lobbyId: id }, (lobby) => {
      setLobby(lobby);
    });
  });

  useEvent("lobby:join", (user: TPlayer) => {
    setLobby((lobby) => {
      return {
        ...lobby,
        players: [...lobby.players, user],
      };
    });
  });

  useEvent("lobby:leave", (userId: string) => {
    setLobby((lobby) => {
      return {
        ...lobby,
        players: lobby.players.filter((player) => player.id !== userId),
      };
    });
  });

  useEvent("exception", (error: TWsExcention) => {
    console.log(error);
  });

  useEffect(() => {
    connect();
    joinLobby();

    return () => {
      socket.connection.emit("lobby:leave", { lobbyId: id });
      disconnect();
    };
  }, [id]);

  return { lobby, isLoading };
};

export default useLobby;
