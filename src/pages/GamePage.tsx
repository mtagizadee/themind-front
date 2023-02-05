import React from "react";
import { useParams } from "react-router";
import Board from "../components/Board";
import Deck from "../components/Deck";
import PlayersList from "../components/PlayersList";
import GameProvider from "../contexts/GameProvider";
import useGameFlow from "../hooks/useGameFlow";
import Box from "../components/ui/Box";
import LivesBar from "../components/LivesBar";

const GamePage = () => {
  const { id } = useParams();

  return (
    <GameProvider id={id as unknown as string}>
      <div className="center-content full-screen">
        <section className="relative">
          <Board />
          <GameStats />
        </section>
        <PlayersList />
        <Deck />
      </div>
    </GameProvider>
  );
};

const GameStats = () => {
  const { game } = useGameFlow();

  return (
    <Box className="center-col absolute -right-36 top-0">
      <LivesBar />
      <p className="mt-3 text-sm">
        <span className="font-bold">Level:</span> {game.currentLevel} / {game.lastLevel}
      </p>
    </Box>
  );
};

export default GamePage;
