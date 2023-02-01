import React, { FC, ReactNode } from "react";

interface ICardProps {
  children: ReactNode;
  hidden: boolean;
}

/**
 * Card component, which will be used as a wrapper for other cards
 * @param children - content of the card
 * @returns JSX.Element - card container
 */
const Card: FC<ICardProps> = ({ children, hidden }) => {
  return <div>{children}</div>;
};

export default Card;
