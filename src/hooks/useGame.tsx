import { useEffect, useState } from "react";
import { gameCleaner, TGame } from "../common/types";
import useFetch from "./useFetch";

const useGame = (id: string) => {
  const [game, setGame] = useState<TGame>(gameCleaner());
  const [execute, isLoading] = useFetch(() => {});

  useEffect(() => {}, []);

  return { isLoading };
};

export default useGame;
