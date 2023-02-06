import React, { FC, ReactNode, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

interface ICardProps {
  children: ReactNode;
  hidden: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Card component, which will be used as a wrapper for other cards
 * @param children - content of the card
 * @returns JSX.Element - card container
 */
const Card: FC<ICardProps> = ({ children, hidden, className, style }) => {
  return (
    <div
      style={style}
      className={twMerge("min-h-[180px] w-screen max-w-[160px] rounded-xl", className)}
    >
      <div className="card-header-footer rounded-t-xl" />
      <span className="center-content min-h-[180px] dark:bg-gray-800 dark:border-gray-700 border">
        {!hidden ? children : "The Mind"}
      </span>
      <div className="card-header-footer rounded-b-xl" />
    </div>
  );
};

export default Card;
