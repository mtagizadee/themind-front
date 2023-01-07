import React, { FC, ReactNode } from "react";
import Menu from "./Menu";

interface IBasicLayoutProps {
  children: ReactNode;
}

/**
 * BasicLayout component which will be in almost all pages
 * @param IBasicLayoutProps - children: ReactNode
 * @returns JSX.Element - which has menu and other basic layout components
 */
const BasicLayout: FC<IBasicLayoutProps> = ({ children }) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default BasicLayout;
