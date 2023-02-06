import React from "react";
import { generateRandomAngle } from "../common/helpers";
import useGameFlow from "../hooks/useGameFlow";
import PlayingCard from "./cards/PlayingCard";
import Box from "./ui/Box";

/**
 * Board component that renders the board
 * @returns JSX.Element - board component
 */
const Board = () => {
  const { game } = useGameFlow();
  const chunk = game.board.slice(-4);

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
