import { useEffect, useState } from "react";
import { GamesController } from "../api";
import socket from "../common/socket";
import {
  gameCleaner,
  TCard,
  TCardPlayedEventData,
  TGame,
  TPlayCardEventData,
} from "../common/types";
import { PopupType } from "../components/ui/Popup";
import useEvent from "./useEvent";
import useFetch from "./useFetch";
import usePopup from "./usePopup";
import useUser from "./useUser";

/**
 * Hook that handles game logic with socket events and emits
 * @param id  - game id that we want to work with
 * @returns game object and isLoading flag
 */
const useGame = (id: string) => {
  const [game, setGame] = useState<TGame>(gameCleaner());
  const { id: currentUserId } = useUser();
  const [fetchGame, isLoading] = useFetch(async () => {
    const data = await GamesController.findOne(id, currentUserId);
    setGame(data);
  });
  const { displayPopup } = usePopup();

  useEffect(() => {
    fetchGame();

    return () => {
      setGame(gameCleaner());
    };
  }, []);

  const updateDeck = (newDeck: TCard[]) => {
    setGame((game) => {
      return {
        ...game,
        deck: newDeck,
      };
    });
  };

  const updateBoard = (newBoard: TCard[]) => {
    setGame((game) => {
      return {
        ...game,
        board: newBoard,
      };
    });
  };

  const playCard = (card: TCard) => {
    socket.connection.emit("game:card:play", { card, gameId: id }, (data: TPlayCardEventData) => {
      updateBoard(data.board);
      updateDeck(data.cards);
    });
  };

  useEvent("game:card:played", (data: TCardPlayedEventData) => {
    updateBoard(data.board);
    displayPopup(
      `${data.playedCard.player.nickname} played a card ${data.playedCard.card}...`,
      PopupType.Success
    );
  });

  return { game, setGame, isLoading, updateDeck, updateBoard, playCard };
};

export default useGame;
