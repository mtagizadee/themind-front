import React from "react";
import { useParams } from "react-router";
import PageLoader from "../components/PageLoader";
import useGame from "../hooks/useGame";

const GamePage = () => {
  const { id } = useParams();
  const { game, isLoading } = useGame(id as unknown as string);

  if (isLoading) return <PageLoader />;

  return (
    <div className="center-content full-screen font-bold">
      <h1>Game Page: {id}</h1>
    </div>
  );
};

export default GamePage;
