import React from "react";
import { GiHeartBottle } from "react-icons/gi";
import useGameFlow from "../hooks/useGameFlow";
import Bar from "./ui/Bar";

const LivesBar = () => {
  const { game } = useGameFlow();

  return (
    <Bar maxValue={game.maxLives} currrentValue={game.lives} element={<GiHeartBottle />}></Bar>
  );
};

export default LivesBar;
