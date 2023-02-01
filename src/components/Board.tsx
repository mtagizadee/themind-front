import React from "react";
import useGameFlow from "../hooks/useGameFlow";
import PlayingCard from "./cards/PlayingCard";
import Box from "./ui/Box";

/**
 * Board component that renders the board
 * @returns JSX.Element - board component
 */
const Board = () => {
  const { game } = useGameFlow();

  return (
    <Box>
      {game.board.map((card) => (
        <PlayingCard hidden={false} toPlay={false} card={card} key={card} />
      ))}
    </Box>
  );
};

export default Board;
