import React, { FC } from "react";
import { TCard } from "../../common/types";
import Card from "./Card";

interface IPlayingCardProps {
  card: TCard;
  hidden: boolean;
  toPlay: boolean;
}

/**
 * PlayingCard component a card that will be played in the game
 * @param card - card's value
 * @returns JSX.Element - card container with it's value
 */
const PlayingCard: FC<IPlayingCardProps> = ({ card, hidden, toPlay }) => {
  return (
    <Card
      hidden={hidden}
      className={toPlay ? "cursor-pointer transition-all hover:-translate-y-10" : ""}
    >
      <span className="font-bold text-5xl">{card}</span>
    </Card>
  );
};

export default PlayingCard;
