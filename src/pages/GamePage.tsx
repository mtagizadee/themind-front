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
        <section className="center-row gap-3">
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
    <Box>
      <LivesBar />
    </Box>
  );
};

export default GamePage;
