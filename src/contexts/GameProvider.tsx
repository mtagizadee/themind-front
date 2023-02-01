import React, { createContext, FC, ReactNode } from "react";
import { TGame } from "../common/types";
import PageLoader from "../components/PageLoader";
import useGame from "../hooks/useGame";

interface IGameProviderProps {
  children: ReactNode;
  id: string;
}

export type TGameContext = {
  game: TGame;
};

export const GameContext = createContext<TGameContext>({} as any);

/**
 * GameProvider component that provides game context to it's children
 * @param children - children components to be rendered inside the provider
 * @param id - game id that we want to work with
 * @returns JSX.Element - game provider
 */
const GameProvider: FC<IGameProviderProps> = ({ children, id }) => {
  const { game, isLoading } = useGame(id);

  if (isLoading) return <PageLoader />;

  return <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>;
};

export default GameProvider;
