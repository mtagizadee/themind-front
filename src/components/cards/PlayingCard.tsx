import React, { FC, CSSProperties } from "react";
import { TCard } from "../../common/types";
import useGameFlow from "../../hooks/useGameFlow";
import Card from "./Card";

interface IPlayingCardProps {
  card: TCard;
  hidden: boolean;
  toPlay: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * PlayingCard component a card that will be played in the game
 * @param card - card's value
 * @returns JSX.Element - card container with it's value
 */
const PlayingCard: FC<IPlayingCardProps> = ({ card, hidden, toPlay, className, style }) => {
  const { playCard } = useGameFlow();

  return (
    <Card
      onClick={() => {
        if (toPlay) {
          playCard(card);
        }
      }}
      style={style}
      hidden={hidden}
      className={`${
        toPlay ? "cursor-pointer transition-all hover:-translate-y-10" : ""
      } ${className}`}
    >
      <span className="font-bold text-5xl">{card}</span>
    </Card>
  );
};

export default PlayingCard;
