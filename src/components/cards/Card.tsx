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
  return (
    <div className="min-h-[180px] w-screen max-w-[160px] rounded-xl">
      <header className="card-header-footer rounded-t-xl" />
      <main className="center-content min-h-[180px] dark:bg-gray-800 dark:border-gray-700 border">
        {children}
      </main>
      <footer className="card-header-footer rounded-b-xl" />
    </div>
  );
};

export default Card;
