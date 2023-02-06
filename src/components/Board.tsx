import React from "react";
import { generateRandomAngle } from "../common/helpers";
import { TCardPlayedEventData } from "../common/types";
import useEvent from "../hooks/useEvent";
import useGameFlow from "../hooks/useGameFlow";
import usePopup from "../hooks/usePopup";
import PlayingCard from "./cards/PlayingCard";
import Box from "./ui/Box";
import { PopupType } from "./ui/Popup";

/**
 * Board component that renders the board
 * @returns JSX.Element - board component
 */
const Board = () => {
  const { game, updateBoard } = useGameFlow();
  const chunk = game.board.slice(-4);
  const { displayPopup } = usePopup();

  useEvent("game:card:played", (data: TCardPlayedEventData) => {
    updateBoard(data.board);
    displayPopup(
      `${data.playedCard.player.nickname} played a card ${data.playedCard.card}...`,
      PopupType.Success
    );
  });

  return (
    <Box className="min-h-[300px] box-600 mb-16 center-content">
      <div className="relative">
        {chunk.map((card, index) => (
          <PlayingCard
            className={`${index !== 0 ? "absolute top-0" : ""}`}
            style={{
              rotate: `${generateRandomAngle()}deg`,
            }}
            hidden={false}
            toPlay={false}
            card={card}
            key={card}
          />
        ))}
      </div>
    </Box>
  );
};

export default Board;
