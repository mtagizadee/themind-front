import { useEffect, useState } from "react";
import { lobbyCleaner, TLobby, TPlayer, TWsExcention } from "../common/types";
import useEvent from "./useEvent";
import useEmit from "./useEmit";
import { useNavigate } from "react-router";
import { privateRoutes, publicRoutes } from "../common/routes";
import { PopupType } from "../components/ui/Popup";

type TUseLobbyResponse = {
  lobby: TLobby;
  startGame: () => void;
};

/**
 * Hook that handles lobby logic with socket events and emits
 * @param id  - lobby id that we want to work with
 * @param displayPopup - function that displays popup with message and type
 * @returns TUseLobbyResponse - lobby object and isLoading flag
 */
const useLobby = (
  id: string,
  displayPopup: (message: string, type: PopupType) => void
): TUseLobbyResponse => {
  const [lobby, setLobby] = useState<TLobby>(lobbyCleaner());
  const navigate = useNavigate();

  const joinLobby = useEmit("lobby:join", { lobbyId: id }, (response: TLobby) => {
    setLobby(response);
  });

  /**
   * Handler that redirects user to game page for the start event and start emit
   * @param game - game object that we get from server
   */
  const startGameHandler = (game: { id: string }) => {
    navigate(privateRoutes.game(game.id));
  };

  const startGame = useEmit("lobby:start", { lobbyId: id }, startGameHandler);

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

  useEvent("lobby:start", startGameHandler);

  useEvent("exception", (error: TWsExcention) => {
    if (error.status === 404) {
      navigate(publicRoutes.notFoundPage);
    }

    if (error.status === 409) {
      displayPopup("You cannot join the Lobby, it is full!", PopupType.Error);
      navigate(privateRoutes.lobbiesRoutes.create);
    }
  });

  useEffect(() => {
    joinLobby();

    return () => {
      // socket.connection.emit("lobby:leave", { lobbyId: id });
    };
  }, [id]);

  return { lobby, startGame };
};

export default useLobby;
