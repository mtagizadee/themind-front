import { useEffect, useState } from "react";
import { lobbyCleaner, TLobby, TPlayer, TWsExcention } from "../common/types";
import useEvent from "./useEvent";
import useEmit from "./useEmit";
import { useNavigate } from "react-router";
import { publicRoutes } from "../common/routes";

type TUseLobbyResponse = {
  lobby: TLobby;
};

/**
 * Hook that fetches lobby data from server at the beginning and then every time when lobby id changes
 * @param id  - lobby id that we want to fetch
 * @param onError - error handler function that will be called if something goes wrong
 * @returns TUseLobbyResponse - lobby object and isLoading flag
 */
const useLobby = (id: string, setPopup?: (value: boolean) => void): TUseLobbyResponse => {
  const [lobby, setLobby] = useState<TLobby>(lobbyCleaner());
  const navigate = useNavigate();

  const joinLobby = useEmit("lobby:join", { lobbyId: id }, (response) => {
    setLobby(response);
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
    if (error.status === 404) {
      navigate(publicRoutes.notFoundPage);
    }

    if (error.status === 403 && setPopup) {
      setPopup(true);
    }
  });

  useEffect(() => {
    joinLobby();

    return () => {
      // socket.connection.emit("lobby:leave", { lobbyId: id });
    };
  }, [id]);

  return { lobby };
};

export default useLobby;
