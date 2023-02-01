import { useEffect, useState } from "react";
import { GamesController } from "../api";
import { gameCleaner, TGame } from "../common/types";
import useFetch from "./useFetch";
import useUser from "./useUser";

const useGame = (id: string) => {
  const [game, setGame] = useState<TGame>(gameCleaner());
  const { id: currentUserId } = useUser();
  const [fetchGame, isLoading] = useFetch(async () => {
    const game = await GamesController.findOne(id, currentUserId);
    setGame(game);
  });

  useEffect(() => {
    fetchGame();

    return () => {
      setGame(gameCleaner());
    };
  }, []);

  return { game, isLoading };
};

export default useGame;
