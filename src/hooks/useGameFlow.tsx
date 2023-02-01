import { useContext } from "react";
import { GameContext } from "../contexts/GameProvider";

/**
 * Hook that returns the game flow state inside game provider
 * @returns TGameContext - game context
 */
const useGameFlow = () => {
  const context = useContext(GameContext);

  return context;
};

export default useGameFlow;
