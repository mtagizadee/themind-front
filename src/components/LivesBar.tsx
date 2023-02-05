import React from "react";
import { GiHeartBottle, GiHeartWings } from "react-icons/gi";
import useGameFlow from "../hooks/useGameFlow";
import Bar from "./ui/Bar";

const LivesBar = () => {
  const { game } = useGameFlow();

  return (
    <Bar
      maxValue={game.maxLives}
      currrentValue={game.lives}
      element={<Live />}
      emptyElement={<EmptyLive />}
    />
  );
};

const Live = () => {
  return <GiHeartBottle className="live" />;
};

const EmptyLive = () => {
  return <GiHeartWings className="live" />;
};

export default LivesBar;
