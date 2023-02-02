import { useEffect, useState } from "react";
import { GamesController } from "../api";
import { gameCleaner, TGame } from "../common/types";
import useFetch from "./useFetch";
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

  useEffect(() => {
    fetchGame();

    return () => {
      setGame(gameCleaner());
    };
  }, []);

  return { game, setGame, isLoading };
};

export default useGame;
