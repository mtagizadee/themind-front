import { useEffect, useState } from "react";
import { GamesController } from "../api";
import { gameCleaner, TGame } from "../common/types";
import useFetch from "./useFetch";

const useGame = (id: string) => {
  const [game, setGame] = useState<TGame>(gameCleaner());
  const [fetchGame, isLoading] = useFetch(async () => {
    const game = await GamesController.findOne(id);
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
