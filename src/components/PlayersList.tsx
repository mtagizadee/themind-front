import React, { FC } from "react";
import { orderToPlayerData } from "../common/constants";
import { gameCleaner, TPlayerInGame } from "../common/types";
import useGameFlow from "../hooks/useGameFlow";
import Box from "./ui/Box";
import ProfileImage from "./ui/ProfileImage";

interface IPlayersListProps {}

const PlayersList: FC<IPlayersListProps> = ({}) => {
  const { game } = useGameFlow();

  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 absolute right-3 top-3">
      {game.players.map((player, index) => (
        <Player player={player} order={index + 1} key={player.id} />
      ))}
    </ul>
  );
};

interface IPlayerProps {
  player: TPlayerInGame;
  order: number;
}

const Player: FC<IPlayerProps> = ({ player, order }) => {
  const orderData = (orderToPlayerData as any).lobby[order];
  const { game } = useGameFlow();

  return (
    <li className="pt-3 pb-3 sm:pb-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <ProfileImage image={orderData.image} nickname={player.nickname} className="m-0" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {player.nickname}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {orderData.description}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {player.cards.length} / {game.currentLevel}
        </div>
      </div>
    </li>
  );
};

export default PlayersList;
