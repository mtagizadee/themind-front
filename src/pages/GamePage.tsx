import React from "react";
import { useParams } from "react-router";
import Board from "../components/Board";
import Deck from "../components/Deck";
import PlayersList from "../components/PlayersList";
import GameProvider from "../contexts/GameProvider";

const GamePage = () => {
  const { id } = useParams();

  return (
    <GameProvider id={id as unknown as string}>
      <div className="center-content full-screen">
        <Board />
        <PlayersList />
        <Deck />
      </div>
    </GameProvider>
  );
};

export default GamePage;
