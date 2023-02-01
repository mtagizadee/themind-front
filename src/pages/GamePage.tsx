import React from "react";
import { useParams } from "react-router";
import GameProvider from "../contexts/GameProvider";

const GamePage = () => {
  const { id } = useParams();

  return (
    <GameProvider id={id as unknown as string}>
      <div className="center-content full-screen font-bold">
        <h1>Game Page: {id}</h1>
      </div>
    </GameProvider>
  );
};

export default GamePage;
