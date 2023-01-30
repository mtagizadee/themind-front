import React from "react";
import { useParams } from "react-router";

const GamePage = () => {
  const { id } = useParams();

  return (
    <div className="center-content full-screen font-bold">
      <h1>Game Page: {id}</h1>
    </div>
  );
};

export default GamePage;
