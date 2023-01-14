import { useEffect, useState } from "react";
import { LobbiesController } from "../api";
import { lobbyCleaner, TLobby, TPlayer } from "../common/types";
import useSocket from "./useSocket";
import useUser from "./useUser";

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
  const { connect, disconnect, socket } = useSocket();
  const user = useUser();
  const [lobby, setLobby] = useState<TLobby>(lobbyCleaner());
  const [fetchLobby, isLoading, error] = useFetch(async () => {
    const lobby = await LobbiesController.getOne(id);
    setLobby(lobby);
  });

  useEffect(() => {
    connect();

    socket.connection.emit(
      "lobby:join",
      {
        lobbyId: id,
        userId: user.id,
        nickname: user.nickname,
      },
      (response: any) => {
        setLobby(response.lobby);
      }
    );

    socket.connection.on("lobby:join", (user: TPlayer) => {
      setLobby((lobby) => {
        return {
          ...lobby,
          players: [...lobby.players, user],
        };
      });
    });

    socket.connection.on("lobby:leave", (userId: string) => {
      setLobby((lobby) => {
        return {
          ...lobby,
          players: lobby.players.filter((player) => player.id !== userId),
        };
      });
    });

    return () => {
      socket.connection.emit("lobby:leave", {
        userId: user.id,
        lobbyId: id,
      });

      localStorage.removeItem("wsToken");
      socket.connection.removeAllListeners();
      disconnect();
    };
  }, [id]);

  return { lobby, isLoading, error };
};

export default useLobby;
