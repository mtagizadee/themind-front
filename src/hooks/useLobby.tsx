import { useEffect, useState } from "react";
import { LobbiesController } from "../api";
import { lobbyCleaner, TLobby, TPlayer, TWsExcention } from "../common/types";
import useSocket from "./useSocket";
import useUser from "./useUser";
import useEvent from "./useEvent";
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
  const { connect, disconnect, socket } = useSocket();
  const user = useUser();
  const [lobby, setLobby] = useState<TLobby>(lobbyCleaner());
  const [fetchLobby, isLoading, error] = useFetch(async () => {
    const lobby = await LobbiesController.getOne(id);
    setLobby(lobby);
  });

  useEvent(
    "lobby:join",
    (user: TPlayer) => {
      if (Object.keys(user).length === 0) return;
      setLobby((lobby) => {
        return {
          ...lobby,
          players: [...lobby.players, user],
        };
      });
    },
    [user]
  );

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

    return () => {
      socket.connection.emit("lobby:leave", {
        userId: user.id,
        lobbyId: id,
      });

      localStorage.removeItem("wsToken");
      disconnect();
    };
  }, [id]);

  return { lobby, isLoading, error };
};

export default useLobby;
