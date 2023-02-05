import React, { FC } from "react";
import { GiFallingStar } from "react-icons/gi";
import Box from "../ui/Box";

interface IShootingStarCardProps {
  exist: boolean;
}

/**
 * A card component with a shooting star icon which display and handle the shooting star functionality
 * @param exist - if the team has a shooting star
 * @returns a card component with a shooting star
 */
const ShootingStarCard: FC<IShootingStarCardProps> = ({ exist }) => {
  return (
    <Box className={`${exist ? "cursor-pointer" : ""}`}>
      <GiFallingStar className="text-[3rem]" />
    </Box>
  );
};

export default ShootingStarCard;
